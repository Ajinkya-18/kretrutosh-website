import { CheckCircle2 } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const Outcomes = () => {
  const { getText } = useContent('home');

  // We can fetch these as a JSON array string if we wanted, but for now individual keys is safer or just a hardcoded list that is editable via keys if needed.
  // However, the prompt says "fetch text/metrics".
  // Let's assume we use keys for each item to allow editing.
  const outcomes = [
    getText('outcomes.item1', 'Revenue Expansion +20–40%'),
    getText('outcomes.item2', 'Retention +12–25%'),
    getText('outcomes.item3', 'Net Revenue Retention (NRR) +10–25%'),
    getText('outcomes.item4', 'Annual Recurring Revenue (ARR) +20–45%'),
    getText('outcomes.item5', 'Sales Velocity ×2–5'),
    getText('outcomes.item6', 'Conversion Rate +15–30%'),
    getText('outcomes.item7', 'Drop-Off Reduction 15–22%'),
    getText('outcomes.item8', 'Customer Effort Score Reduction 20–30%'),
    getText('outcomes.item9', 'Customer Satisfaction +18–33%'),
    getText('outcomes.item10', 'Employee Engagement +12–18%')
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {getText('outcomes.title', 'Outcomes That Matter')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {getText('outcomes.description', "We don't just deliver strategies; we deliver measurable business impact.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
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
