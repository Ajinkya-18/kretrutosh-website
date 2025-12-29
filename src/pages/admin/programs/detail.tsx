import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async"; // <--- Import
import { CtaBanner } from "../../../components/blocks/CtaBanner"; // <--- Import


export const ProgramDetail = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) console.error(error);
      else setProgram(data);
      setLoading(false);
    };

    fetchProgram();
  }, [slug]);

  if (loading) return <div className="py-32 text-center">Loading...</div>;
  if (!program) return <div className="py-32 text-center">Program not found</div>;

  const content = program.page_content || {};

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${program.title} | Transformation Programs`}</title>
        <meta name="description" content={program.short_description || "Accelerate growth with our transformation programs."} />
      </Helmet>
      {/* 1. HERO BLOCK */}
      <section className="bg-[#0B1C3E] text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.hero?.headline || program.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              {content.hero?.subhead || program.short_description}
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#E68A00] transition-colors"
            >
              {content.hero?.cta_text || "Book a Strategy Review"} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM BLOCK */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0B1C3E] mb-8">
              {content.problem?.title || `Why ${program.title} Fails`}
            </h2>
            <div className="prose prose-lg text-gray-600 whitespace-pre-wrap">
              {content.problem?.content}
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPROACH BLOCK */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#0B1C3E] mb-12 text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {content.approach?.map((step: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-[#0B1C3E] flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B1C3E] mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DELIVERABLES & OUTCOMES */}
      <section className="py-20 bg-[#0B1C3E] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Deliverables */}
            <div>
              <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">Key Deliverables</h3>
              <ul className="space-y-4">
                {content.deliverables?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="h-6 w-6 text-[#FF9933] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div>
              <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">Impact & Outcomes</h3>
              <ul className="space-y-4">
                {content.outcomes?.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="h-6 w-6 text-[#FF9933] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CASE STUDIES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0B1C3E] mb-12">Relevant Success Stories</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {content.case_studies?.map((cs: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-sm w-full">
                <div className="font-bold text-[#FF9933] text-2xl mb-2">{cs.metric}</div>
                <div className="text-gray-800 font-semibold">{cs.title}</div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-4 bg-[#0B1C3E] text-white font-semibold rounded-lg hover:bg-[#1a3a6c] transition-colors"
            >
                Explore All Case Studies
            </Link>
          </div>
        </div>
      </section>
      <CtaBanner 
        title={`Ready to start your ${program.title}?`}
        btnText="Schedule a Growth Strategy Review"
      />
    </div>
  );
};