
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/services/auth";
import { getCurrentUser } from "@/services/auth";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = getCurrentUser();
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  
  // Admin has access to all routes
  if (user?.role === "admin") {
    return <Outlet />;
  }
  
  // Restrict subjects page to students only, unless admin
  if (location.pathname === "/subjects" && user?.role !== "student") {
    return <Navigate to="/dashboard" />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
