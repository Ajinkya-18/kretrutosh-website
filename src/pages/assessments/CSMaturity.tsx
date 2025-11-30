import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import qrCode from "@/assets/qr-cs-maturity.jpg";
import { ExternalLink } from "lucide-react";

const CSMaturity = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* --- HEADER UPDATED --- */}
        <section className="py-24 pt-48 text-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CS Maturity Assessment
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up">
                Evaluate your Customer Success maturity and identify opportunities for improvement
              </p>
              <div className="bg-white p-8 rounded-lg shadow-elegant inline-block mb-8 animate-scale-in border border-border/50">
                <img src={qrCode} alt="CS Maturity Assessment QR Code" className="w-64 h-64 mx-auto" />
                <p className="mt-4 text-sm text-muted-foreground">Scan to take the assessment</p>
              </div>
              <div className="animate-fade-in">
                <Button size="lg" variant="premium" asChild>
                  <a
                    href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__oV7i3RUN1dFSTBQOTNDUEc3VjZMOUhHU0dOWTRYSi4u&origin=QRCode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Take Assessment Online
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CSMaturity;
