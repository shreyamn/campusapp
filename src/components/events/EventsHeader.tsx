
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface EventsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const EventsHeader = ({ searchQuery, setSearchQuery }: EventsHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Events</h1>
        <Button>+ Create Event</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </>
  );
};

export default EventsHeader;
