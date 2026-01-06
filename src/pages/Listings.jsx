import { useEffect, useState } from "react";
import PGCard from "../components/PGCard";
import pgData from "../Data/pgData";

function Listings() {
  const [pgs, setPgs] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [maxRent, setMaxRent] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pgs"));
    setPgs(stored || pgData);
  }, []);

  const filteredPGs = pgs.filter(
    (pg) =>
      pg.location.toLowerCase().includes(search.toLowerCase()) &&
      (type === "" || pg.type === type) &&
      (maxRent === "" || pg.rent <= Number(maxRent))
  );

  return (
    <div className="listings-page">
      {/* HEADER */}
      <div className="listings-header">
        <h1>PG Listings</h1>

        <div className="filters">
          <input
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>

          <input
            type="number"
            placeholder="Max Rent"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
          />
        </div>
      </div>

      {/* GRID */}
      <div className="pg-grid">
        {filteredPGs.length === 0 && <p>No PGs found</p>}

        {filteredPGs.map((pg) => (
          <PGCard key={pg.id} pg={pg} />
        ))}
      </div>
    </div>
  );
}

export default Listings;
