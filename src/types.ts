
export type UserRole = "student" | "faculty" | "staff" | "admin";
export type Major = "Biology" | "Mathematics" | "Computer Science" | "Nursing" | string;
export type Department = "Biology" | "Mathematics" | "Computer Science" | "Nursing" | "Physics" | "Chemistry" | "Economics" | string;
export type StaffType = "Event Manager" | "Cleaning" | string;

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

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Academic' | 'Cultural' | 'Club' | 'Staff';
  department?: Department;
  organizer: string;
}
