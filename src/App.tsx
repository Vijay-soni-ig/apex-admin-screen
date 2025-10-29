import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Providers from "./pages/Providers";
import Verification from "./pages/Verification";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Services from "./pages/Services";
import Tickets from "./pages/Tickets";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import AuditLogs from "./pages/AuditLogs";
import Roles from "./pages/Roles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
