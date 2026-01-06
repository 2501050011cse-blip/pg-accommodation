import { useParams, useNavigate } from "react-router-dom";
import pgData from "../Data/pgData";

function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pg = pgData.find(p => p.id === Number(id));
  const role = localStorage.getItem("role");

  if (!pg) return <h2>PG Not Found</h2>;

  const handleBook = () => {
    if (!role) {
      navigate("/login");
      return;
    }
    if (role === "admin") {
      alert("Admin cannot book PG");
      return;
    }
    navigate(`/booking/${pg.id}`);
  };

  return (
    <div className="page">
      <div className="pg-details-card">
        {/* IMAGE */}
        <img
          src={pg.image}
          alt={pg.name}
          className="pg-details-image"
        />

        {/* INFO */}
        <div className="pg-details-info">
          <h1>{pg.name}</h1>

          <p>📍 <b>Location:</b> {pg.location}</p>
          <p>💰 <b>Rent:</b> ₹{pg.rent} / month</p>
          <p>👤 <b>Type:</b> {pg.type}</p>

          {pg.food && <p>🍽 <b>Food:</b> {pg.food}</p>}
          {pg.facilities && (
            <p>⭐ <b>Facilities:</b> {pg.facilities.join(", ")}</p>
          )}

          <button className="primary-btn" onClick={handleBook}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PGDetails;
