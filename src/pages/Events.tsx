
import { useState } from "react";
import { getEventTypeColor, mockEvents } from "@/components/events/EventsUtils";
import EventsHeader from "@/components/events/EventsHeader";
import EventsTabs from "@/components/events/EventsTabs";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on search query
  const filteredEvents = mockEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <EventsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <EventsTabs 
        events={filteredEvents}
        getEventTypeColor={getEventTypeColor}
      />
    </div>
  );
};

export default Events;
