import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "": "Dashboard",
  "users": "Users",
  "add": "Add New",
  "providers": "Providers",
  "verification": "Verification",
  "bookings": "Bookings",
  "booking-details": "Booking Details",
  "payments": "Payments",
  "payment-details": "Payment Details",
  "services": "Services",
  "edit": "Edit",
  "pricing-rules": "Pricing Rules",
  "tickets": "Tickets",
  "ticket-details": "Ticket Details",
  "reviews": "Reviews",
  "notifications": "Notifications",
  "analytics": "Analytics",
  "audit-logs": "Audit Logs",
  "roles": "Roles & Access",
  "create": "Create",
  "profile": "Profile",
  "messages": "Messages",
  "settings": "Settings",
  "help": "Help Center",
  "provider-profile": "Provider Profile",
  "provider-bookings": "Provider Bookings",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on dashboard
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = routeLabels[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

          // Skip ID segments (UUIDs or numeric IDs)
          const isId = /^[0-9a-f-]{8,}$|^\d+$|^[A-Z]{3}-\d+$/i.test(value);
          if (isId && !isLast) {
            return null;
          }

          return (
            <li key={to} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1" />
              {isLast ? (
                <span className="font-medium text-foreground truncate max-w-[200px]">
                  {isId ? value : label}
                </span>
              ) : (
                <Link 
                  to={to} 
                  className="hover:text-foreground transition-colors truncate max-w-[150px]"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
