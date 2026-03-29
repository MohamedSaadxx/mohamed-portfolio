import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight, ArrowUpLeft } from 'lucide-react';

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.project-card');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 lg:py-32 bg-luxury-bg"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="font-display text-5xl lg:text-7xl text-text-primary tracking-wide animate-fade-in-left">
              {t(DATA.work.title)}
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {DATA.work.projects.map((project, index) => {
              const isVisible = visibleItems.has(index);
              return (
                <div
                  key={project.id}
                  data-index={index}
                  className={`project-card group relative bg-luxury-card border border-gold/10 hover:border-gold/50 transition-all duration-700 overflow-hidden ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Cover Image Area */}
                  <div className="relative h-56 lg:h-72 bg-gradient-to-br from-luxury-surface to-luxury-bg overflow-hidden">
                    {/* Project Name Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-display text-4xl lg:text-5xl text-text-primary/80 tracking-wider text-center px-4 group-hover:text-gold transition-colors duration-500">
                        {t(project.title)}
                      </h3>
                    </div>
                    
                    {/* Gold Category Tag */}
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                      <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs font-subheading tracking-wider">
                        {t(project.category)}
                      </span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-luxury-bg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="px-6 py-3 border border-gold text-gold font-subheading text-sm tracking-wider flex items-center gap-2 hover:bg-gold hover:text-luxury-bg transition-all duration-300">
                        {isRTL ? (
                          <>
                            <ArrowUpLeft size={16} />
                            {t(DATA.work.viewCaseStudy)}
                          </>
                        ) : (
                          <>
                            {t(DATA.work.viewCaseStudy)}
                            <ArrowUpRight size={16} />
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    {/* Title */}
                    <h4 className="font-display text-2xl lg:text-3xl text-text-primary mb-2 tracking-wide group-hover:text-gold transition-colors duration-300">
                      {t(project.subtitle)}
                    </h4>

                    {/* Summary */}
                    <p className="text-text-secondary text-sm lg:text-base mb-6 leading-relaxed">
                      {t(project.summary)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.en}
                          className="px-3 py-1 bg-luxury-surface text-text-secondary text-xs border border-gold/10"
                        >
                          {t(tag)}
                        </span>
                      ))}
                    </div>
                  </div>

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
