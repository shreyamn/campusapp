
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Department } from "@/types";
import { useNavigate } from "react-router-dom";

// Sample subject data with department information
const allSubjects = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    code: "CS101",
    description: "Basic principles of programming and computer systems",
    department: "Computer Science" as Department
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    code: "CS202",
    description: "Advanced data structures and algorithm design",
    department: "Computer Science" as Department
  },
  {
    id: "3",
    title: "Calculus I",
    code: "MATH201",
    description: "Fundamental concepts of single-variable calculus",
    department: "Mathematics" as Department
  },
  {
    id: "4",
    title: "Linear Algebra",
    code: "MATH301",
    description: "Study of linear equations, matrices, and vector spaces",
    department: "Mathematics" as Department
  },
  {
    id: "5",
    title: "Introduction to Biology",
    code: "BIO101",
    description: "Fundamentals of biological sciences",
    department: "Biology" as Department
  },
  {
    id: "6",
    title: "Cell Biology",
    code: "BIO201",
    description: "Structure and function of cells",
    department: "Biology" as Department
  },
  {
    id: "7",
    title: "Nursing Fundamentals",
    code: "NUR101",
    description: "Basic principles and practices of nursing",
    department: "Nursing" as Department
  },
  {
    id: "8",
    title: "Clinical Practice I",
    code: "NUR201",
    description: "Introduction to clinical nursing practice",
    department: "Nursing" as Department
  }
];

// Helper function to get user's department based on role
const getUserDepartment = (user?: User | null): Department | undefined => {
  if (!user) return undefined;
  return user.department;
};

const Subjects = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  
  // Get current user from localStorage
  const getCurrentUser = (): User | null => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  };

  const user = getCurrentUser();
  const userDepartment = getUserDepartment(user);
  
  // Filter subjects based on user's department, or show all if admin
  const getSubjectsToDisplay = () => {
    if (!user) return [];
    
    // For students and faculty, show subjects in their department
    if (user.role === 'student' || user.role === 'faculty') {
      if (!userDepartment) return [];
      return allSubjects.filter(subject => subject.department === userDepartment);
    }
    
    // For admins, show all subjects
    if (user.role === 'admin') {
      return allSubjects;
    }
    
    // For staff or other roles, show a subset or empty list as appropriate
    return [];
  };

  const subjectData = getSubjectsToDisplay();

  const viewSchedule = () => {
    // In a real app, this would navigate to a schedule page
    toast.success("Viewing your class schedule");
    // Simulating navigation to a schedule route
    // navigate("/schedule");
  };

  const viewMaterials = (subjectTitle: string) => {
    setIsLoading({ ...isLoading, [`materials-${subjectTitle}`]: true });
    
    // Simulate loading
    setTimeout(() => {
      toast.success(`Viewing materials for ${subjectTitle}`);
      setIsLoading({ ...isLoading, [`materials-${subjectTitle}`]: false });
    }, 800);
  };

  const joinClass = (subjectTitle: string) => {
    setIsLoading({ ...isLoading, [`join-${subjectTitle}`]: true });
    
    // Simulate loading
    setTimeout(() => {
      toast.success(`You've joined the ${subjectTitle} virtual classroom`);
      setIsLoading({ ...isLoading, [`join-${subjectTitle}`]: false });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subjects</h1>
        <Button onClick={viewSchedule}>View Schedule</Button>
      </div>
      
      <p className="text-muted-foreground">
        {user?.role === 'student' && userDepartment 
          ? `View your enrolled ${userDepartment} courses and academic materials` 
          : user?.role === 'faculty' && userDepartment
          ? `View your ${userDepartment} teaching courses and materials`
          : 'View subjects and academic materials'}
      </p>

      {subjectData.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No subjects available</CardTitle>
            <CardDescription>
              {user?.role === 'student' || user?.role === 'faculty' 
                ? "No subjects are available for your department." 
                : "No subjects are available."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectData.map((subject) => (
            <Card key={subject.id}>
              <CardHeader>
                <CardTitle>{subject.title}</CardTitle>
                <CardDescription>{subject.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{subject.description}</p>
                <p className="text-sm text-muted-foreground mt-2">Department: {subject.department}</p>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewMaterials(subject.title)}
                    disabled={isLoading[`materials-${subject.title}`]}
                  >
                    {isLoading[`materials-${subject.title}`] ? "Loading..." : "Materials"}
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => joinClass(subject.title)}
                    disabled={isLoading[`join-${subject.title}`]}
                  >
                    {isLoading[`join-${subject.title}`] ? "Joining..." : "Join Class"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
