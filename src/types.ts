
// User types
export type UserRole = "student" | "faculty" | "staff" | "admin";
export type Major = "Biology" | "Mathematics" | "Computer Science" | "Nursing";
export type Department = "Biology" | "Mathematics" | "Computer Science" | "Nursing" | "Physics" | "Chemistry" | "Economics";
export type StaffType = "Event Manager" | "Cleaning";

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

// Event types
export type EventType = "Academic" | "Cultural" | "Club" | "Staff";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  organizer: string;
  department?: Department;
}

// Club types
export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  president: string;
  meetingDay: string;
  location: string;
}

// Map location types
export interface MapLocation {
  id: string;
  name: string;
  type: 'building' | 'lab' | 'cafeteria' | 'department' | 'staff' | 'other';
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
}
