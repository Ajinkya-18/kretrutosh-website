import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DigitalEnablement = () => {
  const navigate = useNavigate();

  const offerings = [
    "Tech Stack & Platform Selection (CRM, CXM, CS, VoC, NPS, CSAT, etc.)",
    "Voice of Customer (VoC/NPS/CSAT/CES) Program Design",
    "Feedback Loop Entrenchment across Sales, CS & Product",
    "CX Maturity Assessment & Optimization Frameworks",
    "ROI Use-Case Creation for Tech Investments",
    "Program Management for Rollouts & Adoption",
  ];

  const outcomes = [
    { metric: "+12–18%", description: "Platform ROI" },
    { metric: "+23-28%", description: "Platform Adoption" },
    { metric: "+18-33%", description: "CSAT Improvement" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* --- HEADER UPDATED --- */}
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Enablement
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up">
                Empowering GTM Velocity by unifying data, platforms, and feedback loops
              </p>
            </div>
          </div>
        </section>
        {/* --- END OF HEADER UPDATE --- */}

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Enable insight-driven decisions through tech and data ecosystems — turning customer insights into faster, smarter commercial decisions.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-8 animate-fade-in">Key Outcomes</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {outcomes.map((outcome, index) => (
                  <Card key={index} className="border-accent/20 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <CardTitle className="text-accent text-3xl">{outcome.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{outcome.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-3xl font-bold mb-8 animate-fade-in">What We Offer</h2>
              <div className="space-y-4 mb-12">
                {offerings.map((offering, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg animate-fade-in hover:bg-muted/70 transition-all" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CheckCircle2 className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-lg">{offering}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                  className="bg-accent hover:bg-accent/90"
                >
                  Get Started with Digital Enablement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DigitalEnablement;
