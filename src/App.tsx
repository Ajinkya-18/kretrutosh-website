import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";

// --- Components ---
import ServiceBuilder from "@/components/ServiceBuilder";

// --- Main Pages ---
import Index from "./pages/Index";
import About from "./pages/About";
import Book from "./pages/Book";
import Videos from "./pages/Videos";
import Blogs from "./pages/Blogs2"; // Using Blogs2 as the main Blogs page
import Contact from "./pages/Contact";

// --- Framework & Industry Pages ---
import Frameworks from "./pages/Frameworks";
import FrameworkDetail from "./pages/FrameworkDetail";
import IndustryDetail from "./pages/IndustryDetail";

// --- Resources & Legal ---
import Resources from "./pages/Resources";
import Whitepapers from "./pages/resources/Whitepapers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

// --- Legacy Pages (Keeping only if strictly needed, but prefer new architecture) ---
import Assessments from "./pages/Assessments";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CXMaturity from "./pages/assessments/CXMaturity";
import CSMaturity from "./pages/assessments/CSMaturity";
import CultureMaturity from "./pages/assessments/CultureMaturity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* --- Main Pages --- */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/book" element={<Book />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contact />} />

            {/* --- Frameworks Routes --- */}
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/frameworks/:id" element={<FrameworkDetail />} />

            {/* --- Services Routes (Powered by Page Builder) --- */}
            <Route path="/services" element={<ComingSoon />} />
            <Route path="/services/pre-sales" element={<ServiceBuilder slug="pre-sales" />} />
            <Route path="/services/sales-velocity" element={<ServiceBuilder slug="sales-velocity" />} />
            <Route path="/services/customer-success" element={<ServiceBuilder slug="customer-success" />} />
            <Route path="/services/digital-ai" element={<ServiceBuilder slug="digital-ai" />} />
            <Route path="/services/culture-transformation" element={<ServiceBuilder slug="culture-transformation" />} />

            {/* --- Industries Routes --- */}
            <Route path="/industries" element={<ComingSoon />} />
            <Route path="/industries/:id" element={<IndustryDetail />} />

            {/* --- Resources Routes --- */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/whitepapers" element={<Whitepapers />} />
            <Route path="/resources/podcast" element={<Videos />} />
            <Route path="/resources/articles" element={<Blogs />} />
            <Route path="/resources/book" element={<Book />} />

            {/* --- About Sub-Routes --- */}
            <Route path="/about/founder" element={<About />} />
            <Route path="/about/clients" element={<ComingSoon />} />

            {/* --- Legal --- */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* --- Legacy/Other --- */}
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/assessments/cx-maturity" element={<CXMaturity />} />
            <Route path="/assessments/cs-maturity" element={<CSMaturity />} />
            <Route path="/assessments/culture-maturity" element={<CultureMaturity />} />

            {/* --- 404 Not Found Page --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;