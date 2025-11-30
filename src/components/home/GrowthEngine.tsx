import { Target, TrendingUp, Users, Zap, Heart } from "lucide-react";

const GrowthEngine = () => {
  const motions = [
    {
      icon: <Target className="h-8 w-8 text-secondary" />,
      title: "Pre-Sales Transformation",
      description: "Aligning brand purpose with market needs."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: "Sales Velocity",
      description: "Accelerating acquisition and conversion."
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Customer Success",
      description: "Driving retention and expansion."
    },
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: "Digital & AI Enablement",
      description: "Empowering teams with unified data."
    },
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: "Culture Transformation",
      description: "Building a customer-centric DNA."
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            One Engine. Five Motions. Infinite Growth.
          </h2>
          <p className="text-lg text-muted-foreground">
            Your GTM Velocity model has three lifecycle pillars (Pre-Sales, Sales, Post-Sales) and two enabling horizontals (Digital Enablement and Culture Transformation). All five together create sustainable, scalable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {motions.map((motion, index) => (
            <div key={index} className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center group">
              <div className="mb-4 inline-flex p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                {motion.icon}
              </div>
              <h3 className="font-semibold text-primary mb-2">{motion.title}</h3>
              <p className="text-sm text-muted-foreground">{motion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthEngine;
