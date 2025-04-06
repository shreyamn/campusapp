
import { Event } from "@/types";
import EventCard from "./EventCard";

interface EventsListProps {
  events: Event[];
  getEventTypeColor: (type: string) => string;
}

const EventsList = ({ events, getEventTypeColor }: EventsListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          getEventTypeColor={getEventTypeColor} 
        />
      ))}
    </div>
  );
};

export default EventsList;
