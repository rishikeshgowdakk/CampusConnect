import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

const quickLinks = [
    {
        title: "Placement Corner",
        description: "Explore roadmaps and interview experiences.",
        href: "/placements",
        icon: <Briefcase className="h-6 w-6 text-primary" />
    },
    {
        title: "Upcoming Events",
        description: "Check out workshops and tech talks.",
        href: "/events",
        icon: <Calendar className="h-6 w-6 text-primary" />
    },
    {
        title: "Discussion Forum",
        description: "Join conversations and ask questions.",
        href: "/forum",
        icon: <MessageSquare className="h-6 w-6 text-primary" />
    }
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Welcome back, User!</h1>
                <p className="text-muted-foreground">Here&apos;s a quick overview of what&apos;s happening on campus.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quickLinks.map(link => (
                    <Card key={link.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-4">
                                {link.icon}
                                <CardTitle className="text-lg font-semibold">{link.title}</CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={link.href}><ArrowRight className="h-4 w-4" /></Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Mid-term Exam Schedule Released</p>
                                <p className="text-sm text-muted-foreground">Posted by Faculty Admin - 2 hours ago</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/announcements">View</Link>
                            </Button>
                        </li>
                         <li className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Hackathon 'CodeFest 2024' Registration Open</p>
                                <p className="text-sm text-muted-foreground">Posted by HOD - 1 day ago</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/announcements">View</Link>
                            </Button>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
