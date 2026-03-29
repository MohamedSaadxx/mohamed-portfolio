import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const { isRTL, t } = useLanguage();

  useEffect(() => {
    // Trigger staggered animations after mount
    const timer = setTimeout(() => setAnimationsStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-bg grain-overlay"
    >
      {/* Radial Gold Glow */}
      <div className="absolute inset-0 radial-gold-glow pointer-events-none" />

      {/* Floating Tags */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {DATA.hero.floatingTags.map((tag, index) => {
          const position = isRTL ? tag.position.ar : tag.position.en;
          return (
            <div
              key={tag.label.en}
              className={`absolute ${position} px-4 py-2 bg-luxury-card/60 border border-gold/20 text-sm text-text-secondary backdrop-blur-sm animate-float`}
              style={{ 
                animationDelay: `${index * 0.7}s`,
                animationDuration: `${4 + index * 0.5}s`
              }}
            >
              {t(tag.label)}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h1 
            className={`font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-text-primary leading-none tracking-wide mb-4 transition-all duration-700 ${
              animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t(DATA.hero.headline)}
          </h1>

          {/* Subheadline */}
          <h2 
            className={`font-subheading text-lg sm:text-xl md:text-2xl text-gold tracking-[0.2em] mb-8 transition-all duration-700 delay-150 ${
              animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t(DATA.hero.subheadline)}
          </h2>

          {/* Description */}
          <p 
            className={`text-base lg:text-lg text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-300 ${
              animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t(DATA.hero.description)}
          </p>

          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
              animationsStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={scrollToWork}
              className="group px-8 py-4 bg-gold text-luxury-bg font-subheading text-sm tracking-wider flex items-center justify-center gap-2 hover:shadow-gold-strong transition-all duration-300 hover:scale-105"
            >
              {t(DATA.hero.ctas[0].label)}
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 border border-gold/50 text-gold font-subheading text-sm tracking-wider hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              {t(DATA.hero.ctas[1].label)}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gold Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
