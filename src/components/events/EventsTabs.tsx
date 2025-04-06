
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types";
import EventsTabContent from "./EventsTabContent";

interface EventsTabsProps {
  events: Event[];
  getEventTypeColor: (type: string) => string;
}

const EventsTabs = ({ events, getEventTypeColor }: EventsTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Events</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
        <TabsTrigger value="cultural">Cultural</TabsTrigger>
        <TabsTrigger value="club">Club</TabsTrigger>
        <TabsTrigger value="staff">Staff</TabsTrigger>
      </TabsList>
      
      <EventsTabContent 
        value="all" 
        events={events} 
        getEventTypeColor={getEventTypeColor}
      />
      
      {["academic", "cultural", "club", "staff"].map((type) => (
        <EventsTabContent 
          key={type} 
          value={type} 
          events={events} 
          getEventTypeColor={getEventTypeColor}
          filterByType={true}
        />
      ))}
    </Tabs>
  );
};

export default EventsTabs;
