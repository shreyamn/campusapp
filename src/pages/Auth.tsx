
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { User } from '@/types';

interface AuthProps {
  setUser: (user: User) => void;
}

const Auth = ({ setUser }: AuthProps) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-campus-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-campus-dark">Campus APP</h1>
          <p className="text-campus-dark/70 mt-2">Sign in to access your campus resources</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm setUser={setUser} />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm setActiveTab={setActiveTab} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-center text-muted-foreground flex justify-center">
            {activeTab === 'login' ? (
              <p>Don't have an account? <button onClick={() => setActiveTab('signup')} className="text-primary hover:underline">Sign Up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setActiveTab('login')} className="text-primary hover:underline">Login</button></p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
