
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/services/auth";

const ProtectedRoute = () => {
  // If not authenticated, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
