import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPayments() {
  const [payments, setPayments] = useState([]);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const allPayments = JSON.parse(localStorage.getItem("payments")) || [];
    const myPayments = allPayments.filter(p => p.userEmail === email);
    setPayments(myPayments);
  }, [email]);

  return (
    <div className="page">
      <h2>💳 My Payments</h2>

      {payments.length === 0 && <p>No payments yet</p>}

      {payments.map(p => (
        <div
          key={p.paymentId}
          className="card"
          style={{ marginBottom: "15px" }}
        >
          <p><b>PG:</b> {p.pgName}</p>
          <p><b>Amount:</b> ₹{p.amount}</p>
          <p><b>Method:</b> {p.method}</p>
          <p><b>Transaction:</b> {p.transactionId}</p>
          <p><b>Date:</b> {p.date}</p>
          <p style={{ color: "green" }}><b>Status:</b> {p.status}</p>

          <button
            className="primary-btn"
            onClick={() => navigate(`/receipt/${p.paymentId}`)}
          >
            View Receipt
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserPayments;
