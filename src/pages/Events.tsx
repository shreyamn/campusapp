
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types";
import { Calendar, Filter, MapPin, Search, Users } from "lucide-react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in a real app, this would come from an API
  const events: Event[] = [
    {
      id: "1",
      title: "New Student Orientation",
      description: "Welcome session for new students",
      date: "Oct 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Main Auditorium",
      type: "Academic",
      organizer: "Student Affairs Office",
    },
    {
      id: "2",
      title: "Tech Career Fair",
      description: "Connect with tech companies for internships and job opportunities",
      date: "Oct 20, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Student Center",
      type: "Academic",
      organizer: "Career Services",
    },
    {
      id: "3",
      title: "Campus Music Festival",
      description: "Annual music festival featuring student bands and performers",
      date: "Oct 25, 2025",
      time: "5:00 PM - 10:00 PM",
      location: "Campus Grounds",
      type: "Cultural",
      organizer: "Student Activities Board",
    },
    {
      id: "4",
      title: "Coding Competition",
      description: "Test your programming skills and win prizes",
      date: "Nov 1, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Computer Science Building",
      type: "Club",
      department: "Computer Science",
      organizer: "Coding Club",
    },
    {
      id: "5",
      title: "Campus Cleanup Day",
      description: "Volunteer event to clean campus grounds",
      date: "Nov 5, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Campus Grounds",
      type: "Staff",
      organizer: "Facilities Management",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="cultural">Cultural</TabsTrigger>
          <TabsTrigger value="club">Club</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No events found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
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
              ))}
            </div>
          )}
        </TabsContent>
        
        {["academic", "cultural", "club", "staff"].map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter((event) => event.type.toLowerCase() === type)
                .map((event) => (
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
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Events;
