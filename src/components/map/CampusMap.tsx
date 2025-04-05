
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapLocation } from "@/types";

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  
  // Mock data - in a real app, this would come from an API
  const locations: MapLocation[] = [
    {
      id: "1",
      name: "Admin Building",
      type: "building",
      description: "Main administrative offices and conference rooms",
      coordinates: { x: 20, y: 30 },
    },
    {
      id: "2",
      name: "Science Lab",
      type: "lab",
      description: "Research laboratories for biology and chemistry",
      coordinates: { x: 45, y: 40 },
    },
    {
      id: "3",
      name: "Computer Science Department",
      type: "department",
      description: "Faculty offices and computer labs",
      coordinates: { x: 60, y: 35 },
    },
    {
      id: "4",
      name: "Main Cafeteria",
      type: "cafeteria",
      description: "Campus dining facility with various food options",
      coordinates: { x: 35, y: 60 },
    },
    {
      id: "5",
      name: "Central Library",
      type: "building",
      description: "Main campus library with study spaces",
      coordinates: { x: 75, y: 50 },
    },
    {
      id: "6",
      name: "Student Center",
      type: "building",
      description: "Student services and recreational activities",
      coordinates: { x: 30, y: 75 },
    },
  ];

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const closeLocationDetails = () => {
    setSelectedLocation(null);
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "building":
        return "default";
      case "lab":
        return "secondary";
      case "department":
        return "outline";
      case "cafeteria":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="campus-heading">Campus Map</h1>
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          <Button>Get Directions</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Interactive Campus Map</CardTitle>
              <CardDescription>Click on a location to learn more</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border">
                {/* This would be replaced with an actual map component in a real app */}
                <div className="absolute inset-0 p-4">
                  <div className="w-full h-full relative">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleLocationClick(location)}
                        className="absolute rounded-full bg-primary hover:bg-primary/90 transition-colors p-2 text-white font-bold flex items-center justify-center z-10"
                        style={{ 
                          left: `${location.coordinates.x}%`, 
                          top: `${location.coordinates.y}%`,
                          transform: "translate(-50%, -50%)",
                          width: "24px",
                          height: "24px",
                        }}
                        aria-label={location.name}
                      >
                        {location.id}
                      </button>
                    ))}
                    
                    {/* Map grid lines */}
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                      {Array.from({ length: 100 }).map((_, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 opacity-20"
                        ></div>
                      ))}
                    </div>
                    
                    <div className="absolute left-4 bottom-4 rounded-md bg-white p-2 shadow-sm border">
                      <div className="text-xs font-medium">Map Legend</div>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="text-xs">Locations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedLocation ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedLocation.name}</CardTitle>
                    <CardDescription>
                      <Badge variant={getBadgeVariant(selectedLocation.type)} className="mt-1">
                        {selectedLocation.type}
                      </Badge>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeLocationDetails}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{selectedLocation.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Hours</h3>
                  <p className="mt-1">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                  <p className="mt-1">campus@example.edu</p>
                  <p>+1 (555) 123-4567</p>
                </div>
                
                <div className="pt-4 flex gap-2">
                  <Button variant="outline" className="w-full">View Details</Button>
                  <Button className="w-full">Get Directions</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>
                  Select a location on the map to view details
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Click on a numbered marker on the map</p>
                  <p className="text-sm mt-2">to view location details</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Popular Locations</CardTitle>
              <CardDescription>Quick access to common places</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {locations.slice(0, 4).map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className="w-full text-left p-2 hover:bg-accent rounded-md transition-colors flex justify-between items-center"
                  >
                    <span>{location.name}</span>
                    <Badge variant={getBadgeVariant(location.type)}>
                      {location.type}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
