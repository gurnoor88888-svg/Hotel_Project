import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import StarRating from "./star";
import Footer from "./footer";
import "./css/room.css";
import { API_URL } from "../config";

const emptyContact = { name: "", email: "", number: "" };

const BookHotel = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [bookingRoomId, setBookingRoomId] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [availability, setAvailability] = useState(null);
  const [contact, setContact] = useState(emptyContact);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/rooms`);
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const handleSearch = (query) => {
    const filtered = rooms.filter((room) =>
      (room.name && room.name.toLowerCase().includes(query.toLowerCase())) ||
      (room.area && room.area.toLowerCase().includes(query.toLowerCase())) ||
      (room.city && room.city.toLowerCase().includes(query.toLowerCase())) ||
      (room.roomtype && room.roomtype.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredRooms(filtered);
  };

  const toggleBooking = (roomId) => {
    const opening = bookingRoomId !== roomId;
    setBookingRoomId(opening ? roomId : null);
    setDates({ startDate: "", endDate: "" });
    setAvailability(null);
    setContact(emptyContact);
  };

  const handleCheckAvailability = async () => {
    const { startDate, endDate } = dates;
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("End date must be after the start date.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/rooms/check-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: bookingRoomId, startDate, endDate }),
      });
      const data = await response.json();
      if (response.ok) {
        setAvailability(data.available);
        toast[data.available ? "success" : "error"](
          data.available ? "Room is available!" : "Room is not available for these dates."
        );
      } else {
        setAvailability(false);
        toast.error(data.message || "Failed to check availability.");
      }
    } catch {
      toast.error("An error occurred while checking availability.");
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/bookroom`, contact);
      if (data.success) {
        toast.success("Room booked successfully!");
        toggleBooking(bookingRoomId);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error booking room: " + error.message);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <ToastContainer />

      <div className="hero-heading">
        <h1>Find Your Perfect Stay</h1>
        <p>Handpicked hotels across India, ready to book in seconds.</p>
      </div>

      {filteredRooms.length === 0 ? (
        <p className="empty-state">No rooms found matching your search criteria.</p>
      ) : (
        <div className="container-r">
          {filteredRooms.map((room) => (
            <div className="card-r mb-3" key={room._id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <Carousel className="room-carousel">
                    {room.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img className="img-fluid rounded-start" src={image} alt={`Slide ${index + 1}`} />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <h2 className="card-title">{room.name}</h2>
                    <span className="room-badge">{room.roomtype}</span>
                    <ul className="detail-list">
                      <li>👥 {room.maxGuests} Guests</li>
                      <li>📍 {room.area}, {room.city}</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <div className="rating">
                      <StarRating rating={room.rating} onRatingChange={() => {}} />
                    </div>
                    <h5 className="price">₹{room.price} <span>/ night</span></h5>
                    <h5 className="price1">Includes taxes and charges</h5>
                    <Button variant="primary" onClick={() => toggleBooking(room._id)} className="book-btn">
                      {bookingRoomId === room._id ? "Cancel" : "Book Now"}
                    </Button>
                  </div>
                </div>
              </div>

              {bookingRoomId === room._id && (
                <div className="card-body booking-panel">
                  <div className="row g-2 align-items-end">
                    <div className="col-sm-4">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dates.startDate}
                        onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dates.endDate}
                        onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                      />
                    </div>
                    <div className="col-sm-4">
                      <button type="button" className="btn btn-outline-primary w-100" onClick={handleCheckAvailability}>
                        Check Availability
                      </button>
                    </div>
                  </div>

                  {availability && (
                    <form className="row g-2 mt-2" onSubmit={handleConfirmBooking}>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          value={contact.name}
                          onChange={(e) => setContact({ ...contact, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-sm-4">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-sm-2">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Phone No."
                          value={contact.number}
                          onChange={(e) => setContact({ ...contact, number: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-sm-2">
                        <button type="submit" className="btn btn-success w-100">Confirm Booking</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BookHotel;
