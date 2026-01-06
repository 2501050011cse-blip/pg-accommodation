import { useParams, useNavigate } from "react-router-dom";
import pgData from "../Data/pgData";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pg = pgData.find(p => p.id === Number(id));
  if (!pg) return <h2>PG Not Found</h2>;

  const handleRequest = () => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    // 🔒 Not logged in
    if (!email || !role) {
      alert("Please login to book a PG");
      navigate("/login");
      return;
    }

    // 🚫 Admin cannot book
    if (role === "admin") {
      alert("Admin cannot book PGs");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // 🚫 Prevent duplicate booking
    const alreadyBooked = bookings.find(
      b => b.pgId === pg.id && b.userEmail === email
    );

    if (alreadyBooked) {
      alert("You already requested booking for this PG");
      return;
    }

    const booking = {
      id: Date.now(),
      pgId: pg.id,
      pgName: pg.name,
      userEmail: email,
      status: "PENDING",          // Admin approval
      paymentStatus: "NOT_PAID"   // Payment later
    };

    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking request sent. Waiting for admin approval.");
    navigate("/status");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Booking Request</h2>

        <p><b>PG:</b> {pg.name}</p>
        <p><b>Location:</b> {pg.location}</p>
        <p><b>Rent:</b> ₹{pg.rent}</p>

        <button className="primary-btn" onClick={handleRequest}>
          Request Booking
        </button>
      </div>
    </div>
  );
}

export default Booking;
