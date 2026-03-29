import { useState } from 'react';
import type { PortfolioData } from '@/admin/types';
import { Save, Globe, Mail, Phone, MapPin, Linkedin, FileText, Check, X } from 'lucide-react';

interface ContactPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

export default function ContactPage({ data, updateData, addActivity }: ContactPageProps) {
  const [contact, setContact] = useState(data.contact);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    updateData({ contact });
    addActivity('Updated contact information');
    setHasChanges(false);
  };

  const updateContact = (updates: Partial<typeof contact>) => {
    setContact(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  return (
    <div className="slide-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Contact & Links</h1>
          <p className="section-subtitle">Manage your contact information and social links</p>
        </div>
        <button onClick={handleSave} className="luxury-btn-primary flex items-center gap-2" disabled={!hasChanges}>
          <Save className="w-4 h-4" /> Save Contact Info
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#c9a84c]" /> Contact Information
          </h3>
          
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact({ email: e.target.value })}
                  className="luxury-input w-full pl-10"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => updateContact({ phone: e.target.value })}
                  className="luxury-input w-full pl-10"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Location (EN)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
                  <input
                    type="text"
                    value={contact.location.en}
                    onChange={(e) => updateContact({ location: { ...contact.location, en: e.target.value } })}
                    className="luxury-input w-full pl-10"
                    placeholder="Dubai, UAE"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الموقع</label>
                <input
                  type="text"
                  value={contact.location.ar}
                  onChange={(e) => updateContact({ location: { ...contact.location, ar: e.target.value } })}
                  className="luxury-input w-full font-arabic text-right"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#c9a84c]" /> Social Links
          </h3>
          
          <div className="space-y-4">
            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">LinkedIn URL</label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
                <input
                  type="text"
                  value={contact.linkedin}
                  onChange={(e) => updateContact({ linkedin: e.target.value })}
                  className="luxury-input w-full pl-10"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            {/* Behance */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Behance URL (Optional)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
                <input
                  type="text"
                  value={contact.behance}
                  onChange={(e) => updateContact({ behance: e.target.value })}
                  className="luxury-input w-full pl-10"
                  placeholder="https://behance.net/..."
                />
              </div>
            </div>

            {/* CV/Resume */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">CV/Resume URL</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
                <input
                  type="text"
                  value={contact.cvUrl}
                  onChange={(e) => updateContact({ cvUrl: e.target.value })}
                  className="luxury-input w-full pl-10"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6">Availability Status</h3>
          
          <div className="space-y-4">
            {/* Status Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateContact({ available: !contact.available })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  contact.available ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#6b6560]/20 text-[#6b6560]'
                }`}
              >
                {contact.available ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {contact.available ? 'Open to Opportunities' : 'Not Available'}
              </button>
            </div>

            {/* Availability Label */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Availability Label (EN)</label>
                <input
                  type="text"
                  value={contact.availabilityLabel.en}
                  onChange={(e) => updateContact({ availabilityLabel: { ...contact.availabilityLabel, en: e.target.value } })}
                  className="luxury-input w-full"
                  placeholder="Open to Opportunities"
                />
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) تسمية التوفر</label>
                <input
                  type="text"
                  value={contact.availabilityLabel.ar}
                  onChange={(e) => updateContact({ availabilityLabel: { ...contact.availabilityLabel, ar: e.target.value } })}
                  className="luxury-input w-full font-arabic text-right"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Settings */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6">Form Settings</h3>
          
          <div>
            <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">
              Contact Form Submission Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6560]" />
              <input
                type="email"
                value={contact.formSubmissionEmail}
                onChange={(e) => updateContact({ formSubmissionEmail: e.target.value })}
                className="luxury-input w-full pl-10"
                placeholder="forms@example.com"
              />
            </div>
            <p className="text-xs text-[#6b6560] mt-2">
              Where contact form submissions will be sent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
