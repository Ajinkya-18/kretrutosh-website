import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, TrendingUp, BookOpen, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bookCover from "@/assets/book-cover.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                About Ashutosh Karandikar
              </h1>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up">
                <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg backdrop-blur-sm border border-accent/20 transition-all hover:bg-accent/20">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-semibold">CCXP CERTIFIED</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg backdrop-blur-sm border border-accent/20 transition-all hover:bg-accent/20">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-semibold">IIMB Customer Experience Professional</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-bold mb-6">20+ Years of Global Consulting & Business Transformation Experience</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: '0.1s' }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        Revenue Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">$80m+</p>
                      <p className="text-muted-foreground">Revenue Unlocked</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        Sales Velocity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">2-5x</p>
                      <p className="text-muted-foreground">Growth Delivered</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: '0.3s' }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <Award className="h-6 w-6" />
                        Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">360°</p>
                      <p className="text-muted-foreground">Leadership Expertise</p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-bold mb-4">Unique Expertise</h3>
                <ul className="space-y-3 mb-8">
                  <li>✓ Unique 360-degree leadership experience across Strategy, Consulting, Sales, Marketing, Customer Success, Operations, and Brand/Product Management</li>
                  <li>✓ Proprietary frameworks on CX/CRM/CS Strategy & Transformation, Brand Promise Architecture, Culture Assessment & Transformation, and many more</li>
                  <li>✓ Proven track record transforming key brands through CX, EX/Culture, Digital, and GTM/Product specific interventions</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4">Key Brands Transformed</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {["Alida", "AsBPI", "Suyati", "SYMEGA", "Beyond Truth in Action", "A Milestone Company", "Circles.Life", "AccelerateNext", "C Customer", "InLife", "DiClicks", "KraftHeinz", "Value Retail", "Altudo", "Insular Life", "Pharmacy"].map((brand) => (
                    <div key={brand} className="p-3 bg-muted rounded-lg text-sm font-medium">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Section */}
              <div className="mt-16 p-8 bg-gradient-to-br from-accent/10 to-primary/5 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl font-bold">Published Book</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <img 
                      src={bookCover} 
                      alt="Beyond Customer Satisfaction Book Cover" 
                      className="rounded-lg shadow-xl w-full max-w-xs hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/book")}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-2xl font-bold">Beyond Customer Satisfaction</h4>
                    <p className="text-xl italic text-muted-foreground">
                      Crafting Exceptional Customer Experiences in the Age of "Kretru"
                    </p>
                    <p className="text-lg">
                      Explore innovative frameworks and strategies for creating exceptional customer experiences, backed by over 20 years of global consulting expertise.
                    </p>
                    <div className="inline-block px-4 py-2 bg-accent/20 rounded-lg border border-accent/30 mb-4">
                      <p className="text-xl font-bold text-accent">Now FREE on Amazon</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => navigate("/book")}
                      >
                        Learn More
                        <BookOpen className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                      >
                        <a 
                          href="https://www.amazon.in/dp/B0D17W5B1B" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Download from Amazon
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
