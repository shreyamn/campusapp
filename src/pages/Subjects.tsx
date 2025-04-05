
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Subjects = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subjects</h1>
        <Button>View Schedule</Button>
      </div>
      
      <p className="text-muted-foreground">
        View your enrolled subjects and academic materials
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Introduction to Computer Science</CardTitle>
            <CardDescription>CS101</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Basic principles of programming and computer systems</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Materials</Button>
              <Button size="sm">Join Class</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calculus I</CardTitle>
            <CardDescription>MATH201</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Fundamental concepts of single-variable calculus</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Materials</Button>
              <Button size="sm">Join Class</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Introduction to Psychology</CardTitle>
            <CardDescription>PSY101</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Basic principles and theories of human behavior</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">Materials</Button>
              <Button size="sm">Join Class</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subjects;
