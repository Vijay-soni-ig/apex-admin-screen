import { useState, useEffect } from "react";
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
  ChevronDown,
  Gauge,
  UserCog,
  Briefcase,
  Wallet,
  HeadphonesIcon,
  Server,
  LogOut,
  User,
  ChevronsUpDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navGroups = [
  {
    label: "Overview",
    icon: Gauge,
    badge: null,
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "User Management",
    icon: UserCog,
    badge: null,
    items: [
      { title: "Users", url: "/users", icon: Users },
      { title: "Providers", url: "/providers", icon: Wrench },
      { title: "Verification", url: "/verification", icon: BadgeCheck },
      { title: "Roles & Access", url: "/roles", icon: Settings },
    ],
  },
  {
    label: "Operations",
    icon: Briefcase,
    badge: "3",
    items: [
      { title: "Bookings", url: "/bookings", icon: Calendar },
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "Services", url: "/services", icon: Package },
    ],
  },
  {
    label: "Financial",
    icon: Wallet,
    badge: null,
    items: [
      { title: "Payments", url: "/payments", icon: CreditCard },
    ],
  },
  {
    label: "Support",
    icon: HeadphonesIcon,
    badge: "5",
    items: [
      { title: "Tickets", url: "/tickets", icon: Ticket },
      { title: "Reviews", url: "/reviews", icon: Star },
    ],
  },
  {
    label: "System",
    icon: Server,
    badge: null,
    items: [
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Audit Logs", url: "/audit-logs", icon: Shield },
    ],
  },
];

const STORAGE_KEY = "sidebar-groups-state";

const getDefaultState = () => 
  navGroups.reduce((acc, group) => ({ ...acc, [group.label]: true }), {});

const loadFromStorage = (): Record<string, boolean> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load sidebar state from localStorage", e);
  }
  return getDefaultState();
};

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(openGroups));
    } catch (e) {
      console.error("Failed to save sidebar state to localStorage", e);
    }
  }, [openGroups]);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

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
        
        <div className="flex-1 overflow-y-auto py-2">
          {navGroups.map((group, groupIndex) => (
            <Collapsible
              key={group.label}
              open={isCollapsed ? false : openGroups[group.label]}
              onOpenChange={() => !isCollapsed && toggleGroup(group.label)}
            >
              <SidebarGroup className="px-2 py-1">
                <CollapsibleTrigger className="w-full">
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4 text-muted-foreground" />
                      {!isCollapsed && (
                        <>
                          <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                            {group.label}
                          </span>
                          {group.badge && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium bg-primary/10 text-primary border-0">
                              {group.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown 
                        className={`h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-200 ${openGroups[group.label] ? '' : '-rotate-90'}`} 
                      />
                    )}
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-0.5 mt-1">
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
                </CollapsibleContent>
                
                {groupIndex < navGroups.length - 1 && !isCollapsed && (
                  <div className="mx-3 mt-2 border-t border-border/30" />
                )}
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">Admin User</p>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@servicehub.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
