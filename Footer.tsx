import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-luxury-bg">
      {/* Gold Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Left - Copyright */}
            <div className="font-display text-xl lg:text-2xl text-text-primary tracking-wider">
              {t(DATA.footer.copyright)}
            </div>

            {/* Center - Nav Links */}
            <nav className={`flex flex-wrap justify-center gap-6 lg:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {DATA.nav.links.map((link) => (
                <button
                  key={link.label.en}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-text-secondary hover:text-gold transition-colors"
                >
                  {t(link.label)}
                </button>
              ))}
            </nav>

            {/* Right - Tagline */}
            <div className="text-text-secondary/60 text-sm">
              {t(DATA.footer.tagline)}
            </div>
          </div>

          {/* Admin Link - Subtle */}
          <div className={`mt-8 pt-6 border-t border-luxury-border flex justify-end`}>
            <a
              href="/admin"
              className="text-xs text-text-secondary/30 hover:text-gold/50 transition-colors"
            >
              {DATA.footer.adminLink}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
