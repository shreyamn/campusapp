
import { Button } from "@/components/ui/button";
import { MapLocation } from "@/types";
import { X, Building, Microscope, Coffee, Users, Briefcase, HelpCircle, MapPin } from "lucide-react";

interface LocationDetailsProps {
  location: MapLocation;
  onClose: () => void;
}

const LocationDetails = ({ location, onClose }: LocationDetailsProps) => {
  // Determine icon and color based on location type
  const getIcon = () => {
    switch (location.type) {
      case "building":
        return <Building className="h-5 w-5" />;
      case "lab":
        return <Microscope className="h-5 w-5" />;
      case "cafeteria":
        return <Coffee className="h-5 w-5" />;
      case "department":
        return <Users className="h-5 w-5" />;
      case "staff":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <HelpCircle className="h-5 w-5" />;
    }
  };

  // Get color class based on location type
  const getColorClass = () => {
    switch (location.type) {
      case "building":
        return "bg-blue-100 text-blue-700";
      case "lab":
        return "bg-purple-100 text-purple-700";
      case "cafeteria":
        return "bg-yellow-100 text-yellow-700";
      case "department":
        return "bg-green-100 text-green-700";
      case "staff":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="bg-muted p-4 flex justify-between items-center">
        <h3 className="font-semibold">{location.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 flex-1">
        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm mb-4 ${getColorClass()}`}>
          {getIcon()}
          <span className="capitalize">{location.type}</span>
        </div>
        
        <p className="text-muted-foreground mb-4">{location.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Coordinates: {location.coordinates.x}, {location.coordinates.y}</span>
        </div>
      </div>
      
      <div className="border-t p-4">
        <Button className="w-full">View Details</Button>
      </div>
    </div>
  );
};

export default LocationDetails;
