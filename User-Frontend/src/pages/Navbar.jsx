import { Link, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("hotelhub_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('')
  };

  const handleLogout = () => {
    localStorage.removeItem("hotelhub_user");
    setUser(null);
    navigate("/login");
  };

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : "";

  return (
    <nav className="navbar-u navbar navbar-expand-lg nav1">
      <div className="container-fluid">
        <Link to='/book-hotel' className="navbar-brand">
          🏨 HotelHub
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex search-section" onSubmit={handleSearchSubmit}>
            <input className="form-control me-2 " type="search" placeholder="Search by city,hotel  or neighborhood" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className="profile">
            {user ? (
              <div className="user-chip">
                <span className="avatar">{initial}</span>
                <span className="user-email">{user.email}</span>
                <button type="button" className="signout-pill" onClick={handleLogout}>Sign Out</button>
              </div>
            ) : (
              <ul className=" navbar-nav ">
                <li><Link to="/login" className="login-pill">Login</Link></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
