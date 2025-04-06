import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole, Department } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getAllUsers } from "@/services/auth";

interface AdminUsersProps {
  onBack: () => void;
}

// User form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  rollNumber: z.string().min(1, { message: "Roll number is required" }),
  role: z.enum(["student", "faculty", "staff", "admin"] as const),
  department: z.enum(["Biology", "Mathematics", "Computer Science", "Nursing", "Physics", "Chemistry", "Economics"] as const).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const AdminUsers = ({ onBack }: AdminUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // List of available departments
  const departments: Department[] = [
    "Biology", 
    "Mathematics", 
    "Computer Science", 
    "Nursing",
    "Physics",
    "Chemistry",
    "Economics"
  ];

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

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      role: "student",
      department: undefined,
    },
  });

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

  const onSubmit = (data: UserFormValues) => {
    // Generate email
    const email = generateEmail(data.name, data.rollNumber);
    
    if (editingUser) {
      // For existing users, check email uniqueness only if name or roll number changed
      if ((editingUser.name !== data.name || editingUser.rollNumber !== data.rollNumber) && 
          !isEmailUnique(email, editingUser.id)) {
        toast.error("Generated email already exists. Please use a different name or roll number.");
        return;
      }
      
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id ? { 
          ...user,
          name: data.name,
          email: email, // Update email if name or roll number changed
          rollNumber: data.rollNumber,
          role: data.role,
          department: data.department
        } : user
      ));
      setEditingUser(null);
      toast.success("User updated successfully");
    } else {
      // For new users, check email uniqueness
      if (!isEmailUnique(email)) {
        toast.error("Generated email already exists. Please use a different name or roll number.");
        return;
      }
      
      // Add new user with all required properties
      const newUser: User = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: email,
        rollNumber: data.rollNumber,
        role: data.role,
        department: data.department,
      };
      setUsers([...users, newUser]);
      toast.success("New user added successfully");
    }
    
    form.reset();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      rollNumber: user.rollNumber,
      role: user.role,
      department: user.department,
    });
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

  // Preview the email that will be generated
  const watchedName = form.watch("name");
  const watchedRollNumber = form.watch("rollNumber");
  const previewEmail = watchedName && watchedRollNumber 
    ? generateEmail(watchedName, watchedRollNumber) 
    : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Button>
        <h1 className="text-2xl font-bold">Manage Users</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User List</h2>
          {users.length === 0 ? (
            <p className="text-muted-foreground">No users found. Add a new user to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="font-mono text-xs">{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>{user.department || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number / ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roll number or ID" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span className="capitalize">{field.value}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => field.onChange("student")}>Student</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => field.onChange("faculty")}>Faculty</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => field.onChange("staff")}>Staff</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => field.onChange("admin")}>Admin</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span>{field.value || "Select department"}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {departments.map((dept) => (
                            <DropdownMenuItem key={dept} onClick={() => field.onChange(dept)}>
                              {dept}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Email preview */}
              {previewEmail && (
                <div className="mt-2">
                  <FormLabel>Generated Email</FormLabel>
                  <div className="p-2 bg-muted rounded-md font-mono text-sm">
                    {previewEmail}
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full flex items-center gap-2">
                {editingUser ? (
                  <>
                    <Save size={16} />
                    <span>Update User</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add User</span>
                  </>
                )}
              </Button>
              
              {editingUser && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEditingUser(null);
                    form.reset({
                      name: "",
                      rollNumber: "",
                      role: "student",
                      department: undefined,
                    });
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
