import Link from "next/link";
import {
  Briefcase,
  Calendar,
  FolderKanban,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  User,
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

const navItems = [
  { href: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
  { href: "/profile", icon: <User />, label: "Profile" },
  { href: "/placements", icon: <Briefcase />, label: "Placement Corner" },
  { href: "/announcements", icon: <Megaphone />, label: "Announcements" },
  { href: "/events", icon: <Calendar />, label: "Events" },
  { href: "/forum", icon: <MessageSquare />, label: "Forum" },
  { href: "/resources", icon: <FolderKanban />, label: "Resource Hub" },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                <Link href={item.href} passHref>
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
            <div className="hidden md:block">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
        <Chatbot />
      </SidebarInset>
    </SidebarProvider>
  );
}
