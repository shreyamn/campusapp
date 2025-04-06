// User roles
export type UserRole = "student" | "faculty" | "staff" | "admin";

// Student major
export type Major = "Biology" | "Mathematics" | "Computer Science" | "Nursing" | string;

// Faculty department
export type Department = "Biology" | "Mathematics" | "Computer Science" | "Nursing" | string;

// Staff type
export type StaffType = "Event Manager" | "Cleaning" | string;

// User interface
export interface User {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  role: UserRole;
  major?: Major;
  department?: Department;
  staffType?: StaffType;
  createdAt?: string;
}

// Event interface
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  organizer: string;
  department?: string;
}

// Map location interface
export interface MapLocation {
  id: string;
  name: string;
  type: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
}

// Notification interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}
