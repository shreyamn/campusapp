
import { MapLocation } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PopularLocationsProps {
  locations: MapLocation[];
  onLocationClick: (location: MapLocation) => void;
  getBadgeVariant: (type: string) => string;
}

const PopularLocations = ({ locations, onLocationClick, getBadgeVariant }: PopularLocationsProps) => {
  return (
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
              onClick={() => onLocationClick(location)}
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
  );
};

export default PopularLocations;
