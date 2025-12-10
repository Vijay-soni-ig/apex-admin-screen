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
import TicketDetails from "./pages/TicketDetails";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import AuditLogs from "./pages/AuditLogs";
import Roles from "./pages/Roles";
import Profile from "./pages/Profile";
import AddUser from "./pages/AddUser";
import AddProvider from "./pages/AddProvider";
import ProviderProfile from "./pages/ProviderProfile";
import ProviderBookings from "./pages/ProviderBookings";
import BookingDetails from "./pages/BookingDetails";
import PaymentDetails from "./pages/PaymentDetails";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import PricingRules from "./pages/PricingRules";
import CreateRole from "./pages/CreateRole";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
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
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/providers/add" element={<AddProvider />} />
            <Route path="/provider-profile/:providerId" element={<ProviderProfile />} />
            <Route path="/provider-bookings/:providerId" element={<ProviderBookings />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking-details/:bookingId" element={<BookingDetails />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payment-details/:transactionId" element={<PaymentDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/add" element={<AddService />} />
            <Route path="/services/edit/:serviceId" element={<EditService />} />
            <Route path="/services/pricing-rules" element={<PricingRules />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/ticket-details/:ticketId" element={<TicketDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/roles/create" element={<CreateRole />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
