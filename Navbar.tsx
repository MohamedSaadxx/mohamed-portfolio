import { useState, useEffect } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { language, isRTL, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    // Slide down animation on load
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      } ${
        isScrolled
          ? 'bg-luxury-surface/95 backdrop-blur-xl border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl lg:text-3xl text-gold font-semibold tracking-wider hover:scale-105 transition-transform duration-300"
          >
            {DATA.personal.initials}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {DATA.nav.links.map((link) => (
              <button
                key={link.label.en}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-text-primary/70 hover:text-gold transition-colors duration-300 relative group"
              >
                {t(link.label)}
                <span className={`absolute -bottom-1 ${isRTL ? 'right-0' : 'left-0'} w-0 h-px bg-gold transition-all duration-300 group-hover:w-full`} />
              </button>
            ))}
          </div>

          {/* Right Side: Language Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-gold transition-colors duration-300"
            >
              <span className={language === 'en' ? 'text-gold' : ''}>{DATA.nav.languageToggle.en}</span>
              <span className="text-text-secondary/50">|</span>
              <span className={language === 'ar' ? 'text-gold font-arabic' : 'font-arabic'}>{DATA.nav.languageToggle.ar}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection(DATA.nav.cta.href)}
              className="px-6 py-2.5 border border-gold text-gold text-sm font-subheading tracking-wider hover:bg-gold hover:text-luxury-bg transition-all duration-300"
            >
              {t(DATA.nav.cta.label)}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-luxury-surface/98 backdrop-blur-xl border-b border-gold/20 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {DATA.nav.links.map((link) => (
            <button
              key={link.label.en}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left text-lg text-text-primary/80 hover:text-gold transition-colors py-2"
            >
              {t(link.label)}
            </button>
          ))}
          
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 py-2 text-text-secondary"
          >
            <span className={language === 'en' ? 'text-gold' : ''}>{DATA.nav.languageToggle.en}</span>
            <span>|</span>
            <span className={language === 'ar' ? 'text-gold font-arabic' : 'font-arabic'}>{DATA.nav.languageToggle.ar}</span>
          </button>

          <button
            onClick={() => scrollToSection(DATA.nav.cta.href)}
            className="w-full mt-4 px-6 py-3 border border-gold text-gold font-subheading tracking-wider hover:bg-gold hover:text-luxury-bg transition-all duration-300"
          >
            {t(DATA.nav.cta.label)}
          </button>
        </div>
      </div>
    </nav>
  );
}
