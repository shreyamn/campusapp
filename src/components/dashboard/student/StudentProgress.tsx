
import { User } from "@/types";

interface StudentProgressProps {
  user: User | null;
}

const StudentProgress = ({ user }: StudentProgressProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="campus-card">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Attendance</h4>
          <div className="text-2xl font-bold">92%</div>
          <p className="text-xs text-muted-foreground">Above average</p>
        </div>
        <div className="campus-card">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Assignments</h4>
          <div className="text-2xl font-bold">18/20</div>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="campus-card">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Current GPA</h4>
          <div className="text-2xl font-bold">3.7</div>
          <p className="text-xs text-muted-foreground">A-</p>
        </div>
        <div className="campus-card">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Credits</h4>
          <div className="text-2xl font-bold">42/120</div>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
