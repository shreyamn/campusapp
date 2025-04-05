
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EmptyLocationState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Information</CardTitle>
        <CardDescription>
          Select a location on the map to view details
        </CardDescription>
      </CardHeader>
      <CardContent className="h-64 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Click on a numbered marker on the map</p>
          <p className="text-sm mt-2">to view location details</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyLocationState;
