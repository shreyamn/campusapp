import { User, Major } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface StudentDashboardProps {
  user: User;
}

interface StudentCourse {
  id: string;
  name: string;
  code: string;
  major: Major;
  progress: number;
  nextClass: string;
  assignments: number;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  // All possible courses
  const allCourses: StudentCourse[] = [
    {
      id: "1",
      name: "Introduction to Programming",
      code: "CS101",
      major: "Computer Science",
      progress: 75,
      nextClass: "Today, 10:00 AM",
      assignments: 2,
    },
    {
      id: "2",
      name: "Data Structures",
      code: "CS202",
      major: "Computer Science",
      progress: 60,
      nextClass: "Tomorrow, 2:00 PM",
      assignments: 1,
    },
    {
      id: "3",
      name: "Database Systems",
      code: "CS303",
      major: "Computer Science",
      progress: 40,
      nextClass: "Wednesday, 11:00 AM",
      assignments: 0,
    },
    {
      id: "4",
      name: "Cell Biology",
      code: "BIO201",
      major: "Biology",
      progress: 85,
      nextClass: "Today, 1:00 PM",
      assignments: 1,
    },
    {
      id: "5",
      name: "Genetics",
      code: "BIO302",
      major: "Biology",
      progress: 70,
      nextClass: "Tomorrow, 9:00 AM",
      assignments: 2,
    },
    {
      id: "6",
      name: "Calculus I",
      code: "MATH201",
      major: "Mathematics",
      progress: 65,
      nextClass: "Thursday, 10:00 AM",
      assignments: 3,
    },
    {
      id: "7",
      name: "Linear Algebra",
      code: "MATH302",
      major: "Mathematics",
      progress: 50,
      nextClass: "Friday, 2:00 PM",
      assignments: 1,
    },
    {
      id: "8",
      name: "Fundamentals of Nursing",
      code: "NUR101",
      major: "Nursing",
      progress: 80,
      nextClass: "Today, 9:00 AM",
      assignments: 2,
    },
    {
      id: "9",
      name: "Clinical Practice",
      code: "NUR202",
      major: "Nursing",
      progress: 75,
      nextClass: "Tomorrow, 8:00 AM",
      assignments: 1,
    },
  ];

  // Get courses related to student's major
  const getCoursesByMajor = () => {
    if (!user.major) return [];
    return allCourses.filter(course => course.major === user.major);
  };

  const courses = getCoursesByMajor();

  // Use major-specific events
  const getUpcomingEventsByMajor = () => {
    if (!user.major) return [];
    
    const eventsByMajor = {
      "Computer Science": [
        {
          id: "1",
          title: "Programming Competition",
          date: "Oct 15, 2025",
          type: "club",
        },
        {
          id: "2",
          title: "CS Midterm Examination",
          date: "Oct 20, 2025",
          type: "academic",
        },
      ],
      "Biology": [
        {
          id: "1",
          title: "Lab Safety Workshop",
          date: "Oct 12, 2025",
          type: "academic",
        },
        {
          id: "2",
          title: "Biology Research Symposium",
          date: "Oct 18, 2025",
          type: "club",
        },
      ],
      "Mathematics": [
        {
          id: "1",
          title: "Math Olympiad",
          date: "Oct 14, 2025",
          type: "club",
        },
        {
          id: "2",
          title: "Statistics Review Session",
          date: "Oct 19, 2025",
          type: "academic",
        },
      ],
      "Nursing": [
        {
          id: "1",
          title: "Clinical Skills Workshop",
          date: "Oct 13, 2025",
          type: "academic",
        },
        {
          id: "2",
          title: "Healthcare Ethics Conference",
          date: "Oct 21, 2025",
          type: "club",
        },
      ],
    };
    
    return eventsByMajor[user.major] || [];
  };

  const upcomingEvents = getUpcomingEventsByMajor();

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

  // Button handlers
  const handleRefresh = () => {
    toast.success("Dashboard refreshed successfully");
  };

  const handleViewAllEvents = () => {
    toast.info("Viewing all events");
  };

  const handleViewAllAnnouncements = () => {
    toast.info("Viewing all announcements");
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
              {user.major 
                ? `${user.major} courses this semester` 
                : "Current semester courses"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">
                  {user.major 
                    ? `No courses available for ${user.major}.` 
                    : "No major selected. Please update your profile."}
                </p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming events.</p>
              </div>
            ) : (
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
                <Button variant="ghost" size="sm" className="w-full" onClick={handleViewAllEvents}>
                  View all events
                </Button>
              </div>
            )}
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
              <Button variant="ghost" size="sm" className="w-full" onClick={handleViewAllAnnouncements}>
                View all announcements
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Academic Progress</CardTitle>
          <CardDescription>
            {user.major 
              ? `${user.major} - Course completion and grades` 
              : "Course completion and grades"}
          </CardDescription>
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
