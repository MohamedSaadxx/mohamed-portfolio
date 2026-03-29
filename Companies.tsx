import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Companies() {
  const { t, isRTL, language } = useLanguage();
  
  // Duplicate logos for seamless marquee
  const allLogos = [...DATA.companies.logos, ...DATA.companies.logos];

  return (
    <section className="py-16 lg:py-20 bg-luxury-bg border-y border-luxury-border overflow-hidden">
      <div className="w-full px-6 lg:px-12 mb-10">
        <p className="font-subheading text-xs text-gold tracking-[0.2em] text-center">
          {t(DATA.companies.title)}
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative group">
        {/* Gradient Masks */}
        <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-${isRTL ? 'l' : 'r'} from-luxury-bg to-transparent z-10`} />
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-${isRTL ? 'r' : 'l'} from-luxury-bg to-transparent z-10`} />

        {/* Scrolling Logos */}
        <div className={`flex ${isRTL ? 'animate-marquee' : 'animate-marquee'}`} style={{ direction: 'ltr' }}>
          {allLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-6 lg:mx-10"
            >
              <div className="px-8 py-4 lg:px-12 lg:py-5 bg-luxury-card/50 border border-gold/10 hover:border-gold/40 transition-all duration-500 group/logo cursor-default">
                <span className="font-display text-xl lg:text-2xl text-text-secondary group-hover/logo:text-gold transition-colors duration-500 tracking-wider whitespace-nowrap">
                  {language === 'ar' && logo.nameAr ? logo.nameAr : logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
