import React from 'react';

// Helper to render text with auto-bullets and paragraphs
const renderSmartText = (text: string) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return; // Skip empty lines

    // Check for bullet markers (-, *, •)
    if (['-', '*', '•'].some(char => trimmed.startsWith(`${char} `))) {
      const content = trimmed.replace(/^[-*•]\s+/, '');
      currentList.push(<li key={`li-${index}`} className="mb-1">{content}</li>);
    } else {
      // If we were building a list, flush it now
      if (currentList.length > 0) {
        elements.push(<ul key={`ul-${index}`} className="list-disc pl-5 mb-4 text-left">{currentList}</ul>);
        currentList = [];
      }
      elements.push(<p key={`p-${index}`} className="mb-2 last:mb-0">{trimmed}</p>);
    }
  });

  // Flush remaining list items if any
  if (currentList.length > 0) {
    elements.push(<ul key="ul-last" className="list-disc pl-5 mb-0 text-left">{currentList}</ul>);
  }

  return elements;
};

export const PhilosophyBlock = ({ 
  kretruTitle = "Kretru (क्रेतृ)", 
  kretruDesc = "“the one who seeks” — Represents every customer, employee, user, or stakeholder who seeks clarity, trust, value, fairness, and meaningful experiences.",
  toshTitle = "Tosh (तोष)", 
  toshDesc = "“deep satisfaction, contentment, fulfillment” — Represents the business outcome when expectations are understood, aligned, delivered and exceeded.",
  thesis = "Growth happens when organizations align to human expectations—then deliver value, evidence, and outcomes with consistency and empathy."
}) => {
  return (
    <section className="py-20 bg-gray-50 text-[#0B1C3E]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            The Philosophy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            A Sanskrit-inspired worldview for business transformation
          </h2>
        </div>

        {/* The Two Pillars */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Kretru */}
          <div className="bg-white p-10 rounded-2xl border-t-4 border-[#FF9933] shadow-sm hover:shadow-md transition-all text-center">
            <h3 className="text-3xl font-bold mb-4 text-[#FF9933]">{kretruTitle}</h3>
            <div className="text-lg text-gray-600 leading-relaxed">
              {renderSmartText(kretruDesc)}
            </div>
          </div>

          {/* Tosh */}
          <div className="bg-white p-10 rounded-2xl border-t-4 border-[#0B1C3E] shadow-sm hover:shadow-md transition-all text-center">
            <h3 className="text-3xl font-bold mb-4 text-[#0B1C3E]">{toshTitle}</h3>
            <div className="text-lg text-gray-600 leading-relaxed">
               {renderSmartText(toshDesc)}
            </div>
          </div>
        </div>

        {/* The Core Thesis */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl md:text-2xl font-serif italic text-gray-700 leading-relaxed relative px-8">
            <span className="text-6xl text-gray-200 absolute -top-8 -left-4">“</span>
            {renderSmartText(thesis)}
            <span className="text-6xl text-gray-200 absolute -bottom-12 -right-4">”</span>
          </div>
          <p className="mt-8 text-sm font-semibold text-[#FF9933] uppercase tracking-wide">
            Core Thesis: Beyond Customer Satisfaction
          </p>
        </div>
      </div>
    </section>
  );
};