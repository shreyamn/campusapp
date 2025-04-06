
import { User, Major } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface StudentCourse {
  id: string;
  name: string;
  code: string;
  major: Major;
  progress: number;
  nextClass: string;
  assignments: number;
}

interface StudentCoursesListProps {
  user: User | null;
}

const StudentCoursesList = ({ user }: StudentCoursesListProps) => {
  // All possible courses
  const allCourses: StudentCourse[] = [
    {
      id: "1",
      name: "Introduction to Programming",
      code: "CS101",
      major: "Computer Science",
      progress: 75,
      nextClass: "Today, 10:00 AM",
      assignments: 2,
    },
    {
      id: "2",
      name: "Data Structures",
      code: "CS202",
      major: "Computer Science",
      progress: 60,
      nextClass: "Tomorrow, 2:00 PM",
      assignments: 1,
    },
    {
      id: "3",
      name: "Database Systems",
      code: "CS303",
      major: "Computer Science",
      progress: 40,
      nextClass: "Wednesday, 11:00 AM",
      assignments: 0,
    },
    {
      id: "4",
      name: "Cell Biology",
      code: "BIO201",
      major: "Biology",
      progress: 85,
      nextClass: "Today, 1:00 PM",
      assignments: 1,
    },
    {
      id: "5",
      name: "Genetics",
      code: "BIO302",
      major: "Biology",
      progress: 70,
      nextClass: "Tomorrow, 9:00 AM",
      assignments: 2,
    },
    {
      id: "6",
      name: "Calculus I",
      code: "MATH201",
      major: "Mathematics",
      progress: 65,
      nextClass: "Thursday, 10:00 AM",
      assignments: 3,
    },
    {
      id: "7",
      name: "Linear Algebra",
      code: "MATH302",
      major: "Mathematics",
      progress: 50,
      nextClass: "Friday, 2:00 PM",
      assignments: 1,
    },
    {
      id: "8",
      name: "Fundamentals of Nursing",
      code: "NUR101",
      major: "Nursing",
      progress: 80,
      nextClass: "Today, 9:00 AM",
      assignments: 2,
    },
    {
      id: "9",
      name: "Clinical Practice",
      code: "NUR202",
      major: "Nursing",
      progress: 75,
      nextClass: "Tomorrow, 8:00 AM",
      assignments: 1,
    },
  ];

  // Get courses related to student's major
  const getCoursesByMajor = () => {
    if (!user?.major) return [];
    return allCourses.filter(course => course.major === user.major);
  };

  const courses = getCoursesByMajor();

  return (
    <>
      {courses.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            {user?.major 
              ? `No courses available for ${user.major}.` 
              : "No major selected. Please update your profile."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.code}</p>
                </div>
                <Badge variant="outline">{course.assignments} assignments</Badge>
              </div>
              <Progress value={course.progress} className="h-2" />
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>Next class: {course.nextClass}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StudentCoursesList;
