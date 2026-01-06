import { useParams, useNavigate } from "react-router-dom";

function Receipt() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const payments = JSON.parse(localStorage.getItem("payments")) || [];

  // ✅ Try exact match first
  let payment = payments.find(
    p => String(p.paymentId) === String(paymentId)
  );

  // ✅ If not found, fallback to latest payment of user
  if (!payment) {
    const userPayments = payments.filter(p => p.userEmail === email);
    payment = userPayments[userPayments.length - 1];
  }

  // ✅ If still nothing, show friendly UI (NOT error)
  if (!payment) {
    return (
      <div className="page">
        <div className="card">
          <h2>No Payments Yet</h2>
          <p>You have not completed any payments.</p>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

 return (
  <div className="page">
    <div className="card receipt-card" id="receipt">
      <h2>Payment Receipt</h2>

      <p><b>PG:</b> {payment.pgName}</p>
      <p><b>User:</b> {payment.userEmail}</p>
      <p><b>Amount:</b> ₹{payment.amount}</p>
      <p><b>Payment Method:</b> {payment.method}</p>
      <p><b>Transaction ID:</b> {payment.transactionId}</p>
      <p><b>Date:</b> {payment.date}</p>

      <p style={{ color: "green", fontWeight: "bold" }}>
        Status: {payment.status}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button className="primary-btn" onClick={() => window.print()}>
          Download Receipt
        </button>

        <button className="secondary-btn" onClick={() => navigate("/payments")}>
          View Payments
        </button>
      </div>
    </div>
  </div>
);
}

export default Receipt;
