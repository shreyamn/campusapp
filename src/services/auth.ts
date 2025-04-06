
import { User } from "@/types";

// Local storage keys
const USER_KEY = "campus-app-user";
const AUTH_TOKEN_KEY = "campus-app-auth-token";
const ADMIN_USERS_KEY = "admin-users";

// Admin credentials
const ADMIN_EMAIL = "admin@campus.edu";
const ADMIN_PASSWORD = "1234";

// Save user to local storage
export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // For demo, we'll just use a dummy token
  localStorage.setItem(AUTH_TOKEN_KEY, `demo-token-${user.id}`);
  
  // Also add to the admin-users collection for the admin panel
  const existingUsers = getAllUsers();
  if (!existingUsers.some(existingUser => existingUser.id === user.id)) {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify([...existingUsers, user]));
  }
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

// Get all users from admin-users storage
export const getAllUsers = (): User[] => {
  try {
    const usersStr = localStorage.getItem(ADMIN_USERS_KEY);
    if (!usersStr) return [];
    
    const parsedUsers = JSON.parse(usersStr);
    // Ensure all loaded users have the required properties
    return parsedUsers.map((user: any) => ({
      id: user.id || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: user.name || "",
      email: user.email || "",
      rollNumber: user.rollNumber || "",
      role: user.role || "student",
    }));
  } catch (error) {
    console.error("Error parsing users from localStorage:", error);
    return [];
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
