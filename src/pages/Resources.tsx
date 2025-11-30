import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Mic, FileText, ArrowRight, Video } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Resources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "The Book",
      subtitle: "Beyond Customer Satisfaction",
      desc: "Our founder's definitive guide to crafting exceptional customer experiences in the age of 'Kretru'.",
      icon: <BookOpen className="h-8 w-8 text-secondary" />,
      link: "/book",
      cta: "Read Chapter 1"
    },
    {
      title: "The XT Podcast",
      subtitle: "Experience Transformation",
      desc: "Deep dives into GTM, CX, and Culture with industry leaders and practitioners.",
      icon: <Mic className="h-8 w-8 text-secondary" />,
      link: "/videos", // Assuming Videos page hosts the podcast/video content
      cta: "Listen Now"
    },
    {
      title: "Articles & Insights",
      subtitle: "Thought Leadership",
      desc: "Actionable frameworks, case studies, and perspectives on the latest trends in business transformation.",
      icon: <FileText className="h-8 w-8 text-secondary" />,
      link: "/blogs",
      cta: "Read Articles"
    },
    {
      title: "Whitepapers",
      subtitle: "Deep Research",
      desc: "Comprehensive reports and maturity models to benchmark your organization's performance.",
      icon: <FileText className="h-8 w-8 text-secondary" />,
      link: "/resources/whitepapers", // Placeholder for now
      cta: "Download Reports"
    }
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
              <span className="text-secondary font-medium text-sm tracking-wide uppercase">Knowledge Hub</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Resources & <span className="text-secondary">Insights</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Tools, frameworks, and perspectives to fuel your growth journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl border border-border/50 hover:shadow-lg hover:border-secondary/50 transition-all group flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <div className="bg-secondary/10 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-secondary uppercase">{item.subtitle}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                
                <Button asChild variant="outline" className="w-fit border-primary/20 hover:bg-primary/5 group-hover:border-secondary/50">
                  <Link to={item.link}>
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
