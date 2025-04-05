
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/services/auth";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to login
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Campus APP</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
