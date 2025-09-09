import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import LeadMagnet from "./pages/LeadMagnet";
import ThankYou from "./pages/ThankYou";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppRoutes = () => (
  <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
    <Routes>
      <Route path="/" element={<LeadMagnet />} />
      <Route path="/guide/:step" element={<LeadMagnet />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
