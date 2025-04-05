
import { User } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, AlertTriangle } from "lucide-react";

interface StaffDashboardProps {
  user: User;
}

const StaffDashboard = ({ user }: StaffDashboardProps) => {
  // Mock data - in a real app, this would come from an API
  const currentTasks = [
    {
      id: "1",
      title: "Clean Main Hall",
      location: "Admin Building, Floor 1",
      deadline: "Today, 12:00 PM",
      priority: "high",
      status: "in-progress",
    },
    {
      id: "2",
      title: "Restock Supplies",
      location: "Science Lab, Room 302",
      deadline: "Today, 3:00 PM",
      priority: "medium",
      status: "pending",
    },
    {
      id: "3",
      title: "Fix Projector",
      location: "Lecture Hall B",
      deadline: "Tomorrow, 9:00 AM",
      priority: "low",
      status: "pending",
    },
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Faculty Meeting",
      date: "Oct 12, 2025",
      location: "Conference Room A",
      setup: true,
    },
    {
      id: "2",
      title: "Student Orientation",
      date: "Oct 15, 2025",
      location: "Main Auditorium",
      setup: true,
    },
    {
      id: "3",
      title: "Alumni Gathering",
      date: "Oct 20, 2025",
      location: "Campus Grounds",
      setup: true,
    },
  ];

  const pendingRequests = [
    {
      id: "1",
      title: "Classroom Cleaning",
      requestedBy: "Prof. Johnson",
      department: "Computer Science",
      requestedOn: "2 hours ago",
    },
    {
      id: "2",
      title: "Equipment Setup",
      requestedBy: "Dr. Williams",
      department: "Biology",
      requestedOn: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Staff Dashboard</h1>
        <Button variant="outline">Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">Current Tasks</CardTitle>
                <CardDescription>Tasks assigned to you</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTasks.map((task) => (
                <div key={task.id} className="campus-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                              ? "default"
                              : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{task.location}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.status === "in-progress"
                          ? "secondary"
                          : task.status === "completed"
                          ? "default"
                          : "outline"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Deadline: {task.deadline}</span>
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="ghost" size="sm">
                      Flag Issue
                    </Button>
                    <Button
                      variant={task.status === "completed" ? "outline" : "default"}
                      size="sm"
                    >
                      {task.status === "completed" ? "Completed" : "Mark as Done"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Requests</CardTitle>
            <CardDescription>Awaiting your action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="campus-card">
                  <h3 className="font-medium">{request.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    From: {request.requestedBy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dept: {request.department}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Requested: {request.requestedOn}
                  </p>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="ghost" size="sm">
                      Decline
                    </Button>
                    <Button size="sm">Accept</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              View all requests
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Events requiring setup and management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-xs text-muted-foreground">Location: {event.location}</p>
                </div>
                <div>
                  {event.setup ? (
                    <Badge variant="outline" className="whitespace-nowrap">
                      Setup Required
                    </Badge>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            View Calendar
          </Button>
          <Button variant="outline" size="sm">
            Manage Events
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffDashboard;
