import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
                <p className="text-muted-foreground">Manage your personal and professional information.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>This information is visible on your public profile.</CardDescription>
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
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Your" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Name" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="user@example.com" disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us a little bit about yourself" defaultValue="Passionate developer and problem solver. Actively seeking opportunities in software engineering."/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social & Professional Links</CardTitle>
                    <CardDescription>Help recruiters and peers connect with you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                        <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="github">GitHub Profile URL</Label>
                        <Input id="github" placeholder="https://github.com/yourusername" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="leetcode">LeetCode Profile URL</Label>
                        <Input id="leetcode" placeholder="https://leetcode.com/yourusername" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}
