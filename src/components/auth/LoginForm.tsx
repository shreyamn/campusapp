
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { UserRole, User } from "@/types";
import { saveUser, authenticateAdmin } from "@/services/auth";

// Mock user data for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    rollNumber: "2023CS001",
    email: "johnsmith2023cs001@campus.edu",
    role: "student",
    major: "Computer Science",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    rollNumber: "2023FAC001",
    email: "sarahjohnson2023fac001@campus.edu",
    role: "faculty",
    department: "Computer Science",
  },
  {
    id: "3",
    name: "Mike Davis",
    rollNumber: "2023STF001",
    email: "mikedavis2023stf001@campus.edu",
    role: "staff",
    staffType: "Event Manager",
  }
];

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
  onSignupClick: () => void;
}

const LoginForm = ({ onLoginSuccess, onSignupClick }: LoginFormProps) => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"standard" | "admin">("standard");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (loginMethod === "admin") {
      // Try admin login
      const adminUser = authenticateAdmin(email, password);
      if (adminUser) {
        // Save admin user to localStorage
        saveUser(adminUser);
        toast.success(`Welcome, ${adminUser.name}!`);
        onLoginSuccess(adminUser);
      } else {
        toast.error("Invalid admin credentials.");
      }
      setIsLoading(false);
      return;
    }
    
    // Standard login for students, faculty, staff
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => 
          u.name.toLowerCase() === name.toLowerCase() && 
          u.rollNumber === rollNumber
      );
      
      if (user) {
        // Save user to localStorage
        saveUser(user);
        
        toast.success(`Welcome back, ${user.name}!`);
        onLoginSuccess(user);
      } else {
        toast.error("Invalid credentials. Please try again or sign up.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your details to access your campus account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex border rounded-md overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 text-center ${loginMethod === "standard" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              onClick={() => setLoginMethod("standard")}
            >
              Standard Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-center ${loginMethod === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              onClick={() => setLoginMethod("admin")}
            >
              Admin Login
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMethod === "standard" ? (
            // Standard login form
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="e.g. 2023CS001"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            // Admin login form
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      {loginMethod === "standard" && (
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="p-0" onClick={onSignupClick}>
              Sign up
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default LoginForm;
