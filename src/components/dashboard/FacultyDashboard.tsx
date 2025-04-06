
import { User } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FacultyCourses from "./faculty/FacultyCourses";
import FacultySchedule from "./faculty/FacultySchedule";
import FacultySubmissions from "./faculty/FacultySubmissions";
import FacultyStats from "./faculty/FacultyStats";

interface FacultyDashboardProps {
  user: User | null;
}

const FacultyDashboard = ({ user }: FacultyDashboardProps) => {
  // Button action handlers
  const handleRefresh = () => {
    toast.success("Dashboard refreshed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Faculty Dashboard</h1>
        <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Courses</CardTitle>
            <CardDescription>
              {user?.department 
                ? `Currently teaching ${user.department} courses` 
                : "No department assigned"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FacultyCourses user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
            <CardDescription>Thursday, Oct 5, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <FacultySchedule user={user} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Student assignments and projects</CardDescription>
          </CardHeader>
          <CardContent>
            <FacultySubmissions user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>
              {user?.department 
                ? `${user.department} Department - Current semester performance` 
                : "Department statistics not available"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FacultyStats user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
