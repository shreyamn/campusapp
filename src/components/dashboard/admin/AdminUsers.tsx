
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface AdminUsersProps {
  onBack: () => void;
}

// User form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  rollNumber: z.string().min(1, { message: "Roll number is required" }),
  role: z.enum(["student", "faculty", "staff", "admin"] as const),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const AdminUsers = ({ onBack }: AdminUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Load saved users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('admin-users');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        // Ensure all loaded users have the required properties
        const validUsers: User[] = parsedUsers.map((user: any) => ({
          id: user.id || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: user.name || "",
          email: user.email || "",
          rollNumber: user.rollNumber || "",
          role: user.role || "student",
        }));
        setUsers(validUsers);
      } catch (error) {
        console.error("Error parsing users from localStorage:", error);
        setUsers([]);
      }
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
      email: "",
      rollNumber: "",
      role: "student",
    },
  });

  const onSubmit = (data: UserFormValues) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id ? { 
          ...user,
          name: data.name,
          email: data.email,
          rollNumber: data.rollNumber,
          role: data.role 
        } : user
      ));
      setEditingUser(null);
    } else {
      // Add new user with all required properties
      const newUser: User = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email,
        rollNumber: data.rollNumber,
        role: data.role,
      };
      setUsers([...users, newUser]);
    }
    
    form.reset();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      rollNumber: user.rollNumber,
      role: user.role,
    });
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("User deleted successfully");
  };

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" type="email" {...field} />
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
                      email: "",
                      rollNumber: "",
                      role: "student",
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
