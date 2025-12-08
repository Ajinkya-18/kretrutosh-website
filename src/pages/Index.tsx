import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";

// Homepage Sections
import AgeOfKretru from "@/components/home/AgeOfKretru";
import WhatKretrutoshMeans from "@/components/home/WhatKretrutoshMeans";
import GrowthEngine from "@/components/home/GrowthEngine";
import Outcomes from "@/components/home/Outcomes";
import Frameworks from "@/components/home/Frameworks";
import ClientLogos from "@/components/home/ClientLogos";
import CaseStudies from "@/components/home/CaseStudies";
import ThoughtLeadership from "@/components/home/ThoughtLeadership";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getText } = useContent('home');

  useEffect(() => {
    // Check if we were navigated here with a request to scroll
    if (location.state?.scrollTo === 'contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        // Scroll to the contact section smoothly
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Optional: clear the state so it doesn't re-trigger on refresh
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <Hero 
          badge={getText('hero.badge', 'The Premier Growth Transformation Firm')}
          title={getText('hero.title', 'Build a Customer-Led Growth Engine That Scales')}
          subtitle={getText('hero.subtitle', 'Integrated Go-To-Market (GTM), Customer Experience, Customer Success, Digital, AI & Culture Transformation — driving predictable, scalable growth across the customer lifecycle.')}
          primaryCta={getText('hero.primary_cta', 'Book a Growth Strategy Review')}
          secondaryCta={getText('hero.secondary_cta', 'Explore Transformation Programs')}
        />
        
        <WhatKretrutoshMeans 
          titlePart1={getText('meaning.title_part1', 'Kretru = ')}
          titlePart2={getText('meaning.title_part2', 'Customer')}
          titlePart3={getText('meaning.title_part3', 'Tosh = ')}
          titlePart4={getText('meaning.title_part4', 'Delight')}
          description={getText('meaning.copy', 'KretruTosh represents an approach where organizations redesign their Go-To-Market, Customer Experience, Customer Success, Digital journeys and internal Culture so that customer expectations are understood, aligned, delivered, measured, and continuously enhanced.')}
          highlight={getText('meaning.tagline', 'This is not CX as a function — this is customer-led business transformation.')}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GrowthEngine 
             title={getText('pillars.title', 'One Engine. Five Motions. Infinite Growth.')}
             subtitle={getText('pillars.subtitle', 'Your GTM Velocity model has three lifecycle pillars (Pre-Sales, Sales, Post-Sales) and two enabling horizontals (Digital Enablement and Culture Transformation). All five together create sustainable, scalable growth.')}
             getText={getText}
          />
        </motion.div>

        <ClientLogos />

        <Outcomes 
          title={getText('outcomes.title', 'Outcomes That Matter')}
          description={getText('outcomes.description', "We don't just deliver strategies; we deliver measurable business impact.")}
          items={[
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
          ]}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Frameworks />
        </motion.div>


        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CaseStudies />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AgeOfKretru 
            badge={getText('age_of_kretru.badge', 'New Release')}
            title={getText('age_of_kretru.title', 'Beyond Customer Satisfaction:')}
            subtitle={getText('age_of_kretru.subtitle', 'The Age of Kretru')}
            quote={getText('age_of_kretru.quote', '“Customer satisfaction is not the goal. Expectation Fulfilment is. And expectation fulfilment is what unlocks retention, revenue, trust, and advocacy.”')}
            description={getText('age_of_kretru.copy', '<span class="font-bold text-primary">Kretru (Customer) + Tosh (Delight) =</span> <br /> A philosophy where expectation, experience & economics converge.')}
            bookLink={getText('age_of_kretru.book_link', 'https://www.amazon.in/dp/B0D17W5B1B')}
            ctaText={getText('age_of_kretru.book_cta', 'Read the Book → Amazon')}
          />
        </motion.div>

        <ThoughtLeadership />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FinalCTA 
            title={getText('final_cta.title', 'Ready to Transform Your Growth Trajectory?')}
            subtitle={getText('final_cta.subtitle', "Let's build your customer-led growth engine together.")}
            primaryBtn={getText('final_cta.button', 'Schedule a Consultation')}
            secondaryBtn={getText('final_cta.secondary_btn', 'Explore Services')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ContactForm />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
