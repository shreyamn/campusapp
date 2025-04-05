
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types";
import { loginUser } from "@/services/auth";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginSuccess = (user: User) => {
    loginUser(user);
    navigate("/dashboard");
  };

  const handleSignupSuccess = (user: User) => {
    loginUser(user);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Campus APP</h1>
        <p className="text-gray-600">Connect, learn, and thrive on campus</p>
      </div>
      
      {isLogin ? (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onSignupClick={() => setIsLogin(false)}
        />
      ) : (
        <SignupForm
          onSignupSuccess={handleSignupSuccess}
          onLoginClick={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default Auth;
