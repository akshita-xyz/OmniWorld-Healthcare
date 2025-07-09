
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Healthcare from "./pages/Healthcare";
import BeSeller from "./pages/BeSeller";
import Help from "./pages/Help";
import ComingSoon from "./pages/ComingSoon";
import MedicalInstruments from "./pages/categories/MedicalInstruments";
import Medicines from "./pages/categories/Medicines";
import Diagnostic from "./pages/categories/Diagnostic";
import Monitoring from "./pages/categories/Monitoring";
import Surgical from "./pages/categories/Surgical";
import LabEquipment from "./pages/categories/LabEquipment";
import FirstAid from "./pages/categories/FirstAid";
import PPE from "./pages/categories/PPE";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/healthcare/medical-instruments" element={<MedicalInstruments />} />
            <Route path="/healthcare/medicines" element={<Medicines />} />
            <Route path="/healthcare/diagnostic" element={<Diagnostic />} />
            <Route path="/healthcare/monitoring" element={<Monitoring />} />
            <Route path="/healthcare/surgical" element={<Surgical />} />
            <Route path="/healthcare/lab-equipment" element={<LabEquipment />} />
            <Route path="/healthcare/first-aid" element={<FirstAid />} />
            <Route path="/healthcare/ppe" element={<PPE />} />
            <Route path="/be-seller" element={<BeSeller />} />
            <Route path="/help" element={<Help />} />
            <Route path="/:division" element={<ComingSoon />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
