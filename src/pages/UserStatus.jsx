import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserStatus() {
  const [myBookings, setMyBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setMyBookings(bookings.filter(b => b.userEmail === email));
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>My Booking Status</h2>

        {myBookings.length === 0 && <p>No bookings yet</p>}

        {myBookings.map(b => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px"
            }}
          >
            <p><b>PG:</b> {b.pgName}</p>
            <p><b>Status:</b> {b.status}</p>
            <p>
              <b>Payment:</b>{" "}
              {b.paymentStatus === "PAID" ? "PAID ✅" : "NOT PAID ❌"}
            </p>

            {/* ✅ PAY NOW BUTTON */}
            {b.status === "APPROVED" && b.paymentStatus === "NOT_PAID" && (
              <button
                className="primary-btn"
                onClick={() => navigate(`/payment/${b.id}`)}
              >
                Pay Now
              </button>
            )}

            {/* AFTER PAYMENT */}
            {b.paymentStatus === "PAID" && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Booking Confirmed ✔️
              </p>
            )}

            {b.status === "REJECTED" && (
              <p style={{ color: "red" }}>
                Booking rejected by admin
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStatus;
