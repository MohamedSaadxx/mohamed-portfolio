import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';

export default function AIToolkit() {
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
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    const headerEl = sectionRef.current?.querySelector('.section-header');
    const cardEls = sectionRef.current?.querySelectorAll('.tool-card');
    
    if (headerEl) observer.observe(headerEl);
    cardEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ai-toolkit"
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
            <h2 className="font-display text-5xl lg:text-7xl text-text-primary tracking-wide mb-4">
              {t(DATA.aiToolkit.title)}
            </h2>
            <p className="text-text-secondary text-base lg:text-lg max-w-2xl">
              {t(DATA.aiToolkit.subtitle)}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {DATA.aiToolkit.tools.map((tool, index) => {
              const isVisible = visibleItems.has(index);
              // Calculate stagger delay based on position (left to right, top to bottom)
              const row = Math.floor(index / 3);
              const col = index % 3;
              const staggerDelay = (row * 3 + col) * 100;
              
              return (
                <div
                  key={tool.name}
                  data-index={index}
                  className={`tool-card group p-6 lg:p-8 bg-luxury-card border border-gold/10 hover:border-gold/60 transition-all duration-500 relative overflow-hidden ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${staggerDelay}ms` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gold/5 group-hover:bg-gold/10 flex items-center justify-center mb-5 transition-colors duration-300">
                    <span className="font-display text-xl lg:text-2xl text-gold group-hover:text-gold-light transition-colors duration-300">
                      {tool.icon}
                    </span>
                  </div>

                  {/* Tool Name */}
                  <h3 className="font-display text-xl lg:text-2xl text-text-primary mb-2 tracking-wide group-hover:text-gold transition-colors duration-300">
                    {tool.name}
                  </h3>

                  {/* Use Case */}
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t(tool.useCase)}
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
