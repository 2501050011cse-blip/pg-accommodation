import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("UPI");

  const email = localStorage.getItem("email");
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const booking = bookings.find(b => b.id === Number(bookingId));

  if (!booking) {
    return <h2>Invalid Booking</h2>;
  }

  // ✅ ONLY AFTER ADMIN APPROVAL
  if (booking.status !== "APPROVED") {
    return (
      <div className="page">
        <div className="card">
          <h2>Payment Not Allowed</h2>
          <p>Your booking is not approved yet.</p>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    if (booking.paymentStatus === "PAID") {
      alert("Payment already completed");
      return;
    }

    const payments = JSON.parse(localStorage.getItem("payments")) || [];

    const payment = {
      paymentId: Date.now(),
      bookingId: booking.id,
      userEmail: email,
    pgName: booking.pgName,   // ✅ ADD THIS
      amount: 5000,
      method,
      transactionId: "TXN" + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleString(),
      status: "PAID"
    };

    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));

    const updatedBookings = bookings.map(b =>
      b.id === booking.id
        ? { ...b, paymentStatus: "PAID", status: "CONFIRMED" }
        : b
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    alert("Payment Successful ✅");
    navigate(`/receipt/${payment.paymentId}`);
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Payment</h2>

        <p><b>PG:</b> {booking.pgName}</p>
        <p><b>Amount:</b> ₹5000</p>

        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Credit Card">Credit Card</option>
        </select>

        <button className="primary-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
