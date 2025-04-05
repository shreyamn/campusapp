
import { User, UserRole } from "@/types";

// Mock user storage - in a real app, this would use a real auth system
let currentUser: User | null = null;

export const loginUser = (user: User): void => {
  currentUser = user;
  localStorage.setItem("campus_app_user", JSON.stringify(user));
};

export const logoutUser = (): void => {
  currentUser = null;
  localStorage.removeItem("campus_app_user");
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const savedUser = localStorage.getItem("campus_app_user");
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      return currentUser;
    } catch (error) {
      console.error("Error parsing saved user:", error);
      return null;
    }
  }
  
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
