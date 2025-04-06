
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const StudentAnnouncements = () => {
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

  const handleViewAllAnnouncements = () => {
    toast.info("Viewing all announcements");
  };

  return (
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
  );
};

export default StudentAnnouncements;
