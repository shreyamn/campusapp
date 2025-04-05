
import { MapLocation } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InteractiveMapProps {
  locations: MapLocation[];
  onLocationClick: (location: MapLocation) => void;
}

const InteractiveMap = ({ locations, onLocationClick }: InteractiveMapProps) => {
  return (
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
                  onClick={() => onLocationClick(location)}
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
  );
};

export default InteractiveMap;
