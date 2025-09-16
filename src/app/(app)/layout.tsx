
'use client';

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
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
  const pathname = usePathname();
  const role = searchParams.get('role') || 'student';
  const [isLoading, setIsLoading] = useState(false);

  const navItems = allNavItems.filter(item => item.role.includes(role));

  const handleLinkClick = (href: string) => {
    // Only show loader if navigating to a different page
    if (pathname !== href) {
      setIsLoading(true);
    }
  };

  // Turn off loader when navigation is complete
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <SidebarProvider>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in-0">
          <div className="flex flex-col items-center gap-4">
            <Logo className="h-16 w-16 text-primary animate-pulse-grow" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}
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
              <SidebarMenuItem key={item.href} onClick={() => handleLinkClick(item.href)}>
                <Link href={`${item.href}?role=${role}`} passHref>
                  <SidebarMenuButton tooltip={item.label} isActive={pathname === item.href}>
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
