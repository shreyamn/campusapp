
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, RefreshCw, Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface AdminLogsProps {
  onBack: () => void;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  user?: string;
  module: string;
}

const AdminLogs = ({ onBack }: AdminLogsProps) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingLogs, setIsGeneratingLogs] = useState(false);

  // Load saved logs from localStorage on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('admin-logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Generate sample logs if none exist
      generateSampleLogs();
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('admin-logs', JSON.stringify(logs));
    }
  }, [logs]);

  // Function to generate sample logs
  const generateSampleLogs = () => {
    setIsGeneratingLogs(true);
    
    const modules = ['authentication', 'dashboard', 'courses', 'events', 'admin', 'file-upload', 'notifications'];
    const users = ['student1', 'faculty1', 'admin', 'john.doe', 'jane.smith'];
    const infoMessages = [
      'User logged in successfully',
      'Page loaded',
      'Data fetched successfully',
      'Settings updated',
      'Profile viewed',
      'Document downloaded',
      'Email notification sent'
    ];
    const warningMessages = [
      'Failed login attempt',
      'Slow response time',
      'Low disk space',
      'Multiple login attempts',
      'Resource usage high',
      'Session about to expire'
    ];
    const errorMessages = [
      'Database connection failed',
      'API request timeout',
      'File upload failed',
      'Authentication error',
      'Permission denied',
      'Invalid input detected'
    ];

    const newLogs: LogEntry[] = [];
    
    // Generate logs for the past 7 days
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 7);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      date.setHours(date.getHours() - hoursAgo);
      date.setMinutes(date.getMinutes() - minutesAgo);
      
      const level = Math.random() < 0.7 ? 'info' : (Math.random() < 0.5 ? 'warning' : 'error');
      
      let message = '';
      if (level === 'info') {
        message = infoMessages[Math.floor(Math.random() * infoMessages.length)];
      } else if (level === 'warning') {
        message = warningMessages[Math.floor(Math.random() * warningMessages.length)];
      } else {
        message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      }
      
      const module = modules[Math.floor(Math.random() * modules.length)];
      const user = Math.random() < 0.8 ? users[Math.floor(Math.random() * users.length)] : undefined;
      
      newLogs.push({
        id: `log-${Date.now()}-${i}`,
        timestamp: date.toISOString(),
        level,
        message,
        user,
        module
      });
    }
    
    // Sort logs by timestamp (newest first)
    newLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setLogs(newLogs);
    setIsGeneratingLogs(false);
    toast.success("Sample logs generated successfully");
  };

  // Filter logs based on search term
  const filteredLogs = logs.filter(log => 
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Function to clear all logs
  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem('admin-logs');
    toast.success("All logs cleared successfully");
  };

  // Function to download logs as CSV
  const downloadLogs = () => {
    const csvHeader = 'Timestamp,Level,Module,User,Message\n';
    const csvContent = logs.map(log => {
      return `${log.timestamp},${log.level},${log.module},${log.user || 'N/A'},"${log.message}"`;
    }).join('\n');
    
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success("Logs downloaded successfully");
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Button>
        <h1 className="text-2xl font-bold">System Logs</h1>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search logs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button 
              variant="outline" 
              onClick={generateSampleLogs}
              disabled={isGeneratingLogs}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={isGeneratingLogs ? "animate-spin" : ""} />
              <span>Refresh</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={downloadLogs}
              disabled={logs.length === 0}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              <span>Export</span>
            </Button>
            <Button 
              variant="destructive" 
              onClick={clearLogs}
              disabled={logs.length === 0}
              className="flex items-center gap-2"
            >
              <Trash size={16} />
              <span>Clear</span>
            </Button>
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No logs found. Generate some sample logs to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.level === 'info' 
                          ? 'bg-blue-100 text-blue-800' 
                          : log.level === 'warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {log.level}
                      </span>
                    </TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell>{log.user || 'N/A'}</TableCell>
                    <TableCell>{log.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogs;
