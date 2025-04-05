
import { MapLocation } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LocationDetailsProps {
  location: MapLocation;
  onClose: () => void;
  getBadgeVariant: (type: string) => string;
}

const LocationDetails = ({ location, onClose, getBadgeVariant }: LocationDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{location.name}</CardTitle>
            <CardDescription>
              <Badge variant={getBadgeVariant(location.type)} className="mt-1">
                {location.type}
              </Badge>
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
          <p className="mt-1">{location.description}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Hours</h3>
          <p className="mt-1">Monday - Friday: 8:00 AM - 5:00 PM</p>
          <p>Saturday: 10:00 AM - 2:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
          <p className="mt-1">campus@example.edu</p>
          <p>+1 (555) 123-4567</p>
        </div>
        
        <div className="pt-4 flex gap-2">
          <Button variant="outline" className="w-full">View Details</Button>
          <Button className="w-full">Get Directions</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationDetails;
