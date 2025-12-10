import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  User,
  Wrench,
  Calendar,
  Package,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  FileText,
  Shield,
  Bell,
} from "lucide-react";

interface QuickActionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickActions = [
  { 
    group: "Create", 
    items: [
      { title: "Add New User", icon: User, path: "/users/add", description: "Register a new customer" },
      { title: "Add New Provider", icon: Wrench, path: "/providers/add", description: "Onboard a service provider" },
      { title: "Add New Service", icon: Package, path: "/services/add", description: "Create a new service" },
      { title: "Create Role", icon: Shield, path: "/roles/create", description: "Define new permissions" },
    ]
  },
  { 
    group: "Navigate", 
    items: [
      { title: "Dashboard", icon: BarChart3, path: "/", description: "View overview" },
      { title: "Bookings", icon: Calendar, path: "/bookings", description: "Manage bookings" },
      { title: "Payments", icon: CreditCard, path: "/payments", description: "View transactions" },
      { title: "Messages", icon: MessageSquare, path: "/messages", description: "Open chat" },
      { title: "Analytics", icon: BarChart3, path: "/analytics", description: "View reports" },
    ]
  },
  { 
    group: "Settings", 
    items: [
      { title: "Platform Settings", icon: Settings, path: "/settings", description: "Configure platform" },
      { title: "Notifications", icon: Bell, path: "/notifications", description: "Manage alerts" },
      { title: "Help Center", icon: HelpCircle, path: "/help", description: "Get support" },
    ]
  },
];

export function QuickActions({ open, onOpenChange }: QuickActionsProps) {
  const navigate = useNavigate();

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-lg overflow-hidden">
        <Command className="rounded-lg border-none">
          <CommandInput placeholder="Type a command or search..." className="h-14" />
          <CommandList className="max-h-[400px]">
            <CommandEmpty>No results found.</CommandEmpty>
            {quickActions.map((group, groupIdx) => (
              <div key={group.group}>
                <CommandGroup heading={group.group}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.path}
                      onSelect={() => handleSelect(item.path)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    >
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {groupIdx < quickActions.length - 1 && <CommandSeparator />}
              </div>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export function QuickActionsTrigger() {
  const [open, setOpen] = useState(false);

  // Add keyboard shortcut
  useState(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 rounded-xl border-border/50"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Quick actions...
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <QuickActions open={open} onOpenChange={setOpen} />
    </>
  );
}
