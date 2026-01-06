import { useEffect, useState } from "react";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = bookings.map(b =>
      b.id === id ? { ...b, status: newStatus } : b
    );

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Admin Dashboard</h2>

        {bookings.length === 0 && <p>No booking requests</p>}

        {bookings.map(b => (
          <div
            key={b.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "12px"
            }}
          >
            <p><b>User:</b> {b.userEmail}</p>
            <p><b>PG:</b> {b.pgName}</p>
            <p>
              <b>Status:</b>{" "}
              <span style={{ fontWeight: "bold" }}>{b.status}</span>
            </p>
            <p>
              <b>Payment:</b>{" "}
              {b.paymentStatus === "PAID" ? "PAID ✅" : "NOT PAID ❌"}
            </p>

            {/* ACTIONS */}
            {b.status === "PENDING" && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="primary-btn"
                  onClick={() => updateStatus(b.id, "APPROVED")}
                >
                  Approve
                </button>

                <button
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    cursor: "pointer"
                  }}
                  onClick={() => updateStatus(b.id, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            )}

            {b.status === "APPROVED" && b.paymentStatus === "NOT_PAID" && (
              <p style={{ color: "#2563eb" }}>
                Waiting for user payment…
              </p>
            )}

            {b.status === "APPROVED" && b.paymentStatus === "PAID" && (
              <p style={{ color: "green" }}>
                Payment received ✔️
              </p>
            )}

            {b.status === "REJECTED" && (
              <p style={{ color: "red" }}>Booking rejected</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
