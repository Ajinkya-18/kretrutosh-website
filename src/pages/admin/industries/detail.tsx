import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { ArrowRight, CheckCircle2, AlertTriangle, Layers, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async"; // <--- Import
import { CtaBanner } from "../../../components/blocks/CtaBanner"; // <--- Import

const renderAsList = (text: string, icon: any) => {
  if (!text) return null;
  
  // Split by New Line OR Comma (handling both styles of input)
  // This regex splits on \n or ,
  const items = text.split(/\r?\n|,/).map(t => t.trim()).filter(Boolean);

  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
           {/* Render the passed icon (like a checkmark) */}
           <span className="shrink-0 mt-0.5 text-[#FF9933]">{icon}</span>
           <span>{item.replace(/^-|\•/, '').trim()}</span> {/* Removes existing bullet chars if user typed them */}
        </li>
      ))}
    </ul>
  );
};

export const IndustryDetail = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!slug) return;
      const { data, error } = await supabase.from('industries').select('*').eq('slug', slug).maybeSingle();
      if (data) setIndustry(data);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!industry) return <div className="py-20 text-center">Industry not found</div>;

  const content = industry.page_content || {};

  return (
    <div className="min-h-screen bg-white">
        <Helmet>
        <title>{`${industry.title} Consulting | KretruTosh`}</title>
        <meta name="description" content={industry.short_description || `Transformation solutions for ${industry.title}.`} />
      </Helmet>
      
      {/* 1. HERO */}
      <section className="bg-[#0B1C3E] text-white py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{content.hero?.title || industry.title}</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                {content.hero?.subhead || industry.short_description}
            </p>
            <Link 
                to={content.hero?.cta_link || "/contact"} // <--- USE DYNAMIC LINK
                className="inline-flex items-center px-8 py-4 bg-[#FF9933] text-white font-bold rounded-lg hover:bg-[#E68A00] transition-colors"
            >
                {content.hero?.cta_text || "Book a Strategy Review"} 
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
        </div>
      </section>

      {/* 2. CHALLENGES / GAPS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#0B1C3E] mb-6 text-center">Why It's Broken</h2>
            {content.challenges?.intro && <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{content.challenges.intro}</p>}
            
            <div className="grid md:grid-cols-2 gap-8">
                {content.challenges?.list?.map((gap: any, idx: number) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                        <div className="flex items-start gap-3 mb-3">
                            <AlertTriangle className="text-red-500 shrink-0" size={24} />
                            <h3 className="font-bold text-lg text-[#0B1C3E]">{gap.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed pl-9 whitespace-pre-wrap">
                            {gap.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. TRANSFORMATION APPROACH */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#0B1C3E] mb-6 text-center">How We Transform This</h2>
            {content.approach?.intro && <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{content.approach.intro}</p>}

            <div className="space-y-8">
                {content.approach?.list?.map((step: any, idx: number) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-6 p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <div className="shrink-0">
                            <div className="w-12 h-12 bg-[#0B1C3E] text-white rounded-full flex items-center justify-center font-bold text-xl">
                                {idx + 1}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#0B1C3E] mb-2">{step.title}</h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. CASES & FRAMEWORKS */}
      <section className="py-20 bg-[#0B1C3E] text-white">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                
                {/* Frameworks */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <Layers className="text-[#FF9933]" /> Relevant Frameworks
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {content.frameworks?.map((fw: string, idx: number) => (
                            <span key={idx} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/10">
                                {fw}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Real Cases */}
                <div>
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <TrendingUp className="text-[#FF9933]" /> Proven Outcomes
                    </h3>
                    <div className="space-y-6">
                        {content.real_cases?.map((c: any, idx: number) => (
                            <div key={idx} className="border-l-4 border-[#FF9933] pl-4">
                                <div className="font-bold text-lg mb-1">{c.client}</div>
                                {/* <p className="text-gray-400 text-sm">{c.outcomes}</p> */}
                                <div className="mt-2">
                                    {renderAsList(c.outcomes, <CheckCircle2 size={16} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Case */}
            {content.feature_case && (
                <div className="mt-20 bg-white text-[#0B1C3E] p-8 md:p-12 rounded-2xl shadow-xl max-w-4xl mx-auto">
                    <div className="uppercase tracking-widest text-xs font-bold text-gray-400 mb-4">Featured Case Study</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">{content.feature_case.title}</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="font-bold text-red-600 mb-2">The Problem</div>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{content.feature_case.problem}</p>
                        </div>
                        <div>
                            <div className="font-bold text-blue-600 mb-2">Our Approach</div>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{content.feature_case.approach}</p>
                        </div>
                        <div>
                            <div className="font-bold text-green-600 mb-2">The Outcome</div>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{content.feature_case.outcome}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </section>
      <CtaBanner 
        title={`Accelerate Growth in ${industry.title}`}
        btnText="Book a Strategy Review"
      />
    </div>
  );
};