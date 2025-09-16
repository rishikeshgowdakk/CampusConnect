
'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Briefcase,
  Calendar,
  FolderKanban,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  User,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { UserNav } from "@/components/user-nav";
import Chatbot from "@/components/chatbot";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const allNavItems = [
  { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard", role: ['student', 'faculty'] },
  { href: "/profile", icon: <User />, label: "Profile", role: ['student', 'faculty'] },
  { href: "/placements", icon: <Briefcase />, label: "Placement Corner", role: ['student', 'faculty'] },
  { href: "/announcements", icon: <Megaphone />, label: "Announcements", role: ['student', 'faculty'] },
  { href: "/events", icon: <Calendar />, label: "Events", role: ['student', 'faculty'] },
  { href: "/forum", icon: <MessageSquare />, label: "Forum", role: ['student', 'faculty'] },
  { href: "/resources", icon: <FolderKanban />, label: "Resource Hub", role: ['student', 'faculty'] },
  { href: "/admin", icon: <Shield />, label: "Admin Panel", role: ['faculty'] },
];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'student';

  const navItems = allNavItems.filter(item => item.role.includes(role));

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-6 text-primary" />
            <span className="text-lg font-semibold font-headline">CampusConnect</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={`${item.href}?role=${role}`} passHref>
                  <SidebarMenuButton tooltip={item.label}>
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <UserNav />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex-1">
              {/* Could add breadcrumbs or page title here */}
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden md:block">
                <UserNav />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
        <Chatbot />
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AppLayoutContent>{children}</AppLayoutContent>
    </React.Suspense>
  )
}
