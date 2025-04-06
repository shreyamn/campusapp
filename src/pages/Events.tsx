
import { useState, useEffect } from "react";
import { Event } from "@/types";
import EventsHeader from "@/components/events/EventsHeader";
import EventsTabs from "@/components/events/EventsTabs";
import { getAllEvents, getEventTypeColor, searchEvents } from "@/services/events";
import { useToast } from "@/components/ui/toast";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  // Handle search
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() === "") {
        // If search is cleared, load all events
        const allEvents = await getAllEvents();
        setEvents(allEvents);
        return;
      }

      try {
        setLoading(true);
        const results = await searchEvents(searchQuery);
        setEvents(results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to avoid too many requests while typing
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <EventsHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <EventsTabs 
        events={events}
        getEventTypeColor={getEventTypeColor}
        isLoading={loading}
      />
    </div>
  );
};

export default Events;
