const WhatKretrutoshMeans = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Kretru = <span className="text-secondary">Customer</span>. Tosh = <span className="text-secondary">Delight</span>.
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-primary-foreground/90 leading-relaxed font-light">
            <p>
              KretruTosh represents an approach where organizations redesign their Go-To-Market, Customer Experience, Customer Success, Digital journeys and internal Culture so that customer expectations are understood, aligned, delivered, measured, and continuously enhanced.
            </p>
            <p className="font-medium text-secondary">
              This is not CX as a function — this is customer-led business transformation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatKretrutoshMeans;
