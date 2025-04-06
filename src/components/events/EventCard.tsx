
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
  getEventTypeColor: (type: string) => string;
}

const EventCard = ({ event, getEventTypeColor }: EventCardProps) => {
  return (
    <Card key={event.id}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{event.title}</CardTitle>
          <Badge className={getEventTypeColor(event.type)}>
            {event.type}
          </Badge>
        </div>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="text-sm">{event.date}</p>
            <p className="text-sm text-muted-foreground">{event.time}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <p className="text-sm">{event.location}</p>
        </div>
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
          <p className="text-sm">{event.organizer}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" className="flex-1">Details</Button>
        <Button className="flex-1">RSVP</Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
