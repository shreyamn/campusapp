
import { useState, useEffect } from "react";
import { User } from "@/types";
import { getAllUsers } from "@/services/auth";
import { toast } from "sonner";

// Hook to manage users state and operations
export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Load all users from localStorage on component mount
  useEffect(() => {
    const allUsers = getAllUsers();
    if (allUsers && allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('admin-users', JSON.stringify(users));
      
      // Show success toast when users are saved
      toast.success("Users data saved successfully");
    }
  }, [users]);

  // Function to generate unique email based on name and roll number
  const generateEmail = (name: string, rollNumber: string): string => {
    // Remove spaces, convert to lowercase, and use only first and last name
    const nameParts = name.trim().toLowerCase().split(" ");
    let emailPrefix = nameParts[0];
    
    // Add last name if available
    if (nameParts.length > 1) {
      emailPrefix += "." + nameParts[nameParts.length - 1];
    }
    
    // Add roll number and domain
    return `${emailPrefix}${rollNumber.toLowerCase()}@campus.edu`;
  };

  // Check if email already exists
  const isEmailUnique = (email: string, userId?: string): boolean => {
    return !users.some(user => user.email === email && user.id !== userId);
  };

  // Handle edit user
  const handleEdit = (user: User) => {
    setEditingUser(user);
    return user;
  };

  // Handle delete user
  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  // Handle save user (add or update)
  const handleSaveUser = (userData: {
    name: string;
    rollNumber: string;
    role: "student" | "faculty" | "staff" | "admin";
    department?: "Biology" | "Mathematics" | "Computer Science" | "Nursing";
  }, existingUserId?: string) => {
    const email = generateEmail(userData.name, userData.rollNumber);

    if (existingUserId) {
      // Update existing user
      if ((editingUser?.name !== userData.name || editingUser?.rollNumber !== userData.rollNumber) && 
          !isEmailUnique(email, existingUserId)) {
        toast.error("Generated email already exists. Please use a different name or roll number.");
        return false;
      }
      
      setUsers(users.map(user => 
        user.id === existingUserId ? { 
          ...user,
          name: userData.name,
          email,
          rollNumber: userData.rollNumber,
          role: userData.role,
          department: userData.department
        } : user
      ));
      setEditingUser(null);
      toast.success("User updated successfully");
    } else {
      // Add new user
      if (!isEmailUnique(email)) {
        toast.error("Generated email already exists. Please use a different name or roll number.");
        return false;
      }
      
      const newUser: User = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: userData.name,
        email,
        rollNumber: userData.rollNumber,
        role: userData.role,
        department: userData.department,
      };
      setUsers([...users, newUser]);
      toast.success("New user added successfully");
    }
    
    return true;
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingUser(null);
  };

  return {
    users,
    editingUser,
    generateEmail,
    handleEdit,
    handleDelete,
    handleSaveUser,
    cancelEdit
  };
};
