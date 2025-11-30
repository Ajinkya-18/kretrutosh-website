import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// --- Import your Page Components ---
import Index from "./pages/Index";
import About from "./pages/About";
import Book from "./pages/Book";
import Videos from "./pages/Videos";
import Blogs from "./pages/Blogs2";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// --- Import the NEW Solutions Pages ---
import PreSales from "./pages/solutions/PreSales";
import SalesVelocity from "./pages/solutions/SalesVelocity";
import CustomerSuccess from "./pages/solutions/CustomerSuccess";
import DigitalAI from "./pages/solutions/DigitalAI";
import CultureLeadership from "./pages/solutions/CultureLeadership";

// --- Import the NEW Framework Pages ---
import Frameworks from "./pages/Frameworks";
import FrameworkDetail from "./pages/FrameworkDetail";

// --- Import the NEW Industry Pages ---
import IndustryDetail from "./pages/IndustryDetail";

// --- Import the NEW Resources/Contact Pages ---
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Whitepapers from "./pages/resources/Whitepapers";

// --- Import the NEW Aggregate Pages ---
import Services from "./pages/Services";
import Assessments from "./pages/Assessments";
import CaseStudiesPage from "./pages/CaseStudiesPage";

// --- Import the OLD Individual Service/Assessment Pages ---
// We keep these imports so the links still work
import PreSalesLegacy from "./pages/services/PreSales";
import SalesLegacy from "./pages/services/Sales";
import PostSalesLegacy from "./pages/services/PostSales";
import DigitalEnablementLegacy from "./pages/services/DigitalEnablement";
import CultureTransformationLegacy from "./pages/services/CultureTransformation";
import CXMaturity from "./pages/assessments/CXMaturity";
import CSMaturity from "./pages/assessments/CSMaturity";
import CultureMaturity from "./pages/assessments/CultureMaturity";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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

          {/* --- Solutions Routes --- */}
          <Route path="/solutions" element={<ComingSoon />} />
          <Route path="/solutions/pre-sales" element={<PreSales />} />
          <Route path="/solutions/sales-velocity" element={<SalesVelocity />} />
          <Route path="/solutions/customer-success" element={<CustomerSuccess />} />
          <Route path="/solutions/digital-ai" element={<DigitalAI />} />
          <Route path="/solutions/culture-transformation" element={<CultureLeadership />} />

          {/* --- Frameworks Routes --- */}
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/frameworks/:id" element={<FrameworkDetail />} />

          {/* --- Industries Routes --- */}
          <Route path="/industries" element={<ComingSoon />} />
          <Route path="/industries/:id" element={<IndustryDetail />} />

          {/* --- Resources Routes --- */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/whitepapers" element={<Whitepapers />} />
          <Route path="/resources/podcast" element={<Videos />} /> {/* Mapping to Videos page */}
          <Route path="/resources/articles" element={<Blogs />} /> {/* Mapping to Blogs page */}
          <Route path="/resources/book" element={<Book />} />

          {/* --- About Routes --- */}
          <Route path="/about/founder" element={<About />} />
          <Route path="/about/clients" element={<ComingSoon />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* --- Legacy Routes (Kept for backward compatibility if needed) --- */}
          <Route path="/services" element={<Services />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          
          <Route path="/services/pre-sales" element={<PreSalesLegacy />} />
          <Route path="/services/sales" element={<SalesLegacy />} />
          <Route path="/services/post-sales" element={<PostSalesLegacy />} />
          <Route path="/services/digital-enablement" element={<DigitalEnablementLegacy />} />
          <Route path="/services/culture-transformation" element={<CultureTransformationLegacy />} />
          <Route path="/assessments/cx-maturity" element={<CXMaturity />} />
          <Route path="/assessments/cs-maturity" element={<CSMaturity />} />
          <Route path="/assessments/culture-maturity" element={<CultureMaturity />} />

          {/* --- 404 Not Found Page --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;