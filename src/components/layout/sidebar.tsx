'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import {
  BarChart2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Signal,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/signals', icon: Signal, label: 'Signals' },
  { href: '/predictions', icon: BarChart2, label: 'Predictions' },
  { href: '/chatbot', icon: MessageCircle, label: 'Chatbot' },
  { href: '/education', icon: GraduationCap, label: 'Education' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <div className="flex h-full flex-col">
        <SidebarHeader className="p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-semibold"
          >
            <Logo className="h-7 w-7 text-primary" />
            <span className="text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Gold
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2">
          <Separator className="my-2 bg-sidebar-border" />
          <div className="group/user-menu relative">
            <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton asChild isActive={pathname === '/profile'}>
                   <Link href="/profile">
                    <Avatar className="h-7 w-7">
                        <AvatarImage src="https://picsum.photos/seed/user1/100/100" alt="User" />
                        <AvatarFallback>JT</AvatarFallback>
                    </Avatar>
                    <span>James T.</span>
                   </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
                <SidebarMenuItem>
                 <SidebarMenuButton tooltip={{children: "Settings"}} asChild isActive={pathname === '/profile'}>
                   <Link href="/profile">
                    <Settings />
                    <span>Settings</span>
                   </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
                 <SidebarMenuItem>
                 <SidebarMenuButton tooltip={{children: "Log Out"}} onClick={() => router.push('/')}>
                   <LogOut />
                   <span>Log Out</span>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
