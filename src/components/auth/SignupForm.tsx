
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Major, Department, StaffType, UserRole, User } from "@/types";

interface SignupFormProps {
  onSignupSuccess: (user: User) => void;
  onLoginClick: () => void;
}

const SignupForm = ({ onSignupSuccess, onLoginClick }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [rollNumber, setRollNumber] = useState("");
  const [major, setMajor] = useState<Major | "">("");
  const [department, setDepartment] = useState<Department | "">("");
  const [staffType, setStaffType] = useState<StaffType | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const generateEmail = (name: string, rollNumber: string): string => {
    return `${name.toLowerCase().replace(/\s+/g, "")}${rollNumber.toLowerCase()}@campus.edu`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !role || !rollNumber) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (role === "student" && !major) {
      toast.error("Please select a major");
      return;
    }
    
    if (role === "faculty" && !department) {
      toast.error("Please select a department");
      return;
    }
    
    if (role === "staff" && !staffType) {
      toast.error("Please select a staff type");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const email = generateEmail(name, rollNumber);
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        rollNumber,
        email,
        role: role as UserRole,
        ...(role === "student" && { major: major as Major }),
        ...(role === "faculty" && { department: department as Department }),
        ...(role === "staff" && { staffType: staffType as StaffType }),
        createdAt: new Date().toISOString(),
      };
      
      toast.success("Account created successfully!");
      onSignupSuccess(newUser);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details to create your campus account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
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
          
          {role === "student" && (
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Select
                value={major}
                onValueChange={(value) => setMajor(value as Major)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {role === "faculty" && (
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={department}
                onValueChange={(value) => setDepartment(value as Department)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {role === "staff" && (
            <div className="space-y-2">
              <Label htmlFor="staffType">Staff Type</Label>
              <Select
                value={staffType}
                onValueChange={(value) => setStaffType(value as StaffType)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select staff type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Event Manager">Event Manager</SelectItem>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {name && role && rollNumber && (
            <div className="space-y-2">
              <Label>Generated Email</Label>
              <div className="p-2 bg-muted rounded-md font-mono text-sm">
                {generateEmail(name, rollNumber)}
              </div>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0" onClick={onLoginClick}>
            Login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
