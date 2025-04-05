
import { User } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock, Users, FileText, Calendar } from "lucide-react";

interface FacultyDashboardProps {
  user: User;
}

const FacultyDashboard = ({ user }: FacultyDashboardProps) => {
  // Mock data - in a real app, this would come from an API
  const courses = [
    {
      id: "1",
      name: "Introduction to Programming",
      code: "CS101",
      students: 45,
      nextClass: "Today, 10:00 AM",
      room: "R201",
      pending: 12,
    },
    {
      id: "2",
      name: "Advanced Database Systems",
      code: "CS403",
      students: 28,
      nextClass: "Tomorrow, 2:00 PM",
      room: "R105",
      pending: 5,
    },
  ];

  const upcomingSchedule = [
    {
      id: "1",
      title: "CS101 Lecture",
      time: "10:00 AM - 11:30 AM",
      room: "R201",
    },
    {
      id: "2",
      title: "Office Hours",
      time: "1:00 PM - 3:00 PM",
      room: "F302",
    },
    {
      id: "3",
      title: "Department Meeting",
      time: "4:00 PM - 5:00 PM",
      room: "Conference Hall",
    },
  ];

  const recentSubmissions = [
    {
      id: "1",
      name: "Emma Johnson",
      assignment: "Lab 3 - Data Structures",
      time: "2 hours ago",
    },
    {
      id: "2",
      name: "Michael Smith",
      assignment: "Assignment 2 - Algorithms",
      time: "5 hours ago",
    },
    {
      id: "3",
      name: "Sophia Williams",
      assignment: "Project Proposal",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Faculty Dashboard</h1>
        <Button variant="outline">Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Courses</CardTitle>
            <CardDescription>Currently teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="campus-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                    </div>
                    <Badge variant="secondary">{course.students} students</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.nextClass}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{course.pending} pending reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="ghost" size="sm">Course Details</Button>
                    <Button variant="outline" size="sm">Grade Assignments</Button>
                    <Button size="sm">Manage Class</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
            <CardDescription>Thursday, Oct 5, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedule.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                    <p className="text-xs text-muted-foreground">Room: {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              View full calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Student assignments and projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center space-x-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {submission.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{submission.name}</h3>
                    <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{submission.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              View all submissions
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>Current semester performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="campus-card">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Students Enrolled
                  </h4>
                  <div className="text-2xl font-bold">73</div>
                  <p className="text-xs text-muted-foreground">+12% from last semester</p>
                </div>
                <div className="campus-card">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Average Attendance
                  </h4>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+3% from last month</p>
                </div>
                <div className="campus-card">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Average Grade
                  </h4>
                  <div className="text-2xl font-bold">B+</div>
                  <p className="text-xs text-muted-foreground">3.3 GPA</p>
                </div>
                <div className="campus-card">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Course Completion
                  </h4>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">High retention rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
