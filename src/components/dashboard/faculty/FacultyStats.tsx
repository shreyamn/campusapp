
import { User } from "@/types";

interface FacultyStatsProps {
  user: User | null;
}

const FacultyStats = ({ user }: FacultyStatsProps) => {
  return (
    <>
      {!user?.department ? (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">No department assigned. Please update your profile.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="campus-card">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Students Enrolled
              </h4>
              <div className="text-2xl font-bold">73</div>
              <p className="text-xs text-muted-foreground">+12% from last semester</p>
            </div>
            <div className="campus-card">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Average Attendance
              </h4>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </div>
            <div className="campus-card">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Average Grade
              </h4>
              <div className="text-2xl font-bold">B+</div>
              <p className="text-xs text-muted-foreground">3.3 GPA</p>
            </div>
            <div className="campus-card">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Course Completion
              </h4>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">High retention rate</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyStats;
