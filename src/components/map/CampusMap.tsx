
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapLocation } from "@/types";
import InteractiveMap from "./InteractiveMap";
import LocationDetails from "./LocationDetails";
import EmptyLocationState from "./EmptyLocationState";
import PopularLocations from "./PopularLocations";
import { getBadgeVariant, getLocations } from "./utils/mapUtils";

const CampusMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const locations = getLocations();

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const closeLocationDetails = () => {
    setSelectedLocation(null);
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
          <InteractiveMap 
            locations={locations}
            onLocationClick={handleLocationClick}
          />
        </div>

        <div>
          {selectedLocation ? (
            <LocationDetails 
              location={selectedLocation}
              onClose={closeLocationDetails}
              getBadgeVariant={getBadgeVariant}
            />
          ) : (
            <EmptyLocationState />
          )}

          <PopularLocations 
            locations={locations}
            onLocationClick={handleLocationClick}
            getBadgeVariant={getBadgeVariant}
          />
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
