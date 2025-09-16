

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, LinkedinIcon, Logo } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { findUserByEmail, setCurrentUser } from "@/lib/mock-db";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const emailInput = document.getElementById(`${role}-email`) as HTMLInputElement;
    const passwordInput = document.getElementById(`${role}-password`) as HTMLInputElement;
    
    if (!emailInput || !passwordInput) {
        setIsLoading(false);
        return;
    };

    const email = emailInput.value;
    const password = passwordInput.value;

    setTimeout(() => {
        const user = findUserByEmail(email);

        if (user && user.password === password) {
            setCurrentUser(user.id);
            toast({
                title: "Login Successful",
                description: `Welcome back, ${user.fullName}!`,
            });
            router.push(`/dashboard?role=${role}`);
        } else {
            toast({
                title: "Login Failed",
                description: "Invalid email or password. Please try again.",
                variant: "destructive",
            });
        }
        setIsLoading(false);
    }, 500);
  };

  const renderLoginForm = (currentRole: "student" | "faculty") => (
    <>
      {currentRole === 'student' && (
        <>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="transition-transform hover:scale-105" type="button">
                    <GithubIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="transition-transform hover:scale-105" type="button">
                    <LinkedinIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                    </span>
                </div>
            </div>
        </>
      )}
      <div className="grid gap-2">
        <Label htmlFor={`${currentRole}-email`}>Email</Label>
        <Input id={`${currentRole}-email`} type="email" placeholder="example@gmail.com" required className="transition-all focus:scale-[1.02] focus:shadow-lg" />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor={`${currentRole}-password`}>Password</Label>
          <Link
            href="#"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Input id={`${currentRole}-password`} type="password" required className="transition-all focus:scale-[1.02] focus:shadow-lg" />
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 animate-in">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl font-headline">CampusConnect</span>
          </Link>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Select your role and enter your details to login.
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="student" className="w-full" onValueChange={(value) => setRole(value as 'student' | 'faculty')}>
          <CardContent className="grid gap-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
            </TabsList>
            <TabsContent value="student" className="grid gap-4 animate-in">
              {renderLoginForm("student")}
            </TabsContent>
            <TabsContent value="faculty" className="grid gap-4 animate-in">
              {renderLoginForm("faculty")}
            </TabsContent>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full shine-button" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'Logging in...' : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </Button>
            {role === 'student' && (
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            )}
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
}
