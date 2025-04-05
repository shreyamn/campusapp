
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";

// Sample subject data
const subjectData = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    code: "CS101",
    description: "Basic principles of programming and computer systems"
  },
  {
    id: "2",
    title: "Calculus I",
    code: "MATH201",
    description: "Fundamental concepts of single-variable calculus"
  },
  {
    id: "3",
    title: "Introduction to Psychology",
    code: "PSY101",
    description: "Basic principles and theories of human behavior"
  }
];

const Subjects = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const viewSchedule = () => {
    // In a real app, this would navigate to a schedule page
    toast({
      title: "Schedule View",
      description: "Viewing your class schedule",
    });
    // Simulating navigation to a schedule route
    // navigate("/schedule");
  };

  const viewMaterials = (subjectTitle: string) => {
    setIsLoading({ ...isLoading, [`materials-${subjectTitle}`]: true });
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Course Materials",
        description: `Viewing materials for ${subjectTitle}`,
      });
      setIsLoading({ ...isLoading, [`materials-${subjectTitle}`]: false });
    }, 800);
  };

  const joinClass = (subjectTitle: string) => {
    setIsLoading({ ...isLoading, [`join-${subjectTitle}`]: true });
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Class Joined",
        description: `You've joined the ${subjectTitle} virtual classroom`,
      });
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
        View your enrolled subjects and academic materials
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectData.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <CardTitle>{subject.title}</CardTitle>
              <CardDescription>{subject.code}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{subject.description}</p>
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
    </div>
  );
};

export default Subjects;
