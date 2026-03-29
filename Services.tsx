import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [headerVisible, setHeaderVisible] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            if (index === 'header') {
              setHeaderVisible(true);
            } else if (index !== null) {
              setVisibleItems((prev) => new Set([...prev, parseInt(index)]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const headerEl = sectionRef.current?.querySelector('.section-header');
    const cardEls = sectionRef.current?.querySelectorAll('.service-card');
    
    if (headerEl) observer.observe(headerEl);
    cardEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 lg:py-32 bg-luxury-bg border-y border-luxury-border"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            data-index="header"
            className={`section-header mb-16 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="font-display text-5xl lg:text-7xl text-text-primary tracking-wide">
              {t(DATA.services.title)}
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {DATA.services.items.map((service, index) => {
              const isVisible = visibleItems.has(index);
              return (
                <div
                  key={service.title.en}
                  data-index={index}
                  className={`service-card group p-8 lg:p-10 bg-luxury-card border border-gold/10 hover:border-gold/40 transition-all duration-500 relative ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="text-3xl lg:text-4xl text-gold mb-6">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl lg:text-3xl text-text-primary mb-4 tracking-wide group-hover:text-gold transition-colors duration-300">
                    {t(service.title)}
                  </h3>

                  {/* Description */}
                  <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
                    {t(service.description)}
                  </p>

                  {/* Accent Border on Hover */}
                  <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-0.5 bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
