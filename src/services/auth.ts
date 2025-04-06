
import { User } from "@/types";

// Local storage keys
const USER_KEY = "campus-app-user";
const AUTH_TOKEN_KEY = "campus-app-auth-token";

// Admin credentials
const ADMIN_EMAIL = "admin@campus.edu";
const ADMIN_PASSWORD = "1234";

// Save user to local storage
export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // For demo, we'll just use a dummy token
  localStorage.setItem(AUTH_TOKEN_KEY, `demo-token-${user.id}`);
};

// Get current user from local storage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as User;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Authenticate admin
export const authenticateAdmin = (email: string, password: string): User | null => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      id: "admin-1",
      name: "System Administrator",
      rollNumber: "ADMIN-001",
      email: ADMIN_EMAIL,
      role: "admin",
    };
  }
  return null;
};
