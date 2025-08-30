import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // token backend se login ke time save hota h

  if (!token) {
    return <Navigate to="/" replace />; // agar token nahi hai → login page bhej do
  }

  return children; // agar token hai → actual page dikhado
}

export default ProtectedRoute;
