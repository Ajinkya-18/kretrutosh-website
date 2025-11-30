import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
            
            {/* 1. Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
              <p>
                Welcome to <strong>KretruTosh Consulting</strong> ("we," "our," or "us"). By accessing or using our website, 
                services, assessments, or frameworks, you agree to be bound by these Terms and Conditions ("Terms"). 
                If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* 2. Services */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Services Provided</h2>
              <p>
                KretruTosh Consulting provides strategic business consulting, customer experience (CX) assessments, 
                proprietary frameworks (including but not limited to "No-Fluff CX"), and educational content. 
                All information provided is for general informational and strategic purposes only.
              </p>
            </section>

            {/* 3. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Intellectual Property</h2>
              <p>
                All content, features, and functionality on this website—including text, graphics, logos, icons, 
                images, audio clips, digital downloads, data compilations, and software—are the exclusive property of 
                KretruTosh Consulting or its content suppliers and are protected by Indian and international copyright laws.
              </p>
              <p className="mt-4">
                <strong>Proprietary Frameworks:</strong> Our unique methodologies and frameworks (e.g., CX Maturity Models, 
                Value Realization Maps) are intellectual property of KretruTosh Consulting. You may not copy, modify, 
                distribute, or create derivative works from them without our express written permission.
              </p>
            </section>

            {/* 4. User Obligations */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. User Obligations</h2>
              <p>
                By using our website, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide accurate and complete information when requested (e.g., via contact forms).</li>
                <li>Use the website only for lawful purposes and in accordance with these Terms.</li>
                <li>Not engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website.</li>
                <li>Not attempt to gain unauthorized access to any portion of the website or our systems.</li>
              </ul>
            </section>

            {/* 5. Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Privacy Policy</h2>
              <p>
                Your use of our website is also governed by our <strong>Privacy Policy</strong>. We collect minimal data 
                (Name, Email, Phone) solely to provide our services and communicate with you. We do not sell your 
                personal data to third parties. Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            {/* 6. Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Disclaimers</h2>
              <p>
                <strong>No Guarantee of Results:</strong> Our consulting services and frameworks are designed to assist 
                businesses in improving their strategies. However, specific business outcomes depend on numerous factors 
                beyond our control. We do not guarantee any specific results, revenue increases, or operational improvements.
              </p>
              <p className="mt-4">
                <strong>"As Is" Basis:</strong> The website and its content are provided on an "as is" and "as available" basis 
                without any warranties of any kind, either express or implied.
              </p>
            </section>

            {/* 7. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, KretruTosh Consulting shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of 
                profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or 
                inability to access or use) the website or services.
              </p>
            </section>

            {/* 8. Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Governing Law and Jurisdiction</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of <strong>India</strong>, without regard 
                to its conflict of law provisions. Any dispute arising out of or relating to these Terms or our services 
                shall be subject to the exclusive jurisdiction of the courts located in <strong>Mumbai, Maharashtra, India</strong>.
              </p>
            </section>

            {/* 9. Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What 
                constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-card rounded-lg border border-border">
                <p className="font-semibold text-lg">KretruTosh Consulting</p>
                <p className="mt-2">Email: <a href="mailto:consult.ashutosh@kretru.com" className="text-primary hover:underline">consult.ashutosh@kretru.com</a></p>
                <p>Address: Mumbai, Maharashtra, India</p>
              </div>
            </section>

          </div>

          {/* Back Button */}
          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
