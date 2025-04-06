
import { useState, useEffect } from "react";
import { Event } from "@/types";
import { toast } from "sonner";
import EventsHeader from "@/components/events/EventsHeader";
import EventsTabs from "@/components/events/EventsTabs";
import CreateEventDialog from "@/components/events/CreateEventDialog";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load events from localStorage or initialize with sample data
    const savedEvents = localStorage.getItem("campus-events");
    
    if (savedEvents) {
      const parsedEvents: Event[] = JSON.parse(savedEvents);
      setEvents(parsedEvents);
    } else {
      // Sample events with properly typed event types
      setEvents([
        {
          id: "1",
          title: "Fall Semester Orientation",
          description: "Welcome session for new students",
          date: "Sept 10, 2025",
          time: "9:00 AM - 12:00 PM",
          location: "Main Auditorium",
          type: "Academic" as const,
          organizer: "Student Affairs"
        },
        {
          id: "2",
          title: "Annual Cultural Festival",
          description: "Celebrate diversity with performances and food",
          date: "Oct 15, 2025",
          time: "11:00 AM - 8:00 PM",
          location: "Campus Grounds",
          type: "Cultural" as const,
          organizer: "Cultural Committee"
        },
        {
          id: "3",
          title: "Programming Club Meetup",
          description: "Learn about the latest in web development",
          date: "Oct 20, 2025",
          time: "4:00 PM - 6:00 PM",
          location: "CS Building, Room 101",
          type: "Club" as const,
          organizer: "Programming Club",
          department: "Computer Science"
        },
        {
          id: "4",
          title: "Campus Cleanup Day",
          description: "Help keep our campus beautiful",
          date: "Oct 25, 2025",
          time: "9:00 AM - 1:00 PM",
          location: "Meeting at Admin Building",
          type: "Staff" as const,
          organizer: "Maintenance Department"
        }
      ]);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0 && !isLoading) {
      localStorage.setItem("campus-events", JSON.stringify(events));
    }
  }, [events, isLoading]);

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to determine badge color based on event type
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Cultural":
        return "bg-purple-100 text-purple-800";
      case "Club":
        return "bg-green-100 text-green-800";
      case "Staff":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle create event
  const handleCreateEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      ...eventData
    };
    
    setEvents([...events, newEvent]);
    setIsCreateDialogOpen(false);
    toast.success("Event created successfully");
  };

  return (
    <div className="space-y-6">
      <EventsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreateDialog={() => setIsCreateDialogOpen(true)}
      />

      <EventsTabs
        events={filteredEvents}
        getEventTypeColor={getEventTypeColor}
        isLoading={isLoading}
      />

      <CreateEventDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
};

export default Events;
