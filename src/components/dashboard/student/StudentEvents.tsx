
import { User, Major } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

interface EventItem {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface StudentEventsProps {
  user: User | null;
}

const StudentEvents = ({ user }: StudentEventsProps) => {
  // Use major-specific events
  const getUpcomingEventsByMajor = () => {
    if (!user?.major) return [];
    
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

  const handleViewAllEvents = () => {
    toast.info("Viewing all events");
  };

  return (
    <>
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
    </>
  );
};

export default StudentEvents;
