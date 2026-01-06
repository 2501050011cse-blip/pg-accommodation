import pgData from "../Data/pgData";
import PGCard from "../components/PGCard";

function Home() {
  return (
    <div className="home-page">
  <h1 className="page-title">Available PG Accommodations</h1>

  <div className="pg-grid">
    {pgData.map((pg) => (
      <PGCard key={pg.id} pg={pg} />
    ))}
  </div>
</div>

    

      
  );
}

export default Home;
