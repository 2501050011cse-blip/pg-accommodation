import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card auth-card" style={{ textAlign: "center" }}>
        <div className="profile-pic">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
            width="100"
          />
        </div>

        <h2>My Profile</h2>

        <span className="role-badge">
          {role?.toUpperCase()}
        </span>

        <p><b>Email:</b> {email}</p>

        {/* USER OPTIONS */}
        {role === "user" && (
          <>
            <button onClick={() => navigate("/status")}>
              📦 My Booking Status
            </button>

            <button onClick={() => navigate("/payments")}>
              💳 My Payments
            </button>
          </>
        )}

        {/* ADMIN OPTIONS */}
        {role === "admin" && (
          <>
            <button onClick={() => navigate("/admin")}>
              🛠 Admin Dashboard
            </button>

            <button onClick={() => navigate("/admin/payments")}>
              💰 View Payments
            </button>
          </>
        )}

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
