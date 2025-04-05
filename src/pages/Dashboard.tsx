
import { User } from "@/types";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import FacultyDashboard from "@/components/dashboard/FacultyDashboard";
import StaffDashboard from "@/components/dashboard/StaffDashboard";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const renderDashboard = () => {
    switch (user.role) {
      case "student":
        return <StudentDashboard user={user} />;
      case "faculty":
        return <FacultyDashboard user={user} />;
      case "staff":
        return <StaffDashboard user={user} />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;
