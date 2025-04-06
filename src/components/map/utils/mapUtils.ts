
import { MapLocation } from "@/types";

export const getBadgeVariant = (type: MapLocation['type']) => {
  switch (type) {
    case "building":
      return "default";
    case "lab":
      return "outline";
    case "cafeteria":
      return "secondary";
    case "department":
      return "destructive";
    case "staff":
      return "outline";
    default:
      return "default";
  }
};

export const getLocations = (): MapLocation[] => {
  return [
    {
      id: "1",
      name: "Main Academic Building",
      type: "building",
      description: "Central location for classes and administration offices",
      coordinates: {
        x: 150,
        y: 100
      }
    },
    {
      id: "2",
      name: "Computer Science Lab",
      type: "lab",
      description: "Advanced computing facilities for students",
      coordinates: {
        x: 250,
        y: 150
      }
    },
    {
      id: "3",
      name: "Student Union Cafeteria",
      type: "cafeteria",
      description: "Main dining area with various food options",
      coordinates: {
        x: 200,
        y: 250
      }
    },
    {
      id: "4",
      name: "Biology Department",
      type: "department",
      description: "Facilities for biological studies and research",
      coordinates: {
        x: 300,
        y: 200
      }
    },
    {
      id: "5",
      name: "Maintenance Office",
      type: "staff",
      description: "Campus maintenance and facilities management",
      coordinates: {
        x: 100,
        y: 300
      }
    }
  ];
};
