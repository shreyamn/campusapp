
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Book, Users } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "academic" | "event" | "club" | "system";
  date: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Assignment Deadline",
      message: "Your CS101 programming assignment is due tomorrow at 11:59 PM.",
      type: "academic",
      date: "April 4, 2025",
      read: false,
    },
    {
      id: "2",
      title: "New Event",
      message: "Campus Music Festival registration is now open. Don't miss out!",
      type: "event",
      date: "April 3, 2025",
      read: false,
    },
    {
      id: "3",
      title: "Club Announcement",
      message: "Programming Club meeting tomorrow at 5 PM in Room 302.",
      type: "club",
      date: "April 2, 2025",
      read: true,
    },
    {
      id: "4",
      title: "System Update",
      message: "The campus app will be under maintenance tonight from 2-3 AM.",
      type: "system",
      date: "April 1, 2025",
      read: true,
    },
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <Book className="h-5 w-5" />;
      case "event":
        return <Calendar className="h-5 w-5" />;
      case "club":
        return <Users className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const filterByType = (type: string | null) => {
    if (!type) return notifications;
    return notifications.filter(notification => notification.type === type);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline">Mark All as Read</Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="club">Clubs</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        {["all", "academic", "event", "club", "system"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="space-y-4">
              {filterByType(tab === "all" ? null : tab).map((notification) => (
                <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                  <CardHeader className="pb-2 flex flex-row justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-muted-foreground">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{getTypeLabel(notification.type)}</Badge>
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                        </div>
                      </div>
                    </div>
                    {!notification.read && (
                      <Badge className="bg-primary">New</Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{notification.message}</p>
                    <div className="flex justify-end gap-2">
                      {!notification.read && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Notifications;
