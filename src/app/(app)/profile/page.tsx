
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    usn: z.string().min(1, "USN is required"),
    year: z.coerce.number().min(1, "Year is required").max(4, "Please enter a valid year"),
    bio: z.string().optional(),
    linkedin: z.string().url("Please enter a valid LinkedIn URL").min(1, "LinkedIn profile is required"),
    github: z.string().url("Please enter a valid GitHub URL").min(1, "GitHub profile is required"),
    leetcode: z.string().url("Please enter a valid LeetCode URL").min(1, "LeetCode profile is required"),
});

export default function ProfilePage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: "Your",
            lastName: "Name",
            bio: "Passionate developer and problem solver. Actively seeking opportunities in software engineering.",
            usn: "",
            year: undefined,
            linkedin: "",
            github: "",
            leetcode: "",
        },
    });

    function onSubmit(data: z.infer<typeof profileSchema>) {
        // Here you would typically send the data to your backend for approval.
        console.log("Profile data submitted for approval:", data);
        toast({
            title: "Profile Submitted!",
            description: "Your profile has been sent for faculty approval. You will be notified once it's reviewed.",
        });
        // Redirect user to a waiting page or back to dashboard with limited access
        router.push("/dashboard");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Complete Your Profile</h1>
                    <p className="text-muted-foreground">This information is required for account approval.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>This information will be visible on your profile after approval.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-24 w-24 border">
                                <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" data-ai-hint="person avatar" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="picture">Profile Picture</Label>
                                <Input id="picture" type="file" />
                                <p className="text-xs text-muted-foreground">JPG, PNG, or GIF, no larger than 5MB.</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                         <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="usn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>USN (University Seat Number)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 1CR21CS001" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year of Study</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g., 3" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="user@example.com" disabled />
                            <FormDescription>You cannot change your registration email.</FormDescription>
                        </div>
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us a little bit about yourself" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Social & Professional Links</CardTitle>
                        <CardDescription>These links are mandatory for registration.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn Profile URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub Profile URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://github.com/yourusername" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="leetcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LeetCode Profile URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://leetcode.com/yourusername" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit">Submit for Approval</Button>
                </div>
            </form>
        </Form>
    );
}
