

'use client';

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
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function SignupPage() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });

  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    let label = '';
    let color = '';

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 0:
      case 1:
      case 2:
        label = 'Weak';
        color = 'bg-red-500';
        break;
      case 3:
        label = 'Medium';
        color = 'bg-yellow-500';
        break;
      case 4:
      case 5:
        label = 'Strong';
        color = 'bg-green-500';
        break;
      default:
        label = '';
        color = '';
    }
    
    setStrength({ score, label, color });
  };

  useEffect(() => {
    if(password){
      checkPasswordStrength(password);
    } else {
      setStrength({ score: 0, label: '', color: '' });
    }
  }, [password]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                <Logo className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl font-headline">CampusConnect</span>
            </Link>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Enter your details below to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
           <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
                <GithubIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline">
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
          <div className="grid gap-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" placeholder="Max Robinson" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required/>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="usn">USN</Label>
            <Input id="usn" type="text" placeholder="1CR21CS001" required/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" type="number" placeholder="3" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="semester">Semester</Label>
              <Input id="semester" type="number" placeholder="6" required />
            </div>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" required/>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="leetcode">LeetCode Profile</Label>
            <Input id="leetcode" type="url" placeholder="https://leetcode.com/yourusername" required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {password && (
            <div className="space-y-2">
              <Progress value={strength.score * 20} className="h-2 [&>div]:transition-all [&>div]:duration-300" />
              <p className="text-xs text-muted-foreground">
                Password strength: <span className={`font-bold ${strength.score <= 2 ? 'text-red-500' : strength.score === 3 ? 'text-yellow-500' : 'text-green-500'}`}>{strength.label}</span>
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/profile">Create Account</Link>
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
