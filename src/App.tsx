import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

// Import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PhishingEmails from "./pages/PhishingEmails";
import DDoSAttacks from "./pages/DDoSAttacks";
import BruteForce from "./pages/BruteForce";
import MalwareDetection from "./pages/MalwareDetection";
import Incidents from "./pages/Incidents";
import Reports from "./pages/Reports";

// Import layout components
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Login Route */}
            <Route 
              path="/login" 
              element={<Login onLogin={() => setIsAuthenticated(true)} />} 
            />
            
            {/* Protected Routes with Layout */}
            <Route 
              path="/*" 
              element={
                isAuthenticated ? (
                  <SidebarProvider defaultOpen={false}>
                    <div className="min-h-screen flex w-full bg-background">
                      <AppLayout onLogout={() => setIsAuthenticated(false)}>
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/phishing" element={<PhishingEmails />} />
                          <Route path="/ddos" element={<DDoSAttacks />} />
                          <Route path="/brute-force" element={<BruteForce />} />
                          <Route path="/malware" element={<MalwareDetection />} />
                          <Route path="/incidents" element={<Incidents />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </AppLayout>
                    </div>
                  </SidebarProvider>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;