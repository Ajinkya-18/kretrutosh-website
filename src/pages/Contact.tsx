import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Calendar, Linkedin, Youtube } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const Contact = () => {
  const { getText } = useContent('contact');

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm mb-6">
            <span className="text-secondary font-medium text-sm tracking-wide uppercase">
              {getText('hero.badge', 'Get in Touch')}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {getText('hero.title', "Let's Accelerate Your Growth")}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            {getText('hero.subtitle', "Ready to transform your GTM...")}
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Calendly */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">{getText('info.title', 'Contact Information')}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <Mail className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{getText('info.email_label', 'Email Us')}</h3>
                      <p className="text-muted-foreground">{getText('info.email_val_1', 'karandikar.ashutosh@gmail.com')}</p>
                      <p className="text-muted-foreground">{getText('info.email_val_2', 'consult.ashutosh@kretru.com')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{getText('info.call_label', 'Call Us')}</h3>
                      <p className="text-muted-foreground">{getText('info.call_val', '+91 95913 87838')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <MapPin className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{getText('info.loc_label', 'Location')}</h3>
                      <p className="text-muted-foreground">{getText('info.loc_val_1', 'Mumbai, Maharashtra, India')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-secondary/5 border border-secondary/20 rounded-2xl">
                <h2 className="text-2xl font-bold text-primary mb-4">{getText('strategy.title', 'Book a Strategy Review')}</h2>
                <p className="text-muted-foreground mb-6">
                  {getText('strategy.desc', 'Schedule a direct 30-minute consultation...')}
                </p>
                <Button asChild size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  <a href="https://calendly.com/consult-ashutosh/1-1-with-ashutosh" target="_blank" rel="noopener noreferrer">
                    <Calendar className="h-5 w-5" />
                    {getText('strategy.btn', 'Schedule via Calendly')}
                  </a>
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4">{getText('social.title', 'Connect on Social')}</h3>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/ashutosh-karandikar-ccxp/" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors">
                    <Linkedin className="h-6 w-6 text-[#0077b5]" />
                  </a>
                  <a href="https://www.youtube.com/@theXTPodcast" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors">
                    <Youtube className="h-6 w-6 text-[#ff0000]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;