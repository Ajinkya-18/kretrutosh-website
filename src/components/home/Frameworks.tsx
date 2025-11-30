import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Frameworks = () => {
  const frameworks = [
    { 
      name: "9Ps Framework", 
      desc: "Brand & experience orchestration model connecting Persona to Promotion.",
      metrics: "+15–25% conversion"
    },
    { 
      name: "EAR Framework", 
      desc: "Operationalizing Empathy: Engage, Acknowledge, Respond.",
      metrics: "+12–25% retention"
    },
    { 
      name: "Persona–Product–Pitch", 
      desc: "Aligning message to customer segment for GTM velocity.",
      metrics: "+15–25% cross/upsell"
    },
    { 
      name: "CX Maturity Framework", 
      desc: "Diagnostic model measuring CX readiness across 8 dimensions.",
      metrics: "+15–20 pp NPS uplift"
    },
    { 
      name: "Expectation Management (EMM)", 
      desc: "Mapping customer expectations to organizational delivery.",
      metrics: "+10–15% CSAT"
    },
    { 
      name: "H.A.N.D.™ Framework", 
      desc: "Humanized–Aligned–Nimble–Data-backed culture transformation.",
      metrics: "eNPS +10–15 pp"
    },
    { 
      name: "Customer Lifecycle Heatmap", 
      desc: "Identifying renewal risk and expansion zones.",
      metrics: "+10–20% NRR"
    },
    { 
      name: "V.I.C.T.O.R.Y.™ Framework", 
      desc: "Transforming Customer Success into a revenue center.",
      metrics: "+20–40% expansion"
    },
    { 
      name: "Value Realization Map (VRM)", 
      desc: "Linking CX/CS initiatives to measurable business KPIs.",
      metrics: "+23–28% adoption"
    },
    { 
      name: "CX ROI Calculator", 
      desc: "Converting experience metrics into financial impact.",
      metrics: "+12–18% CX ROI"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Signature Proprietary Frameworks
            </h2>
            <p className="text-lg text-muted-foreground">
              Our battle-tested methodologies for driving predictable growth.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary/20 hover:bg-primary/5">
            <Link to="/frameworks">
              View All Frameworks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {frameworks.map((fw, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border border-border/50 hover:border-secondary hover:shadow-lg transition-all cursor-pointer group flex flex-col h-full">
              <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors text-lg leading-tight">{fw.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{fw.desc}</p>
              <div className="pt-3 border-t border-border/50">
                <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                  {fw.metrics}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frameworks;
