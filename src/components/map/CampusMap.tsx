
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ZoomIn, ZoomOut, Home } from "lucide-react";
import { MapLocation, LocationType } from "@/types";
import LocationMarker from "./LocationMarker";
import LocationDetails from "./LocationDetails";

const CampusMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterType, setFilterType] = useState<"all" | LocationType>("all");
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  
  // Create sample locations for the campus map
  const buildings: MapLocation[] = [
    {
      id: "b1",
      name: "Main Academic Building",
      type: "building",
      description: "The main building housing lecture halls and faculty offices.",
      coordinates: { x: 30, y: 40 },
    },
    {
      id: "b2",
      name: "Student Center",
      type: "building",
      description: "Hub for student activities, dining, and recreation.",
      coordinates: { x: 70, y: 60 },
    },
    {
      id: "b3",
      name: "Science Complex",
      type: "building",
      description: "Houses laboratories and research facilities.",
      coordinates: { x: 45, y: 25 },
    },
  ];

  const facilities: MapLocation[] = [
    {
      id: "f1",
      name: "Computer Lab",
      type: "lab",
      description: "State-of-the-art computer lab with the latest hardware and software.",
      coordinates: { x: 35, y: 45 },
    },
    {
      id: "f2",
      name: "Main Cafeteria",
      type: "cafeteria",
      description: "Campus dining hall offering a variety of food options.",
      coordinates: { x: 65, y: 50 },
    },
    {
      id: "f3",
      name: "Biology Department",
      type: "department",
      description: "Home to the Biology department faculty and research.",
      coordinates: { x: 40, y: 30 },
    },
    {
      id: "f4",
      name: "Staff Lounge",
      type: "staff",
      description: "Exclusive area for faculty and staff relaxation.",
      coordinates: { x: 55, y: 35 },
    },
  ];

  const allLocations = [...buildings, ...facilities];

  // Filter locations based on search query and filter type
  const filteredLocations = allLocations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || location.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Reset map to default view
  const resetMap = () => {
    setZoomLevel(1);
    setMapCenter({ x: 50, y: 50 });
    setSelectedLocation(null);
  };

  // Zoom in function
  const zoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.2);
    }
  };

  // Zoom out function
  const zoomOut = () => {
    if (zoomLevel > 0.6) {
      setZoomLevel(zoomLevel - 0.2);
    }
  };

  // Handle location click
  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    setMapCenter(location.coordinates);
    setZoomLevel(1.5);
  };

  return (
    <div className="space-y-6">
      <h1 className="campus-heading">Campus Map</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={filterType} onValueChange={(v) => setFilterType(v as "all" | LocationType)} className="flex-shrink-0">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="building">Buildings</TabsTrigger>
            <TabsTrigger value="lab">Labs</TabsTrigger>
            <TabsTrigger value="department">Departments</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative bg-muted/50 border rounded-lg h-[500px] overflow-hidden">
            {/* Map container */}
            <div 
              className="absolute inset-0 transition-transform duration-300"
              style={{ 
                transform: `scale(${zoomLevel}) translate(${50 - mapCenter.x}%, ${50 - mapCenter.y}%)`
              }}
            >
              {/* Campus background */}
              <div className="absolute inset-0 bg-green-100">
                {/* Campus paths */}
                <div className="absolute top-[40%] left-[20%] w-[60%] h-[4px] bg-gray-300"></div>
                <div className="absolute top-[20%] left-[45%] w-[4px] h-[60%] bg-gray-300"></div>
                <div className="absolute top-[60%] left-[30%] w-[40%] h-[4px] bg-gray-300"></div>
                <div className="absolute top-[30%] left-[30%] w-[4px] h-[30%] bg-gray-300"></div>
                
                {/* Green areas */}
                <div className="absolute top-[30%] left-[60%] w-[15%] h-[15%] rounded-full bg-green-300"></div>
                <div className="absolute top-[50%] left-[25%] w-[10%] h-[10%] rounded-full bg-green-300"></div>
              </div>
              
              {/* Map locations */}
              {filteredLocations.map((location) => (
                <LocationMarker
                  key={location.id}
                  location={location}
                  isSelected={selectedLocation?.id === location.id}
                  onClick={() => handleLocationClick(location)}
                />
              ))}
            </div>
            
            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button size="icon" variant="outline" onClick={zoomIn} className="bg-white">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={zoomOut} className="bg-white">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={resetMap} className="bg-white">
                <Home className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          {selectedLocation ? (
            <LocationDetails 
              location={selectedLocation} 
              onClose={() => setSelectedLocation(null)} 
            />
          ) : (
            <div className="border rounded-lg p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Select a location on the map to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
