interface WhatKretrutoshMeansProps {
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  titlePart4: string;
  description: string;
  highlight: string;
}

const WhatKretrutoshMeans = ({
  titlePart1,
  titlePart2,
  titlePart3,
  titlePart4,
  description,
  highlight
}: WhatKretrutoshMeansProps) => {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {titlePart1} <span className="text-secondary">{titlePart2}</span>. {titlePart3} <span className="text-secondary">{titlePart4}</span>.
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-primary-foreground/90 leading-relaxed font-light">
            <p>
              {description}
            </p>
            <p className="font-medium text-secondary">
              {highlight}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatKretrutoshMeans;
