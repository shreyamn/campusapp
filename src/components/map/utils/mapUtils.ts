
export const getBadgeVariant = (type: string): "default" | "destructive" | "outline" | "secondary" => {
  switch (type) {
    case "building":
      return "default";
    case "lab":
      return "secondary";
    case "department":
      return "outline";
    case "cafeteria":
      return "destructive";
    default:
      return "outline";
  }
};

// Mock data - in a real app, this would come from an API
export const getLocations = () => [
  {
    id: "1",
    name: "Admin Building",
    type: "building",
    description: "Main administrative offices and conference rooms",
    coordinates: { x: 20, y: 30 },
  },
  {
    id: "2",
    name: "Science Lab",
    type: "lab",
    description: "Research laboratories for biology and chemistry",
    coordinates: { x: 45, y: 40 },
  },
  {
    id: "3",
    name: "Computer Science Department",
    type: "department",
    description: "Faculty offices and computer labs",
    coordinates: { x: 60, y: 35 },
  },
  {
    id: "4",
    name: "Main Cafeteria",
    type: "cafeteria",
    description: "Campus dining facility with various food options",
    coordinates: { x: 35, y: 60 },
  },
  {
    id: "5",
    name: "Central Library",
    type: "building",
    description: "Main campus library with study spaces",
    coordinates: { x: 75, y: 50 },
  },
  {
    id: "6",
    name: "Student Center",
    type: "building",
    description: "Student services and recreational activities",
    coordinates: { x: 30, y: 75 },
  },
];
