import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedAdmin;
