import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuantumParticles from "./pages/QuantumParticles";
import ProtonsNeutrons from "./pages/ProtonsNeutrons";
import Atoms from "./pages/Atoms";
import GreenhouseGases from "./pages/GreenhouseGases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quantum" element={<QuantumParticles />} />
          <Route path="/protons-neutrons" element={<ProtonsNeutrons />} />
          <Route path="/atoms" element={<Atoms />} />
          <Route path="/greenhouse" element={<GreenhouseGases />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
