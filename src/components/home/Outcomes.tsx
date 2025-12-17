import { CheckCircle2 } from "lucide-react";

interface Outcome {
  id: number;
  title: string;
  icon?: string;
}

interface OutcomesProps {
  title: string;
  description: string;
  outcomes: Outcome[];
  gridClass?: string;
}

const Outcomes = ({ title, description, outcomes, gridClass }: OutcomesProps) => {
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

        <div className={`grid gap-6 max-w-7xl mx-auto ${gridClass || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'}`}>
          {outcomes && outcomes.length > 0 ? (
            outcomes.map((outcome) => (
              <div key={outcome.id} className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-secondary/50 group">
                <CheckCircle2 className="h-6 w-6 text-secondary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium text-primary">{outcome.title}</span>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-12 bg-red-500/10 border-2 border-red-500 rounded-xl">
              <p className="text-red-500 font-mono text-lg font-bold">NULL: No outcomes configured</p>
              <p className="text-red-400 text-sm mt-2">Please add outcomes in the Admin Panel</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
