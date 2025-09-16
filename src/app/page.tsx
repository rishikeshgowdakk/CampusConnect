import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Calendar,
  FolderKanban,
  Megaphone,
  MessageSquare,
  Bot,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/icons";

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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-xl">CampusConnect</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center justify-center gap-6 pb-8 pt-12 md:py-20 text-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl font-headline fade-in-up">
              The All-In-One Platform for Your Campus Life
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground fade-in-up stagger-1">
              Connect, collaborate, and conquer your college journey. From placements to discussions, we&apos;ve got you covered.
            </p>
            <div className="flex gap-4 fade-in-up stagger-2">
              <Button asChild size="lg">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="hero-image" className="container my-12 fade-in-up stagger-3">
            <div className="overflow-hidden rounded-xl shadow-2xl">
                <Image
                    src="https://picsum.photos/seed/1/1200/600"
                    alt="CampusConnect Hero Image"
                    width={1200}
                    height={600}
                    className="w-full"
                    data-ai-hint="university campus"
                />
            </div>
        </section>

        <section id="features" className="container my-20">
          <div className="mx-auto flex flex-col items-center gap-4 text-center mb-12 fade-in-up">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Everything You Need, in One Place</h2>
            <p className="text-muted-foreground max-w-2xl">
              CampusConnect integrates every aspect of your academic and social life into a single, seamless experience.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Card key={feature.title} className={`flex flex-col items-center text-center p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl fade-in-up stagger-${i % 3}`}>
                <CardHeader className="p-0 mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="mb-2 font-headline">{feature.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="profile-preview" className="container my-20 fade-in-up">
            <div className="bg-card p-8 rounded-xl shadow-lg border">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight font-headline mb-4">Showcase Your Skills</h2>
                        <p className="text-muted-foreground mb-6">
                            Create a personalized profile that highlights your achievements, projects, and social links. Let recruiters and peers see your potential.
                        </p>
                        <Button asChild>
                            <Link href="/signup">Create Your Profile</Link>
                        </Button>
                    </div>
                    <div className="bg-background/50 p-6 rounded-lg border">
                         <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <User className="w-16 h-16 p-3 bg-muted rounded-full"/>
                                <div>
                                    <CardTitle>Your Name</CardTitle>
                                    <p className="text-muted-foreground">Student @ University</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">Passionate developer and problem solver. Actively seeking opportunities in software engineering.</p>
                                <div className="flex space-x-4 text-sm text-muted-foreground">
                                    <span><strong>LinkedIn:</strong> /in/yourprofile</span>
                                    <span><strong>GitHub:</strong> /yourusername</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-6 md:px-8 md:py-0 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by You. Powered by AI.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CampusConnect. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
