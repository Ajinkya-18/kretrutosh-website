import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Target, TrendingUp, Users, Zap, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion"; // <-- 1. Import motion

const Services = () => {
  const navigate = useNavigate();

  const allServices = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Pre Sales",
      description: "Align brand purpose, positioning, and GTM readiness",
      path: "/services/pre-sales",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Sales",
      description: "Accelerate acquisition, conversion, and predictable revenue",
      path: "/services/sales",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Post Sales",
      description: "Maximize customer retention, expansion, and advocacy",
      path: "/services/post-sales",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Digital Enablement",
      description: "Empower GTM Velocity through unified data and platforms",
      path: "/services/digital-enablement",
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "Culture Transformation",
      description: "Embed customer-centricity and enable high-performing teams",
      path: "/services/culture-transformation",
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Header Section (Already uses light theme - correct) */}
        <section className="py-24 pt-48 bg-gradient-to-b from-muted/30 via-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
                Comprehensive solutions to transform your business velocity
              </p>
            </div>

            {/* --- 2. Layout updated with motion --- */}
            <div className="max-w-4xl mx-auto space-y-8">
              {allServices.map((service, index) => (
                <motion.div
                  key={service.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => navigate(service.path)}
                    className="group cursor-pointer border-border/60 bg-card overflow-hidden relative text-left 
                               transition-all duration-300
                               hover:shadow-elegant hover:-translate-y-1" // <-- 3. Polished styles
                  >
                    <CardHeader className="relative flex-row items-center gap-6 p-6">
                      <div className="mb-0 text-accent group-hover:scale-110 transition-transform duration-500">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl group-hover:text-accent transition-colors duration-300">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed mt-1">
                          {service.description}
                        </CardDescription>
                      </div>
                       <Button variant="ghost" className="group-hover:text-accent p-0 font-semibold hidden md:inline-flex">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;