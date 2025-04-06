
import { User } from "@/types";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import FacultyDashboard from "@/components/dashboard/FacultyDashboard";
import StaffDashboard from "@/components/dashboard/StaffDashboard";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Settings, FileText } from "lucide-react";
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminSettings from "@/components/dashboard/admin/AdminSettings";
import AdminLogs from "@/components/dashboard/admin/AdminLogs";

interface DashboardProps {
  user: User | null;
}

const Dashboard = ({ user }: DashboardProps) => {
  // If user is null or undefined, show a loading state or redirect
  if (!user) {
    return <Navigate to="/" />;
  }

  // State for admin dashboard views
  const [adminView, setAdminView] = useState<'overview' | 'users' | 'settings' | 'logs'>('overview');

  const renderDashboard = () => {
    switch (user.role) {
      case "student":
        return <StudentDashboard user={user} />;
      case "faculty":
        return <FacultyDashboard user={user} />;
      case "staff":
        return <StaffDashboard user={user} />;
      case "admin":
        // For admin dashboard, show different views based on state
        if (adminView === 'users') {
          return <AdminUsers onBack={() => setAdminView('overview')} />;
        } else if (adminView === 'settings') {
          return <AdminSettings onBack={() => setAdminView('overview')} />;
        } else if (adminView === 'logs') {
          return <AdminLogs onBack={() => setAdminView('overview')} />;
        }
        
        // Default overview
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">System Overview</h2>
                <p className="text-muted-foreground">
                  Welcome, {user.name}. You have full access to the system.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
                <ul className="space-y-2">
                  <li>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-2 text-primary hover:underline cursor-pointer w-full justify-start p-2"
                      onClick={() => setAdminView('users')}
                    >
                      <UserIcon size={16} />
                      <span>Manage Users</span>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-2 text-primary hover:underline cursor-pointer w-full justify-start p-2"
                      onClick={() => setAdminView('settings')}
                    >
                      <Settings size={16} />
                      <span>System Settings</span>
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost" 
                      className="flex items-center gap-2 text-primary hover:underline cursor-pointer w-full justify-start p-2"
                      onClick={() => setAdminView('logs')}
                    >
                      <FileText size={16} />
                      <span>View Logs</span>
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
                <p className="text-muted-foreground">No recent activities to display.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            Invalid user role: {user.role}
          </div>
        );
    }
  };

  return renderDashboard();
};

export default Dashboard;
