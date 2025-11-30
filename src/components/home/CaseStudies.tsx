import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CaseStudies = () => {
  const cases = [
    {
      title: "Retail Transformation",
      metric: "+31% Like-for-Like Sales",
      desc: "Driving store performance through customer experience optimization.",
      tag: "Retail"
    },
    {
      title: "Insurance Optimization",
      metric: "Drop-off reduced to 57.6%",
      desc: "Improving quote-to-issue conversion by reducing friction (from 61.8%).",
      tag: "Insurance"
    },
    {
      title: "Technology Growth",
      metric: "+22% Cross-Sell Conversion",
      desc: "Accelerating expansion revenue through targeted GTM strategies.",
      tag: "Technology"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Real Impact, Real Growth
            </h2>
            <p className="text-lg text-muted-foreground">
              See how we've helped organizations transform their trajectory.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary/20 hover:bg-primary/5">
            <Link to="/case-studies">
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {cases.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-secondary/50">
              <CardHeader className="pb-2">
                <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">{item.tag}</div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">{item.metric}</div>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
