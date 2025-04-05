
import { User } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, BookOpen, CheckCircle, AlertCircle } from "lucide-react";

interface StudentDashboardProps {
  user: User;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  // Mock data - in a real app, this would come from an API
  const courses = [
    {
      id: "1",
      name: "Introduction to Programming",
      code: "CS101",
      progress: 75,
      nextClass: "Today, 10:00 AM",
      assignments: 2,
    },
    {
      id: "2",
      name: "Data Structures",
      code: "CS202",
      progress: 60,
      nextClass: "Tomorrow, 2:00 PM",
      assignments: 1,
    },
    {
      id: "3",
      name: "Database Systems",
      code: "CS303",
      progress: 40,
      nextClass: "Wednesday, 11:00 AM",
      assignments: 0,
    },
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Midterm Examination",
      date: "Oct 15, 2025",
      type: "academic",
    },
    {
      id: "2",
      title: "Coding Competition",
      date: "Oct 20, 2025",
      type: "club",
    },
  ];

  const recentAnnouncements = [
    {
      id: "1",
      title: "Updated Course Schedule",
      date: "2 hours ago",
      priority: "high",
    },
    {
      id: "2",
      title: "Campus WiFi Maintenance",
      date: "1 day ago",
      priority: "medium",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Student Dashboard</h1>
        <Button variant="outline">Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Courses</CardTitle>
            <CardDescription>Current semester courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                    </div>
                    <Badge variant="outline">{course.assignments} assignments</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Next class: {course.nextClass}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant={event.type === "academic" ? "destructive" : "default"}>
                    {event.type}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                View all events
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Announcements</CardTitle>
            <CardDescription>Latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {announcement.priority === "high" ? (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground">{announcement.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full">
                View all announcements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
          <CardDescription>Course completion and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="campus-card">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Attendance</h4>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">Above average</p>
              </div>
              <div className="campus-card">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Assignments</h4>
                <div className="text-2xl font-bold">18/20</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="campus-card">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Current GPA</h4>
                <div className="text-2xl font-bold">3.7</div>
                <p className="text-xs text-muted-foreground">A-</p>
              </div>
              <div className="campus-card">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Credits</h4>
                <div className="text-2xl font-bold">42/120</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
