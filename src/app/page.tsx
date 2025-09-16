"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  FolderKanban,
  Megaphone,
  MessageSquare,
  Bot,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Placement Corner",
    description: "Your one-stop hub for career resources, roadmaps, and interview experiences.",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Discussion Forum",
    description: "Connect with peers, seniors, and faculty. Ask questions and share knowledge.",
  },
  {
    icon: <Megaphone className="h-8 w-8" />,
    title: "Announcements",
    description: "Stay updated with the latest news and announcements from faculty and HODs.",
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Events Hub",
    description: "Discover and register for workshops, tech talks, and hackathons.",
  },
  {
    icon: <FolderKanban className="h-8 w-8" />,
    title: "Resource Hub",
    description: "Access and share notes, past papers, and other study materials.",
  },
  {
    icon: <Bot className="h-8 w-8" />,
    title: "AI Chatbot",
    description: "Get instant answers to your campus-related questions with our smart assistant.",
  },
];

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Software Engineer @ TechCorp",
        avatar: "https://picsum.photos/seed/priya/80/80",
        avatarHint: "woman face",
        testimonial: "The placement roadmaps and interview experiences on CampusConnect were a game-changer for my preparation. I landed my dream job thanks to the resources here!"
    },
    {
        name: "Rahul Verma",
        role: "Product Manager @ Innovate Inc.",
        avatar: "https://picsum.photos/seed/rahul/80/80",
        avatarHint: "man face",
        testimonial: "Connecting with alumni through the forum gave me invaluable insights into the industry. The community is incredibly supportive and helpful."
    },
    {
        name: "Anjali Singh",
        role: "Data Scientist @ Future Solutions",
        avatar: "https://picsum.photos/seed/anjali/80/80",
        avatarHint: "woman smiling",
        testimonial: "I never missed a single campus event thanks to the real-time notifications. The workshops were amazing for skill-building. Highly recommended!"
    }
]

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLinkClick = (path: string, id: string) => {
    setLoading(id);
    setTimeout(() => {
      router.push(path);
    }, 500); // Reduced timeout for a faster transition
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = document.querySelectorAll('.scroll-animate');

    elements.forEach(el => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, { threshold: 0.1 });

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      elements.forEach(el => {
        const observer = observers.find(o => o.root === null);
        if (observer) {
          observer.unobserve(el);
        }
      });
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in-0">
          <div className="flex flex-col items-center gap-4">
             <Logo className="h-16 w-16 text-primary animate-pulse-grow" />
             <p className="text-muted-foreground">Connecting you...</p>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl">CampusConnect</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button 
                className="shine-button" 
                onClick={() => handleLinkClick('/login', 'login')}
                disabled={!!loading}
              >
                Login
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 [perspective:2000px]">
        <section className="container grid items-center justify-center gap-6 pb-8 pt-12 md:py-20 text-center">
          <div className="flex flex-col items-center gap-4 text-center scroll-animate">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl font-headline">
              The All-In-One Platform for Your Campus Life
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Connect, collaborate, and conquer your college journey. From placements to discussions, we've got you covered.
            </p>
            <div className="flex gap-4">
               <Button 
                size="lg" 
                className="shine-button"
                onClick={() => handleLinkClick('/signup', 'get-started')}
                disabled={!!loading}
              >
                Get Started
              </Button>
              <Button asChild variant="outline" size="lg" className="shine-button">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section id="quick-prep" className="bg-secondary/50 py-20 my-12 scroll-animate">
            <div className="container text-center">
                <div className="mx-auto max-w-3xl">
                    <div className="inline-block bg-primary text-primary-foreground rounded-full p-3 mb-4 animate-pulse">
                        <Zap className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight font-headline mb-4">Quick Placement Prep</h2>
                    <p className="text-muted-foreground mb-6">
                        Jumpstart your placement journey. Upload your resume and transcript to get a personalized study plan and resource suggestions in seconds.
                    </p>
                     <Button 
                        size="lg" 
                        className="shine-button"
                        onClick={() => handleLinkClick('/placements', 'start-now')}
                        disabled={!!loading}
                      >
                         Start Now
                      </Button>
                </div>
            </div>
        </section>

        <section id="features" className="container my-20">
          <div className="mx-auto flex flex-col items-center gap-4 text-center mb-12 scroll-animate">
            <div>
              <h2 className="text-3xl font-bold tracking-tight font-headline">Everything You Need, in One Place</h2>
              <p className="text-muted-foreground max-w-2xl">
                CampusConnect integrates every aspect of your academic and social life into a single, seamless experience.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={feature.title} className={`group flex flex-col items-center text-center p-6 scroll-animate stagger-${(i % 3) + 1}`}>
                 <div className="transition-all duration-500 group-hover:scale-110">
                    <CardHeader className="p-0 mb-4">
                      <div className="bg-primary/10 text-primary p-4 rounded-full transition-transform duration-300 group-hover:scale-110">
                        {feature.icon}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardTitle className="mb-2 font-headline">{feature.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                 </div>
              </Card>
            ))}
          </div>
        </section>
        
        <section id="testimonials" className="my-20 py-24 bg-secondary/50 scroll-animate">
            <div className="container">
                <div className="mx-auto flex flex-col items-center gap-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight font-headline">From Our Students</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        See how CampusConnect is helping students achieve their goals.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                         <Card key={testimonial.name} className={`bg-card p-6 flex flex-col justify-center items-center text-center scroll-animate stagger-${i+1}`}>
                            <CardHeader className="p-0 items-center">
                                <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                                    <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.avatarHint}/>
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                                <CardDescription>{testimonial.role}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="flex justify-center mb-4 text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-muted-foreground text-sm italic">&quot;{testimonial.testimonial}&quot;</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>

      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-secondary/30">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-4">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CampusConnect. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
