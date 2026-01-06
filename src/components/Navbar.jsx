import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>

        <Link
          to="/listings"
          className={location.pathname === "/listings" ? "active" : ""}
        >
          Listings
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {!role && (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
{role === "user" && (
  <>
    <Link
      to="/status"
      className={location.pathname === "/status" ? "active" : ""}
    >
      My Status
    </Link>

    <Link
      to="/payments"
      className={location.pathname === "/payments" ? "active" : ""}
    >
      Payments
    </Link>
  </>
)}

      
{role === "admin" && (
  <>
    <Link
      to="/admin"
      className={location.pathname === "/admin" ? "active" : ""}
    >
      Admin
    </Link>

    <Link
      to="/admin/payments"
      className={location.pathname === "/admin/payments" ? "active" : ""}
    >
      Payments
    </Link>
  </>
)}


        {role && (
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            My Profile
          </Link>
        )}

        {role && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
