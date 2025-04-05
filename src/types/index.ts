
export type UserRole = 'student' | 'faculty' | 'staff';

export type Major = 'Biology' | 'Mathematics' | 'Computer Science' | 'Nursing';

export type Department = 'Biology' | 'Mathematics' | 'Computer Science' | 'Nursing';

export type StaffType = 'Event Manager' | 'Cleaning';

export interface User {
  id?: string;
  name: string;
  rollNumber: string;
  email: string;
  role: UserRole;
  major?: Major; // For students
  department?: Department; // For faculty
  staffType?: StaffType; // For staff
  createdAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: Department;
  description?: string;
  creditHours?: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  subjectId: string;
  enrollmentDate: string;
}

export interface Performance {
  id: string;
  studentId: string;
  subjectId: string;
  grade?: string;
  attendance?: number;
  assignments?: Assignment[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
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

export interface Club {
  id: string;
  name: string;
  description: string;
  department?: Department;
  members: string[]; // User IDs
  meetings: Meeting[];
  announcements: Announcement[];
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'academic' | 'event' | 'club' | 'task';
  isRead: boolean;
  userId: string;
}

export interface Chore {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // Staff ID
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  location: string;
}

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

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'academic' | 'technical' | 'administrative' | 'facilities';
}
