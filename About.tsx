import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { useCountUp } from '@/hooks/useCountUp';
import { User } from 'lucide-react';

// Stat Item Component with Count Up
function StatItem({ 
  value, 
  label, 
  delay
}: { 
  value: string; 
  label: { en: string; ar: string }; 
  delay: number;
}) {
  const { t } = useLanguage();
  
  // Parse numeric value and suffix
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, '');
  
  const { displayValue, ref } = useCountUp({
    end: numericValue,
    duration: 2000,
    delay,
    suffix,
  });

  return (
    <div ref={ref} className="p-5 lg:p-6 bg-luxury-card border border-gold/10 hover:border-gold/30 transition-colors duration-300">
      <div className="font-display text-3xl lg:text-4xl text-gold mb-1">
        {displayValue}
      </div>
      <div className="text-text-secondary text-xs lg:text-sm">
        {t(label)}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-32 bg-luxury-bg"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Text */}
            <div>
              {/* Headline */}
              <h2 
                className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-text-primary leading-tight tracking-wide mb-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
              >
                {t(DATA.about.headline)}
              </h2>

              {/* Body Text */}
              <p 
                className={`text-text-secondary text-base lg:text-lg leading-relaxed mb-12 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {t(DATA.about.body)}
              </p>

              {/* Stats Grid */}
              <div 
                className={`grid grid-cols-2 gap-4 lg:gap-5 transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {DATA.about.stats.map((stat, index) => (
                  <StatItem
                    key={stat.label.en}
                    value={stat.value}
                    label={stat.label}
                    delay={index * 150}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Photo Placeholder */}
            <div 
              className={`lg:sticky lg:top-32 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative aspect-[4/5] bg-luxury-card border border-gold/10 overflow-hidden group">
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-luxury-card to-luxury-bg">
                  <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-gold/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-500">
                    <User size={40} className="text-gold/40" />
                  </div>
                  <span className="text-text-secondary text-xs uppercase tracking-[0.2em]">
                    {isRTL ? 'الصورة' : 'Photo'}
                  </span>
                </div>

                {/* Decorative Corner Accents */}
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-10 h-10 border-${isRTL ? 'r' : 'l'}-2 border-t-2 border-gold/30`} />
                <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 border-${isRTL ? 'l' : 'r'}-2 border-b-2 border-gold/30`} />

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              </div>

              {/* Caption */}
              <p className="mt-4 text-text-secondary/60 text-sm text-center">
                {t(DATA.personal.location)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
