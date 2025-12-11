import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useContent } from "@/hooks/useContent";

const ContactForm = () => {
  const { getText } = useContent('contact');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success("Thank you! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="border-white/10 shadow-2xl backdrop-blur-md bg-white/5 text-white w-full animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-white">Send us a message</CardTitle>
        <CardDescription className="text-white/60">Fill out the form below and we'll get back to you shortly</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="How can we help?"
              className="bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us more about your inquiry..."
              className="min-h-[120px] bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary/20 transition-all"
            />
          </div>
          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all h-12" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : getText('form.btn', 'Send Message')}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;