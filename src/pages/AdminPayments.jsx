import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(storedPayments);
  }, []);

  // ✅ REFUND HANDLER
  const handleRefund = (paymentId) => {
    const updatedPayments = payments.map((p) =>
      p.paymentId === paymentId
        ? { ...p, status: "REFUNDED" }
        : p
    );

    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    alert("Payment refunded successfully ❌💰");
  };

  return (
    <div className="page">
      <h2>💳 All Payments</h2>

      {payments.length === 0 && <p>No payments done yet</p>}

      {payments.map((p) => (
        <div key={p.paymentId} className="card payment-card">
          <p><b>PG:</b> {p.pgName}</p>
          <p><b>User:</b> {p.userEmail}</p>
          <p><b>Amount:</b> ₹{p.amount}</p>
          <p><b>Method:</b> {p.method}</p>
          <p><b>Transaction ID:</b> {p.transactionId}</p>
          <p><b>Date:</b> {p.date}</p>

          <p
            style={{
              color: p.status === "REFUNDED" ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            Status: {p.status}
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="primary-btn"
              onClick={() => navigate(`/receipt/${p.paymentId}`)}
            >
              View Receipt
            </button>

            {p.status === "PAID" && (
              <button
                className="danger-btn"
                onClick={() => handleRefund(p.paymentId)}
              >
                Refund Payment
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPayments;
