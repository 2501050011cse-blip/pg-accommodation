import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PGCard({ pg }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        gap: "16px",
        padding: "18px",
        borderRadius: "18px",
        background: "linear-gradient(145deg, #ffffff, #f2f4ff)",
        boxShadow: hover
          ? "0 22px 48px rgba(102,126,234,0.35)"
          : "0 8px 22px rgba(0,0,0,0.12)",
        transform: hover ? "translateY(-12px) scale(1.04)" : "none",
        transition: "all 0.35s ease",
        cursor: "pointer"
      }}
    >
      <img
        src={pg.image}
        alt={pg.name}
        style={{
          width: "160px",
          height: "120px",
          borderRadius: "14px",
          objectFit: "cover",
          transform: hover ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.4s ease"
        }}
      />

      <div>
        <h3 style={{ margin: 0, color: "#2d1b69" }}>{pg.name}</h3>
        <p>📍 {pg.location}</p>
        <p>💰 ₹{pg.rent} / month</p>

        <button
          onClick={() => navigate(`/pg/${pg.id}`)}
          style={{
            marginTop: "10px",
            padding: "10px 18px",
            borderRadius: "25px",
            border: "none",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transform: hover ? "translateY(-2px)" : "none",
            transition: "all 0.3s ease"
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

export default PGCard;
