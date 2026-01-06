import { Navigate } from "react-router-dom";

function ProtectedUser({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/register" />;
  }

  if (role !== "user") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedUser;
