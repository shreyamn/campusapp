
import { Event } from "@/types";
import EventCard from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsListProps {
  events: Event[];
  getEventTypeColor: (type: string) => string;
  isLoading?: boolean;
}

const EventsList = ({ events, getEventTypeColor, isLoading = false }: EventsListProps) => {
  // Show skeletons while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="rounded-lg border p-4 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

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
