import { Target, TrendingUp, Users, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Motion {
  icon: any; 
  title: string;
  description: string;
  link: string;
}

interface GrowthEngineProps {
  title: string;
  subtitle: string;
  motions?: Motion[]; 
  gridClass?: string;
  getText: (key: string, defaultText: string) => string;
}

const GrowthEngine = ({ title, subtitle, motions: propMotions, gridClass, getText }: GrowthEngineProps) => {
  // Fallback to hardcoded if no props provided (for safe transition)
  const defaultMotions = [
    {
      icon: <Target className="h-8 w-8 text-secondary" />,
      title: getText('growth_engine.motion1.title', 'Pre-Sales Transformation'),
      description: getText('growth_engine.motion1.desc', 'Aligning brand purpose with market needs.'),
      link: "/services/pre-sales"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: getText('growth_engine.motion2.title', 'Sales Velocity'),
      description: getText('growth_engine.motion2.desc', 'Accelerating acquisition and conversion.'),
      link: "/services/sales-velocity"
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: getText('growth_engine.motion3.title', 'Customer Success'),
      description: getText('growth_engine.motion3.desc', 'Driving retention and expansion.'),
      link: "/services/customer-success"
    },
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: getText('growth_engine.motion4.title', 'Digital & AI Enablement'),
      description: getText('growth_engine.motion4.desc', 'Empowering teams with unified data.'),
      link: "/services/digital-ai"
    },
    {
      icon: <Heart className="h-8 w-8 text-secondary" />,
      title: getText('growth_engine.motion5.title', 'Culture Transformation'),
      description: getText('growth_engine.motion5.desc', 'Building a customer-centric DNA.'),
      link: "/services/culture-transformation"
    }
  ];

  const motions = propMotions || defaultMotions;

  // Helper to get icon component if passed as string names from JSON
  const getIcon = (icon: any) => {
    if (typeof icon !== 'string') return icon;
    const icons: any = { Target: <Target className="h-8 w-8 text-secondary" />, TrendingUp: <TrendingUp className="h-8 w-8 text-secondary" />, Users: <Users className="h-8 w-8 text-secondary" />, Zap: <Zap className="h-8 w-8 text-secondary" />, Heart: <Heart className="h-8 w-8 text-secondary" /> };
    return icons[icon] || <Target className="h-8 w-8 text-secondary" />;
  };

  return (
    <section id="growth-engine" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className={`grid gap-6 ${gridClass || 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'}`}>
          {motions.map((motion, index) => (
            <Link 
              key={index} 
              to={motion.link}
              className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center group block h-full"
            >
              <div className="mb-4 inline-flex p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                {getIcon(motion.icon)}
              </div>
              <h3 className="font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">{motion.title}</h3>
              <p className="text-sm text-muted-foreground">{motion.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthEngine;
