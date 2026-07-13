import { Link } from "react-router-dom";
import "./CSS/navbar.css";

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg nav1">
      <div className="container-fluid">
        <Link to='/add-hotel' className="navbar-brand">
          HotelHub
        </Link>
        <button  className="navbar-toggler"  type="button"  data-bs-toggle="collapse"  data-bs-target="#navbarSupportedContent"  aria-controls="navbarSupportedContent"  aria-expanded="false"  aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link to="/add-hotel">Add Hotel</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
