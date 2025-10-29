import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  BadgeCheck,
  Calendar,
  CreditCard,
  Package,
  Ticket,
  Star,
  Bell,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Providers", url: "/providers", icon: Wrench },
  { title: "Verification", url: "/verification", icon: BadgeCheck },
  { title: "Bookings", url: "/bookings", icon: Calendar },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Services", url: "/services", icon: Package },
  { title: "Tickets", url: "/tickets", icon: Ticket },
  { title: "Reviews", url: "/reviews", icon: Star },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Audit Logs", url: "/audit-logs", icon: Shield },
  { title: "Roles & Access", url: "/roles", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-3 py-4">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-sidebar-foreground">ServiceHub</h2>
          )}
          {isCollapsed && (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
                S
              </div>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
