
import { User } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StudentCoursesList from "./student/StudentCoursesList";
import StudentEvents from "./student/StudentEvents";
import StudentAnnouncements from "./student/StudentAnnouncements";
import StudentProgress from "./student/StudentProgress";

interface StudentDashboardProps {
  user: User | null;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const handleRefresh = () => {
    toast.success("Dashboard refreshed successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Student Dashboard</h1>
        <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Courses</CardTitle>
            <CardDescription>
              {user?.major 
                ? `${user.major} courses this semester` 
                : "Current semester courses"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentCoursesList user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentEvents user={user} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Announcements</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentAnnouncements />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
          <CardDescription>
            {user?.major 
              ? `${user.major} - Course completion and grades` 
              : "Course completion and grades"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentProgress user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
