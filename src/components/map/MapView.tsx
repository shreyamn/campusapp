
import { MapLocation } from "@/types";
import LocationMarker from "./LocationMarker";
import CampusBackground from "./CampusBackground";
import MapControls from "./MapControls";

interface MapViewProps {
  locations: MapLocation[];
  selectedLocation: MapLocation | null;
  onLocationClick: (location: MapLocation) => void;
  zoomLevel: number;
  mapCenter: { x: number; y: number };
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetMap: () => void;
}

const MapView = ({
  locations,
  selectedLocation,
  onLocationClick,
  zoomLevel,
  mapCenter,
  onZoomIn,
  onZoomOut,
  onResetMap,
}: MapViewProps) => {
  return (
    <div className="relative bg-muted/50 border rounded-lg h-[500px] overflow-hidden">
      {/* Map container */}
      <div 
        className="absolute inset-0 transition-transform duration-300"
        style={{ 
          transform: `scale(${zoomLevel}) translate(${50 - mapCenter.x}%, ${50 - mapCenter.y}%)`
        }}
      >
        {/* Campus background */}
        <CampusBackground />
        
        {/* Map locations */}
        {locations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            isSelected={selectedLocation?.id === location.id}
            onClick={() => onLocationClick(location)}
          />
        ))}
      </div>
      
      {/* Map controls */}
      <MapControls 
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onResetMap}
      />
    </div>
  );
};

export default MapView;
