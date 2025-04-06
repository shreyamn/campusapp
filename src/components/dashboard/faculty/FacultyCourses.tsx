
import { User, Department } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText } from "lucide-react";
import { toast } from "sonner";

interface CourseType {
  id: string;
  name: string;
  code: string;
  department: Department;
  students: number;
  nextClass: string;
  room: string;
  pending: number;
}

interface FacultyCoursesProps {
  user: User | null;
}

const FacultyCourses = ({ user }: FacultyCoursesProps) => {
  // All possible courses
  const allCourses: CourseType[] = [
    {
      id: "1",
      name: "Introduction to Programming",
      code: "CS101",
      department: "Computer Science",
      students: 45,
      nextClass: "Today, 10:00 AM",
      room: "R201",
      pending: 12,
    },
    {
      id: "2",
      name: "Advanced Database Systems",
      code: "CS403",
      department: "Computer Science",
      students: 28,
      nextClass: "Tomorrow, 2:00 PM",
      room: "R105",
      pending: 5,
    },
    {
      id: "3",
      name: "Cell Biology",
      code: "BIO201",
      department: "Biology",
      students: 38,
      nextClass: "Wednesday, 9:00 AM",
      room: "R302",
      pending: 8,
    },
    {
      id: "4",
      name: "Linear Algebra",
      code: "MATH301",
      department: "Mathematics",
      students: 32,
      nextClass: "Thursday, 11:00 AM",
      room: "R401",
      pending: 3,
    },
    {
      id: "5",
      name: "Medical Ethics",
      code: "NUR205",
      department: "Nursing",
      students: 40,
      nextClass: "Friday, 1:00 PM",
      room: "R501",
      pending: 10,
    },
  ];

  // Filter courses based on faculty's department
  const getCoursesByDepartment = (): CourseType[] => {
    // If user doesn't have a department, return empty array
    if (!user?.department) {
      return [];
    }
    
    // Return only courses matching the faculty's department
    return allCourses.filter(course => course.department === user.department);
  };

  const courses = getCoursesByDepartment();

  // Button action handlers
  const handleCourseDetails = (courseId: string) => {
    toast.info(`Viewing details for course ${courseId}`);
  };

  const handleGradeAssignments = (courseId: string) => {
    toast.info(`Grading assignments for course ${courseId}`);
  };

  const handleManageClass = (courseId: string) => {
    toast.info(`Managing class ${courseId}`);
  };

  return (
    <>
      {courses.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            {user?.department 
              ? `No courses available for ${user.department}.` 
              : "No department assigned. Please update your profile."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="campus-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.code}</p>
                </div>
                <Badge variant="secondary">{course.students} students</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.nextClass}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.pending} pending reviews</span>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleCourseDetails(course.id)}>Course Details</Button>
                <Button variant="outline" size="sm" onClick={() => handleGradeAssignments(course.id)}>Grade Assignments</Button>
                <Button size="sm" onClick={() => handleManageClass(course.id)}>Manage Class</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FacultyCourses;
