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
  MessageSquare,
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

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "User Management",
    items: [
      { title: "Users", url: "/users", icon: Users },
      { title: "Teams", url: "/teams", icon: Users },
      { title: "Providers", url: "/providers", icon: Wrench },
      { title: "Verification", url: "/verification", icon: BadgeCheck },
      { title: "Roles & Access", url: "/roles", icon: Settings },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Bookings", url: "/bookings", icon: Calendar },
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "Services", url: "/services", icon: Package },
    ],
  },
  {
    label: "Financial",
    items: [
      { title: "Payments", url: "/payments", icon: CreditCard },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "Tickets", url: "/tickets", icon: Ticket },
      { title: "Reviews", url: "/reviews", icon: Star },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Audit Logs", url: "/audit-logs", icon: Shield },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-gradient-to-b from-card to-card/50">
        <div className="px-3 py-6 border-b border-border/50">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                S
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ServiceHub</h2>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                S
              </div>
            </div>
          )}
        </div>
        {navGroups.map((group, groupIndex) => (
          <SidebarGroup key={group.label} className="px-2 py-3">
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 px-3 mb-2 uppercase tracking-wider">
              {!isCollapsed && group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-primary/15 text-primary border-l-3 border-primary font-semibold rounded-r-lg shadow-sm"
                            : "hover:bg-accent/10 text-sidebar-foreground/80 hover:text-primary transition-all duration-200 rounded-lg hover:shadow-sm"
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
            {groupIndex < navGroups.length - 1 && (
              <div className="mx-3 mt-3 border-t border-border/30" />
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
