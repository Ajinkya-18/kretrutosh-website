import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, BarChart, RefreshCw, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CustomerSuccess = () => {
  const components = [
    {
      icon: <BarChart className="h-6 w-6 text-secondary" />,
      title: "CS Maturity Model Implementation",
      desc: "Assess and elevate your Customer Success capabilities."
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: "Segmentation & Engagement Models",
      desc: "Tailored engagement models for High-Touch to Tech-Touch."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-secondary" />,
      title: "Onboarding & Adoption Acceleration",
      desc: "Accelerate Time-to-Value and drive product stickiness."
    },
    {
      icon: <Heart className="h-6 w-6 text-secondary" />,
      title: "Health Scoring & Risk Management",
      desc: "Predictive indicators to proactively manage churn risk."
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-secondary" />,
      title: "Renewal & Expansion Playbooks",
      desc: "Playbooks to secure renewals and drive upsell/cross-sell."
    }
  ];

  const outcomes = [
    "Retention Rate +12–25%",
    "NRR +10–25%",
    "Churn Reduction 20–35%",
    "Higher Advocacy & Referrals",
    "Increased LTV"
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
              Customer Success <span className="text-secondary">& Post-Sales</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Maximize retention, drive expansion, and turn customers into advocates with a proactive Success engine.
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
              Building a robust post-sales ecosystem for sustainable growth.
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
                Shift from reactive support to proactive success, unlocking significant revenue from your existing customer base.
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
                      <p className="text-sm text-muted-foreground">Net Revenue Retention</p>
                      <p className="text-3xl font-bold text-primary">125%</p>
                    </div>
                    <div className="text-green-500 font-medium text-sm">Best-in-Class</div>
                  </div>
                  <div className="flex justify-between items-end border-b border-border pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Churn Rate</p>
                      <p className="text-3xl font-bold text-primary">&lt;5%</p>
                    </div>
                    <div className="text-green-500 font-medium text-sm">Significant Drop</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground">Expansion Rev.</p>
                      <p className="text-3xl font-bold text-primary">+40%</p>
                    </div>
                    <div className="text-green-500 font-medium text-sm">Growth</div>
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

export default CustomerSuccess;
