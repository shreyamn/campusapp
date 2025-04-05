
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/services/auth";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
