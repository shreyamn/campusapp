
import { User, Department } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface FacultySubmissionsProps {
  user: User | null;
}

const FacultySubmissions = ({ user }: FacultySubmissionsProps) => {
  // Use department-specific student names
  const getDepartmentStudentNames = (): {id: string, name: string, assignment: string, time: string}[] => {
    if (!user?.department) return [];
    
    const studentsByDepartment = {
      "Computer Science": [
        { id: "1", name: "Emma Johnson", assignment: "Lab 3 - Data Structures", time: "2 hours ago" },
        { id: "2", name: "Michael Smith", assignment: "Assignment 2 - Algorithms", time: "5 hours ago" },
        { id: "3", name: "Sophia Williams", assignment: "Project Proposal", time: "1 day ago" },
      ],
      "Biology": [
        { id: "1", name: "Noah Davis", assignment: "Lab Report - Cell Structure", time: "3 hours ago" },
        { id: "2", name: "Olivia Miller", assignment: "Genetics Quiz", time: "6 hours ago" },
        { id: "3", name: "William Brown", assignment: "Research Proposal", time: "1 day ago" },
      ],
      "Mathematics": [
        { id: "1", name: "James Wilson", assignment: "Problem Set 3 - Calculus", time: "1 hour ago" },
        { id: "2", name: "Charlotte Thomas", assignment: "Linear Algebra Quiz", time: "4 hours ago" },
        { id: "3", name: "Benjamin Garcia", assignment: "Statistics Project", time: "1 day ago" },
      ],
      "Nursing": [
        { id: "1", name: "Amelia Rodriguez", assignment: "Patient Care Report", time: "2 hours ago" },
        { id: "2", name: "Elijah Martinez", assignment: "Medical Ethics Case Study", time: "5 hours ago" },
        { id: "3", name: "Ava Anderson", assignment: "Clinical Observation Journal", time: "1 day ago" },
      ],
      "Physics": [
        { id: "1", name: "Henry Jackson", assignment: "Lab Report - Mechanics", time: "3 hours ago" },
        { id: "2", name: "Isabella White", assignment: "Quantum Physics Problem Set", time: "7 hours ago" },
        { id: "3", name: "Lucas Harris", assignment: "Research Proposal", time: "1 day ago" },
      ],
      "Chemistry": [
        { id: "1", name: "Mia Clark", assignment: "Lab Report - Organic Chemistry", time: "2 hours ago" },
        { id: "2", name: "Ethan Lewis", assignment: "Chemical Equations Quiz", time: "6 hours ago" },
        { id: "3", name: "Harper Lee", assignment: "Research Proposal", time: "1 day ago" },
      ],
      "Economics": [
        { id: "1", name: "Alexander Walker", assignment: "Macroeconomics Analysis", time: "3 hours ago" },
        { id: "2", name: "Emily Hall", assignment: "Market Research Report", time: "5 hours ago" },
        { id: "3", name: "Daniel King", assignment: "Economic Policy Proposal", time: "1 day ago" },
      ],
    };
    
    return studentsByDepartment[user.department] || [];
  };

  const recentSubmissions = getDepartmentStudentNames();

  const handleViewAllSubmissions = () => {
    toast.info("Viewing all student submissions");
  };

  return (
    <>
      {recentSubmissions.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">No recent submissions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {submission.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">{submission.name}</h3>
                <p className="text-sm text-muted-foreground">{submission.assignment}</p>
              </div>
              <div className="text-xs text-muted-foreground">{submission.time}</div>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full" onClick={handleViewAllSubmissions}>
            View all submissions
          </Button>
        </div>
      )}
    </>
  );
};

export default FacultySubmissions;
