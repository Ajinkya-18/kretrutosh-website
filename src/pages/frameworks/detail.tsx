import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async"; // <--- 1. Import Helmet
import { CtaBanner } from "../../components/blocks/CtaBanner";


export default function FrameworkDetail() {
  const { slug } = useParams();
  const [framework, setFramework] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('frameworks')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) console.error(error);
      else setFramework(data);
      setLoading(false);
    };

    fetchDetail();
  }, [slug]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!framework) return <div className="py-20 text-center">Framework not found</div>;

  const content = framework.page_content || {};

  return (
    <div className="min-h-screen bg-white">
        <Helmet>
            <title>{`${framework.title} | KretruTosh Frameworks`}</title>
            <meta name="description" content={framework.short_description || "Proprietary consulting framework."} />
        </Helmet>
      {/* 1. HERO */}
      <section className="bg-[#0B1C3E] text-white py-20">
        <div className="container mx-auto px-4">
            <Link to="/frameworks" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Frameworks
            </Link>
            <div className="max-w-4xl">
                <div className="inline-block px-3 py-1 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 text-[#FF9933] font-medium text-xs tracking-wide uppercase mb-6">
                  Proprietary Framework
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">{framework.title}</h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
                    {content.hero?.subhead || framework.short_description}
                </p>
                <div className="mt-8">
                    <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#E68A00] transition-colors">
                        {content.hero?.cta_text || "Implement This Framework"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (What This Solves) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-[#0B1C3E] mb-8 text-center">What This Framework Solves</h2>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                    {content.problems?.map((prob: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#FF9933] mt-2.5 shrink-0" />
                            <p className="text-lg text-gray-700">{prob}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 3. THE MODEL (Dimensions & Visual) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-[#0B1C3E] mb-8">The Model Dimensions</h2>
                    <ul className="space-y-4">
                        {content.model?.dimensions?.map((dim: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0B1C3E] text-white font-bold text-sm">
                                    {idx + 1}
                                </span>
                                <span className="text-lg font-medium text-gray-800">{dim}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {content.model?.image && (
                    <div className="flex-1">
                        <img src={content.model.image} alt={framework.title + " Model"} className="rounded-xl shadow-lg w-full" />
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-[#0B1C3E] text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {content.process?.map((step: any, idx: number) => (
                    <div key={idx} className="bg-white/5 p-8 rounded-xl border border-white/10">
                        <div className="text-4xl font-bold text-[#FF9933] mb-4">0{idx + 1}</div>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. IMPACT & CASES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <h3 className="text-2xl font-bold text-[#0B1C3E] mb-8">Business Impact</h3>
                    <ul className="space-y-4">
                        {content.impact?.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-[#FF9933] shrink-0" />
                                <span className="text-lg text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[#0B1C3E] mb-8">Case Examples</h3>
                    <div className="space-y-6">
                        {content.cases?.map((c: any, idx: number) => (
                            <div key={idx} className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#FF9933]">
                                <div className="font-bold text-[#0B1C3E] mb-1">{c.title}</div>
                                <div className="text-[#FF9933] font-bold text-lg">{c.outcome}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>
      <CtaBanner 
        title="Ready to implement this framework?" 
        btnText="Book a Strategy Session" 
      />
    </div>
  );
}