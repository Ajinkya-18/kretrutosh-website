import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Users, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion"; // <-- 1. Import motion

interface Assessment {
  id: string;
  title: string;
  description: string;
  icon: any; 
  path: string;
}

const Assessments = () => {
  const navigate = useNavigate();

  const assessments: Assessment[] = [
    {
      id: "1",
      title: "CX Maturity Assessment",
      description: "Measure your CX readiness across 8 dimensions to baseline how your brand promise is delivered.",
      icon: ClipboardCheck,
      path: "/assessments/cx-maturity",
    },
    {
      id: "2",
      title: "CS Maturity Assessment",
      description: "Evaluate your Customer Success maturity and identify opportunities for improvement.",
      icon: Users,
      path: "/assessments/cs-maturity",
    },
    {
      id: "3",
      title: "Culture Maturity Assessment",
      description: "Assess your organizational culture and identify areas for transformation.",
      icon: BrainCircuit,
      path: "/assessments/culture-maturity",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Header Section (Already uses light theme - correct) */}
        <section className="py-24 pt-48 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Free Assessments
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take our complimentary assessments to gain valuable insights into your business
              </p>
            </div>

            {/* --- 2. Layout updated with motion --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {assessments.map((assessment, index) => {
                const Icon = assessment.icon;
                return (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card 
                      className="group border-border/50 h-full flex flex-col
                                 bg-card transition-all duration-300
                                 hover:shadow-elegant hover:-translate-y-1" // <-- 3. Polished styles
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                              {assessment.title}
                            </CardTitle>
                            <CardDescription className="text-base">
                              {assessment.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="mt-auto"> {/* Pushes button to bottom */}
                        <Button 
                          variant="premium" 
                          className="w-full"
                          onClick={() => navigate(assessment.path)}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Assessments;