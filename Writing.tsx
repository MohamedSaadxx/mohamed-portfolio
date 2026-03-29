import { useEffect, useRef, useState } from 'react';
import { DATA } from '@/data';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ArrowLeft, BookOpen, FileText } from 'lucide-react';

export default function Writing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'books'>('articles');
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

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id="writing"
      className="py-20 lg:py-32 bg-luxury-bg"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            className={`mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="font-display text-5xl lg:text-7xl text-text-primary tracking-wide mb-4">
              {t(DATA.writing.title)}
            </h2>
            <p className="text-text-secondary/60 text-sm">
              {t(DATA.writing.note)}
            </p>
          </div>

          {/* Tabs */}
          <div 
            className={`flex gap-6 mb-10 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-3 pb-2 border-b-2 transition-all duration-300 ${
                activeTab === 'articles' 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText size={18} />
              <span className="font-subheading text-sm tracking-wider">
                {t(DATA.writing.tabs.articles)}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-3 pb-2 border-b-2 transition-all duration-300 ${
                activeTab === 'books' 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <BookOpen size={18} />
              <span className="font-subheading text-sm tracking-wider">
                {t(DATA.writing.tabs.books)}
              </span>
            </button>
          </div>

          {/* Content */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {activeTab === 'articles' ? (
              /* Articles List */
              <div className="space-y-4">
                {DATA.writing.articles.map((article, index) => (
                  <div
                    key={article.id}
                    className="group p-6 lg:p-8 bg-luxury-card border border-gold/10 hover:border-gold/30 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`flex items-start justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex-1">
                        {/* Category & Date */}
                        <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-subheading tracking-wider">
                            {t(article.category)}
                          </span>
                          <span className="text-text-secondary/60 text-xs">
                            {article.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-display text-xl lg:text-2xl text-text-primary group-hover:text-gold transition-colors duration-300 mb-2">
                          {t(article.title)}
                        </h4>

                        {/* Excerpt */}
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {t(article.excerpt)}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowIcon
                        size={20}
                        className="text-text-secondary/30 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Books Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DATA.writing.books.map((book) => (
                  <div
                    key={book.id}
                    className="group cursor-pointer"
                  >
                    {/* Book Cover Placeholder */}
                    <div className="aspect-[3/4] bg-luxury-card border border-gold/10 group-hover:border-gold/40 transition-colors duration-300 mb-4 relative overflow-hidden">
                      {/* Gold Spine Line */}
                      <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-0 bottom-0 w-px bg-gold/30`} />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                        <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                          <BookOpen size={24} className="text-gold/40" />
                        </div>
                        <span className="text-text-secondary/50 text-xs uppercase tracking-[0.2em] text-center">
                          {isRTL ? 'غلاف الكتاب' : 'Book Cover'}
                        </span>
                      </div>

                      {/* Decorative */}
                      <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} w-6 h-6 border-${isRTL ? 'r' : 'l'} border-t border-gold/20`} />
                      <div className={`absolute bottom-3 ${isRTL ? 'right-6' : 'left-6'} w-6 h-6 border-${isRTL ? 'l' : 'r'} border-b border-gold/20`} />
                    </div>

                    {/* Book Info */}
                    <h4 className="font-display text-lg text-text-primary group-hover:text-gold transition-colors duration-300 mb-2">
                      {t(book.title)}
                    </h4>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`px-2 py-0.5 text-xs ${
                        book.categoryType === 'ux' 
                          ? 'bg-gold/10 text-gold' 
                          : 'bg-text-secondary/10 text-text-secondary'
                      }`}>
                        {t(book.category)}
                      </span>
                      <span className="text-text-secondary/50 text-xs">
                        {book.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
