
import { MapLocation } from "@/types";
import { Building, Microscope, Coffee, Users, Briefcase, HelpCircle } from "lucide-react";

interface LocationMarkerProps {
  location: MapLocation;
  isSelected: boolean;
  onClick: () => void;
}

const LocationMarker = ({ location, isSelected, onClick }: LocationMarkerProps) => {
  // Determine icon based on location type
  const getIcon = () => {
    switch (location.type) {
      case "building":
        return <Building className="h-full w-full" />;
      case "lab":
        return <Microscope className="h-full w-full" />;
      case "cafeteria":
        return <Coffee className="h-full w-full" />;
      case "department":
        return <Users className="h-full w-full" />;
      case "staff":
        return <Briefcase className="h-full w-full" />;
      default:
        return <HelpCircle className="h-full w-full" />;
    }
  };

  // Determine marker color based on location type
  const getMarkerColor = () => {
    switch (location.type) {
      case "building":
        return "bg-blue-500";
      case "lab":
        return "bg-purple-500";
      case "cafeteria":
        return "bg-yellow-500";
      case "department":
        return "bg-green-500";
      case "staff":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ${isSelected ? 'z-10 scale-125' : 'hover:scale-110'}`}
      style={{
        left: `${location.coordinates.x}%`,
        top: `${location.coordinates.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      <div 
        className={`h-8 w-8 rounded-full ${getMarkerColor()} text-white flex items-center justify-center
                   shadow-md border-2 ${isSelected ? 'border-white' : 'border-transparent'}`}
      >
        {getIcon()}
      </div>
      {isSelected && (
        <div className="absolute mt-1 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
          {location.name}
        </div>
      )}
    </div>
  );
};

export default LocationMarker;
