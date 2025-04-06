
import { ZoomIn, ZoomOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const MapControls = ({ onZoomIn, onZoomOut, onReset }: MapControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <Button size="icon" variant="outline" onClick={onZoomIn} className="bg-white">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" onClick={onZoomOut} className="bg-white">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" onClick={onReset} className="bg-white">
        <Home className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MapControls;
