
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { User } from "@/types";
import { getCurrentUser, logoutUser } from "@/services/auth";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for logged in user on mount
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route - redirect to dashboard if already logged in */}
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" replace /> : <Auth />}
            />

            {/* Protected routes - require authentication */}
            <Route
              element={
                <AppLayout user={user} onLogout={handleLogout} />
              }
            >
              <Route
                path="/dashboard"
                element={user ? <Dashboard user={user} /> : <Navigate to="/" replace />}
              />
              <Route path="/map" element={<Map />} />
              <Route path="/events" element={<Events />} />
              {/* Add other routes as needed */}
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
