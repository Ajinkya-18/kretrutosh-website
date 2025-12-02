import { CheckCircle2 } from "lucide-react";

interface OutcomesProps {
  title: string;
  description: string;
  items: string[];
}

const Outcomes = ({ title, description, items }: OutcomesProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {items.map((outcome, index) => (
            <div key={index} className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-secondary/50 group">
              <CheckCircle2 className="h-6 w-6 text-secondary shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium text-primary">{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
