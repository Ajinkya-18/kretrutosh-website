import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Coming Soon
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            We are currently building this page to bring you the best experience. Stay tuned!
          </p>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
