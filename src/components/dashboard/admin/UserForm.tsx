
import { useState, useEffect } from "react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Save } from "lucide-react";

// User form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  rollNumber: z.string().min(1, { message: "Roll number is required" }),
  role: z.enum(["student", "faculty", "staff", "admin"] as const),
  department: z.enum(["Biology", "Mathematics", "Computer Science", "Nursing"] as const).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  editingUser: User | null;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  generateEmail: (name: string, rollNumber: string) => string;
}

const UserForm = ({ editingUser, onSubmit, onCancel, generateEmail }: UserFormProps) => {
  // List of available departments - only the four specified departments
  const departments = ["Biology", "Mathematics", "Computer Science", "Nursing"] as const;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      role: "student",
      department: undefined,
    },
  });

  // Update form when editing user changes
  useEffect(() => {
    if (editingUser) {
      form.reset({
        name: editingUser.name,
        rollNumber: editingUser.rollNumber,
        role: editingUser.role,
        department: editingUser.department as any, // Type cast necessary due to type constraint
      });
    } else {
      form.reset({
        name: "",
        rollNumber: "",
        role: "student",
        department: undefined,
      });
    }
  }, [editingUser, form]);

  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit(data);
  };

  // Preview the email that will be generated
  const watchedName = form.watch("name");
  const watchedRollNumber = form.watch("rollNumber");
  const previewEmail = watchedName && watchedRollNumber 
    ? generateEmail(watchedName, watchedRollNumber) 
    : "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
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
            onClick={onCancel}
          >
            Cancel Edit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserForm;
