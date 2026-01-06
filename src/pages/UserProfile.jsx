function UserProfile() {
  const email = localStorage.getItem("email");

  return (
    <div className="page">
      <div className="card">
        <h2>My Profile</h2>

        <p><b>Role:</b> User</p>
        <p><b>Email:</b> {email}</p>

        <p>You can view your bookings and status here.</p>
      </div>
    </div>
  );
}

export default UserProfile;
