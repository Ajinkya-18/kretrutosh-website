import { Link } from 'react-router-dom';
import { BookOpen, Mic, ClipboardCheck, FileText, ArrowRight, Newspaper } from 'lucide-react';

interface ResourceHubProps {
  title?: string;
  book_link?: string;
  podcast_link?: string;
  assessment_link?: string;
  whitepaper_link?: string;
  article_link?: string; // New Prop
}

export const ResourceHub = ({ 
  title = "Thought Leadership Hub",
  book_link = "/book",
  podcast_link = "/resources/podcast",
  assessment_link = "/resources/assessments",
  whitepaper_link = "/resources/whitepapers",
  article_link = "/resources/articles"
}: ResourceHubProps) => {
  
  const tiles = [
    { icon: BookOpen, title: "Beyond Customer Satisfaction", desc: "Read the book that defined the Age of Kretru.", cta: "Read on Amazon", link: book_link },
    { icon: Mic, title: "The XT Podcast", desc: "Deep dives into GTM velocity with industry leaders.", cta: "Watch Episodes", link: podcast_link },
    { icon: Newspaper, title: "Articles & Insights", desc: "Latest thoughts on GTM, Culture, and CX.", cta: "Read Articles", link: article_link }, // New Tile
    { icon: ClipboardCheck, title: "Maturity Assessments", desc: "Benchmark your CX, CS, and Culture maturity.", cta: "Start Assessment", link: assessment_link },
    { icon: FileText, title: "Whitepapers & Guides", desc: "Tactical guides and frameworks for execution.", cta: "Download PDFs", link: whitepaper_link },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0B1C3E] mb-12 text-center">{title}</h2>
        {/* Adjusted grid to auto-fit centered items */}
        <div className="flex flex-wrap justify-center gap-6">
          {tiles.map((tile, idx) => (
            <div key={idx} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white p-8 rounded-xl border border-gray-200 hover:border-[#FF9933] hover:shadow-lg transition-all group flex flex-col items-start">
                <div className="p-3 bg-blue-50 text-[#0B1C3E] rounded-lg mb-6 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
                    <tile.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0B1C3E] mb-2">{tile.title}</h3>
                <p className="text-gray-600 mb-6 text-sm flex-grow">{tile.desc}</p>
                <Link to={tile.link} className="inline-flex items-center font-bold text-[#0B1C3E] hover:text-[#FF9933] text-sm uppercase tracking-wide">
                    {tile.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};