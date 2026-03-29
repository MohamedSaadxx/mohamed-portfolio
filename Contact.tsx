import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Linkedin, Send, Check } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return <Mail size={18} />;
      case 'phone':
        return <Phone size={18} />;
      case 'map':
        return <MapPin size={18} />;
      case 'linkedin':
        return <Linkedin size={18} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 lg:py-32 bg-luxury-bg"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div 
            className={`text-center mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display text-5xl lg:text-7xl xl:text-8xl text-text-primary tracking-wide mb-6">
              {t(DATA.contact.title)}
            </h2>
            <p className="text-text-secondary text-base lg:text-lg">
              {t(DATA.contact.subtitle)}
            </p>
          </div>

          {/* Availability Badge */}
          <div 
            className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {DATA.personal.availabilityStatus && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-status-green/10 border border-status-green/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="w-2 h-2 bg-status-green rounded-full animate-pulse" />
                <span className="text-status-green text-sm font-medium">
                  {t(DATA.personal.availability)}
                </span>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div 
            className={`mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {isSubmitted ? (
              <div className="p-8 bg-status-green/10 border border-status-green/30 text-center">
                <div className="w-12 h-12 bg-status-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-status-green" />
                </div>
                <p className="text-status-green text-lg">
                  {t(DATA.contact.form.success)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      {t(DATA.contact.form.name)}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-luxury-card border border-gold/10 focus:border-gold text-text-primary text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      {t(DATA.contact.form.email)}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-luxury-card border border-gold/10 focus:border-gold text-text-primary text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    {t(DATA.contact.form.subject)}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-card border border-gold/10 focus:border-gold text-text-primary text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">
                    {t(DATA.contact.form.message)}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-luxury-card border border-gold/10 focus:border-gold text-text-primary text-sm transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full md:w-auto px-8 py-4 bg-gold text-luxury-bg font-subheading text-sm tracking-wider flex items-center justify-center gap-2 hover:shadow-gold transition-all duration-300 hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {t(DATA.contact.form.submit)}
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div 
            className={`flex flex-wrap justify-center gap-8 lg:gap-12 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {DATA.contact.details.map((detail) => (
              <div 
                key={detail.label.en} 
                className={`flex items-center gap-3 text-text-secondary ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span className="text-gold">{getIcon(detail.icon)}</span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="text-sm">{detail.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
