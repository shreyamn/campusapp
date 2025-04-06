
export type UserRole = "student" | "faculty" | "staff" | "admin";
export type Major = "Biology" | "Mathematics" | "Computer Science" | "Nursing";
export type Department = "Biology" | "Mathematics" | "Computer Science" | "Nursing";
export type StaffType = "Event Manager" | "Cleaning";
export type EventType = "Academic" | "Cultural" | "Club" | "Staff";
export type LocationType = "building" | "lab" | "cafeteria" | "department" | "staff" | "other";

export interface User {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  role: UserRole;
  major?: Major;
  department?: Department;
  staffType?: StaffType;
  createdAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  organizer: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  contactEmail: string;
  president: string;
  members: number;
  image?: string;
  tags: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  description: string;
  department: Department;
}

export interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
}
