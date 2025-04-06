
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

interface FacultyScheduleProps {
  user: User | null;
}

const FacultySchedule = ({ user }: FacultyScheduleProps) => {
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

  const handleViewCalendar = () => {
    toast.info("Opening full calendar");
  };

  return (
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
      <Button variant="ghost" size="sm" className="w-full" onClick={handleViewCalendar}>
        View full calendar
      </Button>
    </div>
  );
};

export default FacultySchedule;
