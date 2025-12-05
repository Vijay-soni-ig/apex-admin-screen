import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Teams from "./pages/Teams";
import TeamSettings from "./pages/TeamSettings";
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
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <Users />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AddUser />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Teams />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams/:teamId/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TeamSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/providers"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Providers />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/providers/add"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <AddProvider />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider-profile/:providerId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProviderProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider-bookings/:providerId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProviderBookings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/verification"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <Verification />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Bookings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-details/:bookingId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BookingDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <Payments />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-details/:transactionId"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <PaymentDetails />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Services />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/add"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <AddService />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/edit/:serviceId"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <EditService />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/pricing-rules"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <PricingRules />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Tickets />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Reviews />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="moderator">
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AuditLogs />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <Roles />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles/create"
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <CreateRole />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Messages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
