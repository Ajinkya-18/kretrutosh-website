import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Mail, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState<any>(null);

  // Fetch contact details on mount
  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase.from('page_contact').select('*').limit(1).maybeSingle();
      if (data) setContact(data);
    };
    fetchContact();
  }, []);

  return (
    <footer className="bg-[#0B1C3E] text-white border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">KretruTosh Consulting</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Customer-Led Growth Transformation. Redesigning GTM, CX, and Culture to drive predictable, scalable growth.
            </p>
            
            {/* Dynamic Social Links */}
            <div className="flex gap-4">
              {contact?.linkedin_url && (
                  <a href={contact.linkedin_url} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-[#FF9933] transition-colors">
                    <Linkedin size={20} />
                  </a>
              )}
              {contact?.youtube_url && (
                  <a href={contact.youtube_url} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-[#FF9933] transition-colors">
                    <Youtube size={20} />
                  </a>
              )}
            </div>
          </div>

          {/* Links Column - Ensure these match your actual routes */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FF9933]">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-300 hover:text-white">Transformation Programs</Link></li>
              <li><Link to="/frameworks" className="text-gray-300 hover:text-white">Proprietary Frameworks</Link></li>
              <li><Link to="/resources/articles" className="text-gray-300 hover:text-white">Articles & Insights</Link></li>
              <li><Link to="/book" className="text-gray-300 hover:text-white">The Book</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Dynamic Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#FF9933]">Contact</h3>
            <ul className="space-y-4">
              {contact?.email && (
                  <li className="flex items-start gap-3">
                    <Mail className="shrink-0 text-gray-400" size={20} />
                    <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-white">{contact.email}</a>
                  </li>
              )}
              {contact?.address_html && (
                  <li className="flex items-start gap-3">
                    <MapPin className="shrink-0 text-gray-400" size={20} />
                    <span className="text-gray-300" dangerouslySetInnerHTML={{__html: contact.address_html.replace(/<[^>]*>?/gm, '')}} /> 
                    {/* Note: Stripped HTML for footer view, or just render it if simple text */}
                  </li>
              )}
              <li>
                <Link to="/contact" className="inline-block mt-2 text-sm font-bold border-b border-[#FF9933] text-[#FF9933] hover:text-white hover:border-white transition-colors">
                  Schedule a Strategy Review
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {currentYear} KretruTosh Consulting. All Rights Reserved.</p>
      </div>
    </footer>
  );
};