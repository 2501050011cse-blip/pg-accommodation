function AdminProfile() {
  const email = localStorage.getItem("email");

  return (
    <div className="page">
      <div className="card">
        <h2>Admin Profile</h2>

        <p><b>Role:</b> Admin</p>
        <p><b>Email:</b> {email}</p>

        <p>You can manage PGs and bookings.</p>
      </div>
    </div>
  );
}

export default AdminProfile;
