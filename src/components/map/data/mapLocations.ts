
import { MapLocation } from "@/types";

// Create sample locations for the campus map
export const buildings: MapLocation[] = [
  {
    id: "b1",
    name: "Main Academic Building",
    type: "building",
    description: "The main building housing lecture halls and faculty offices.",
    coordinates: { x: 30, y: 40 },
  },
  {
    id: "b2",
    name: "Student Center",
    type: "building",
    description: "Hub for student activities, dining, and recreation.",
    coordinates: { x: 70, y: 60 },
  },
  {
    id: "b3",
    name: "Science Complex",
    type: "building",
    description: "Houses laboratories and research facilities.",
    coordinates: { x: 45, y: 25 },
  },
];

export const facilities: MapLocation[] = [
  {
    id: "f1",
    name: "Computer Lab",
    type: "lab",
    description: "State-of-the-art computer lab with the latest hardware and software.",
    coordinates: { x: 35, y: 45 },
  },
  {
    id: "f2",
    name: "Main Cafeteria",
    type: "cafeteria",
    description: "Campus dining hall offering a variety of food options.",
    coordinates: { x: 65, y: 50 },
  },
  {
    id: "f3",
    name: "Biology Department",
    type: "department",
    description: "Home to the Biology department faculty and research.",
    coordinates: { x: 40, y: 30 },
  },
  {
    id: "f4",
    name: "Staff Lounge",
    type: "staff",
    description: "Exclusive area for faculty and staff relaxation.",
    coordinates: { x: 55, y: 35 },
  },
];

export const getAllLocations = (): MapLocation[] => {
  return [...buildings, ...facilities];
};
