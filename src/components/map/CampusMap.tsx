
import { useState } from "react";
import { MapLocation, LocationType } from "@/types";
import LocationDetails from "./LocationDetails";
import MapSearchAndFilter from "./MapSearchAndFilter";
import MapView from "./MapView";
import { getAllLocations } from "./data/mapLocations";
import EmptyLocationState from "./EmptyLocationState";

const CampusMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterType, setFilterType] = useState<"all" | LocationType>("all");
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  
  const allLocations = getAllLocations();

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
      
      <MapSearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapView
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onLocationClick={handleLocationClick}
            zoomLevel={zoomLevel}
            mapCenter={mapCenter}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onResetMap={resetMap}
          />
        </div>
        
        <div>
          {selectedLocation ? (
            <LocationDetails 
              location={selectedLocation} 
              onClose={() => setSelectedLocation(null)} 
            />
          ) : (
            <EmptyLocationState />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
