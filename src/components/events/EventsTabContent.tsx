
import { Event } from "@/types";
import { TabsContent } from "@/components/ui/tabs";
import EventsList from "./EventsList";

interface EventsTabContentProps {
  value: string;
  events: Event[];
  getEventTypeColor: (type: string) => string;
  filterByType?: boolean;
}

const EventsTabContent = ({ 
  value, 
  events, 
  getEventTypeColor,
  filterByType = false 
}: EventsTabContentProps) => {
  // If we need to filter by type and the value is not 'all', filter the events
  const filteredEvents = filterByType && value !== 'all' 
    ? events.filter((event) => event.type.toLowerCase() === value)
    : events;

  return (
    <TabsContent value={value} className="mt-4">
      <EventsList 
        events={filteredEvents} 
        getEventTypeColor={getEventTypeColor} 
      />
    </TabsContent>
  );
};

export default EventsTabContent;
