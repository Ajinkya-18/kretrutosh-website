import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CultureTransformation = () => {
  const navigate = useNavigate();

  const outcomes = [
    "Increase in eNPS",
    "Reduced Early Attrition",
    "Enhanced Collaboration",
    "Accelerated Innovation cycle time",
    "Increased proposal response time",
    "Reduced issue resolution time"
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
                Culture Transformation
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up">
                Build customer-centricity and vision-aligned mindset & behaviors into leadership and teams
              </p>
            </div>
          </div>
        </section>
        {/* --- END OF HEADER UPDATE --- */}

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 animate-fade-in">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sustaining GTM Velocity by aligning people, values, and behaviors — ensuring every team acts with shared purpose and customer focus.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-8 animate-fade-in">Key Outcomes</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg animate-fade-in hover:bg-muted/70 transition-all" style={{ animationDelay: `${index * 0.05}s` }}>
                    <CheckCircle2 className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-lg">{outcome}</p>
                  </div>
                ))}
              </div>

              <div className="text-center animate-fade-in">
                <Button
                  size="lg"
                  onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                  variant="premium"
                >
                  Transform Your Culture
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

export default CultureTransformation;
