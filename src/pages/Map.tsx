
import CampusMap from "@/components/map/CampusMap";

const Map = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Campus Map</h1>
      <p className="text-muted-foreground">Explore the campus locations and find your way around</p>
      <CampusMap />
    </div>
  );
};

export default Map;
