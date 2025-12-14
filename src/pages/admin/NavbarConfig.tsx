import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NavbarConfigAdmin = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('config_navbar')
      .select('*')
      .single();

    if (error) {
      console.error("Error fetching navbar config:", error);
      setMessage({ type: 'error', text: error.message });
    } else {
      setConfig(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from('config_navbar')
      .update({
        logo_url: config.logo_url,
        cta_text: config.cta_text,
        cta_link: config.cta_link,
      })
      .eq('id', config.id);

    if (error) {
      setMessage({ type: 'error', text: `Save failed: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Navbar configuration saved successfully!' });
    }
    setSaving(false);
  };

  const handleChange = (field: string, value: string) => {
    setConfig({ ...config, [field]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-2">Navbar Configuration</h1>
          <p className="text-muted-foreground mb-8">
            Update the navbar logo, CTA button text and link
          </p>

          {message && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Navbar Settings</CardTitle>
              <CardDescription>
                Changes will reflect immediately on the website after saving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Logo URL */}
                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    type="url"
                    value={config?.logo_url || ''}
                    onChange={(e) => handleChange('logo_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-sm text-muted-foreground">
                    Full URL to the logo image (e.g., from Supabase Storage)
                  </p>
                </div>

                {/* CTA Text */}
                <div className="space-y-2">
                  <Label htmlFor="cta_text">CTA Button Text</Label>
                  <Input
                    id="cta_text"
                    type="text"
                    value={config?.cta_text || ''}
                    onChange={(e) => handleChange('cta_text', e.target.value)}
                    placeholder="Schedule Consultation"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Text displayed on the call-to-action button
                  </p>
                </div>

                {/* CTA Link */}
                <div className="space-y-2">
                  <Label htmlFor="cta_link">CTA Button Link</Label>
                  <Input
                    id="cta_link"
                    type="text"
                    value={config?.cta_link || ''}
                    onChange={(e) => handleChange('cta_link', e.target.value)}
                    placeholder="/contact"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    URL or path the button links to (e.g., /contact or external URL)
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="w-full"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview Section */}
          {config && (
            <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Logo:</span>{' '}
                  {config.logo_url ? (
                    <img src={config.logo_url} alt="Logo preview" className="h-12 mt-2 inline-block" />
                  ) : (
                    <span className="text-muted-foreground">No logo set</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">CTA Button:</span>{' '}
                  <Button size="sm" className="ml-2">
                    {config.cta_text || 'NULL: CTA TEXT'}
                  </Button>
                </div>
                <div>
                  <span className="font-medium">CTA Link:</span>{' '}
                  <code className="ml-2 px-2 py-1 bg-background rounded text-xs">
                    {config.cta_link || 'Not set'}
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NavbarConfigAdmin;
