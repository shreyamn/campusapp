
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface AdminSettingsProps {
  onBack: () => void;
}

// Settings form schema
const settingsFormSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  siteEmail: z.string().email({ message: "Invalid email address" }),
  supportEmail: z.string().email({ message: "Invalid support email address" }),
  maxFileSize: z.coerce.number().min(1, { message: "File size must be at least 1MB" }),
  maintenanceMode: z.boolean().default(false),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const AdminSettings = ({ onBack }: AdminSettingsProps) => {
  const [settings, setSettings] = useState<SettingsFormValues | null>(null);

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('admin-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: settings || {
      siteName: "Campus APP",
      siteEmail: "info@campus.edu",
      supportEmail: "support@campus.edu",
      maxFileSize: 10,
      maintenanceMode: false,
    },
  });

  // Update form values when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  const onSubmit = (data: SettingsFormValues) => {
    // Save settings to localStorage
    localStorage.setItem('admin-settings', JSON.stringify(data));
    setSettings(data);
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Button>
        <h1 className="text-2xl font-bold">System Settings</h1>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter site name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name displayed in the header and browser tab
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="siteEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter site email" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      The primary contact email for the site
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supportEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter support email" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Email used for user support inquiries
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxFileSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max File Size (MB)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter max file size" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Maximum file size users can upload
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Maintenance Mode</FormLabel>
                      <FormDescription>
                        When enabled, only admins can access the site
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="flex items-center gap-2">
              <Save size={16} />
              <span>Save Settings</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminSettings;
