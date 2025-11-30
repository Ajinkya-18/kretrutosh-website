import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Cpu, Database, Network, MessageSquare, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DigitalAI = () => {
  const components = [
    {
      icon: <MessageSquare className="h-6 w-6 text-secondary" />,
      title: "CXM Platform Implementation",
      desc: "Implement and optimize NPS, CSAT, and VOC platforms."
    },
    {
      icon: <Database className="h-6 w-6 text-secondary" />,
      title: "Customer 360 & CDP Architecture",
      desc: "Unified customer data architecture for a single source of truth."
    },
    {
      icon: <Network className="h-6 w-6 text-secondary" />,
      title: "Journey Orchestration & Automation",
      desc: "Automate personalized experiences across channels."
    },
    {
      icon: <Cpu className="h-6 w-6 text-secondary" />,
      title: "AI Predictive Insights",
      desc: "Leverage AI to predict churn, expansion, and sentiment."
    },
    {
      icon: <LineChart className="h-6 w-6 text-secondary" />,
      title: "Feedback Loop Entrenchment",
      desc: "Systemize the flow of customer insights into product and strategy."
    }
  ];

  const outcomes = [
    "Platform Adoption +23–28%",
    "Insight-to-Action +25–30%",
    "Unified Data Truth",
    "Predictive Churn Alerts",
    "Automated Personalization"
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
              <span className="text-secondary font-medium text-sm tracking-wide uppercase">Transformation Program</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Digital & AI <span className="text-secondary">Enablement</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Empower your teams with unified data, AI-driven insights, and seamless digital platforms.
            </p>
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6">
              <Link to="/contact">
                Book a Strategy Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Key Components Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Program Components</h2>
            <p className="text-muted-foreground text-lg">
              Bridging the gap between strategy and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {components.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl border border-border/50 hover:shadow-lg hover:border-secondary/50 transition-all group"
              >
                <div className="mb-6 p-4 bg-primary/5 rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Measurable Business Impact
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Turn data into your most valuable asset. We help you move from "data-rich, insight-poor" to "predictive and proactive."
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                    <span className="font-medium text-primary">{outcome}</span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 mt-4">
                <Link to="/case-studies">View Success Stories</Link>
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative z-10 bg-card p-8 rounded-2xl shadow-2xl border border-border/50 max-w-xs mx-auto">
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Platform Adoption</p>
                      <p className="text-3xl font-bold text-primary">85%</p>
                    </div>
                    <div className="text-green-500 font-medium text-sm">High Usage</div>
                  </div>
                  <div className="flex justify-between items-end border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Insight-to-Action</p>
                      <p className="text-3xl font-bold text-primary">3x</p>
                    </div>
                    <div className="text-green-500 font-medium text-sm">Faster</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground">Data Accuracy</p>
                      <p className="text-3xl font-bold text-primary">99.9%</p>
                    </div>
                    <div className="text-green-500 font-medium text-sm">Reliable</div>
                  </div>
                </div>
              </div>
              {/* Decorative background elements */}
              <div className="absolute top-10 -right-10 w-full h-full bg-secondary/10 rounded-2xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalAI;
