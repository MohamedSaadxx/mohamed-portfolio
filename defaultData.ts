import type { PortfolioData } from '@/types';

export const defaultTheme = {
  colors: {
    background: '#080808',
    surface: '#0d0d0d',
    card: '#111111',
    border: '#1e1e1e',
    primary: '#c9a84c',
    primaryHover: '#e2c97e',
    textPrimary: '#f5f0e8',
    textSecondary: '#6b6560',
    success: '#2ecc71',
    danger: '#e74c3c',
  },
  typography: {
    displayFont: 'Cormorant Garamond',
    bodyFont: 'DM Sans',
    arabicFont: 'Tajawal',
    baseSize: 16,
  },
  buttonStyle: {
    style: 'rounded' as const,
  },
  spacing: {
    scale: 'normal' as const,
  },
};

export const defaultHero: PortfolioData['hero'] = {
  fullName: {
    en: 'Mohamed Saad',
    ar: 'محمد سعيد',
  },
  tagline: {
    en: 'Senior UX Designer',
    ar: 'مصمم UX أول',
  },
  subline: {
    en: 'Crafting digital experiences that blend innovation with elegance. Specializing in fintech, design systems, and AI-driven interfaces.',
    ar: 'صناعة تجارب رقمية تجمع بين الابتكار والأناقة. متخصص في التكنولوجيا المالية وأنظمة التصميم وواجهات الذكاء الاصطناعي.',
  },
  cta1: {
    en: 'View My Work',
    ar: 'عرض أعمالي',
  },
  cta2: {
    en: 'Get in Touch',
    ar: 'تواصل معي',
  },
  floatingTags: {
    en: ['UX Design', 'Fintech', 'Design Systems', 'AI Tools'],
    ar: ['تصميم UX', 'التكنولوجيا المالية', 'أنظمة التصميم', 'أدوات الذكاء الاصطناعي'],
  },
  visible: true,
};

export const defaultAbout: PortfolioData['about'] = {
  headline: {
    en: 'About Me',
    ar: 'عني',
  },
  body: {
    en: 'With over 8 years of experience in UX design, I have helped fintech startups and enterprise companies create intuitive, user-centered digital products. My approach combines research-driven insights with bold visual design to deliver experiences that users love and businesses trust.',
    ar: 'بخبرة تزيد عن 8 سنوات في تصميم UX، ساعدت شركات التكنولوجيا المالية الناشئة والمؤسسات الكبيرة في إنشاء منتجات رقمية بديهية تركز على المستخدم. يجمع نهجي بين الرؤى المستندة إلى البحث والتصميم البصري الجريء لتقديم تجارب يحبها المستخدمون وتثق بها الشركات.',
  },
  photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  stats: [
    { value: '8+', label: { en: 'Years Experience', ar: 'سنوات الخبرة' } },
    { value: '50+', label: { en: 'Projects Delivered', ar: 'مشروع منجز' } },
    { value: '30+', label: { en: 'Happy Clients', ar: 'عميل سعيد' } },
    { value: '12', label: { en: 'Design Awards', ar: 'جائزة تصميم' } },
  ],
  visible: true,
};

export const defaultProjects: PortfolioData['projects'] = [
  {
    id: '1',
    title: {
      en: 'Fintech App Redesign',
      ar: 'إعادة تصميم تطبيق التكنولوجيا المالية',
    },
    category: {
      en: 'UX Design',
      ar: 'تصميم UX',
    },
    summary: {
      en: 'Complete redesign of a mobile banking app serving 2M+ users, improving user satisfaction by 40%.',
      ar: 'إعادة تصميم كاملة لتطبيق مصرفي متنقل يخدم أكثر من 2 مليون مستخدم، مما يحسن رضا المستخدم بنسبة 40%.',
    },
    problem: {
      en: 'Users were struggling with complex navigation and outdated UI patterns.',
      ar: 'كان المستخدمون يواجهون صعوبة في التنقل المعقد وأنماط واجهة المستخدم القديمة.',
    },
    process: {
      en: 'Conducted user research, created wireframes, and iterated through multiple design prototypes.',
      ar: 'أجرينا أبحاث المستخدمين، وأنشأنا الهياكل الأساسية، وكررنا من خلال نماذج تصميم متعددة.',
    },
    solution: {
      en: 'Simplified navigation with a modern, clean interface and intuitive user flows.',
      ar: 'تبسيط التنقل مع واجهة حديثة ونظيفة وتدفقات مستخدم بديهية.',
    },
    outcome: {
      en: '40% increase in user satisfaction, 25% reduction in support tickets.',
      ar: 'زيادة بنسبة 40% في رضا المستخدم، وتقليل بنسبة 25% في تذاكر الدعم.',
    },
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    tags: ['UX Design', 'Fintech', 'Mobile App'],
    caseStudyLink: '#',
    featured: true,
    hidden: false,
    order: 0,
  },
  {
    id: '2',
    title: {
      en: 'AI Dashboard',
      ar: 'لوحة تحكم الذكاء الاصطناعي',
    },
    category: {
      en: 'AI Tools',
      ar: 'أدوات الذكاء الاصطناعي',
    },
    summary: {
      en: 'Analytics platform powered by AI for real-time business intelligence and predictive insights.',
      ar: 'منصة تحليلات مدعومة بالذكاء الاصطناعي للاستخبارات التجارية في الوقت الفعلي والرؤى التنبؤية.',
    },
    problem: {
      en: 'Businesses lacked real-time insights and predictive analytics capabilities.',
      ar: 'افتقرت الشركات إلى الرؤى في الوقت الفعلي وقدرات التحليلات التنبؤية.',
    },
    process: {
      en: 'Collaborated with data scientists to design intuitive data visualizations.',
      ar: 'تعاونت مع علماء البيانات لتصميم تصورات بيانات بديهية.',
    },
    solution: {
      en: 'Created an AI-powered dashboard with natural language queries and smart alerts.',
      ar: 'أنشأت لوحة تحكم مدعومة بالذكاء الاصطناعي مع استعلامات اللغة الطبيعية والتنبيهات الذكية.',
    },
    outcome: {
      en: 'Reduced decision-making time by 60% for executive teams.',
      ar: 'تقليل وقت اتخاذ القرار بنسبة 60% للفرق التنفيذية.',
    },
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['AI', 'Dashboard', 'Analytics'],
    caseStudyLink: '#',
    featured: true,
    hidden: false,
    order: 1,
  },
  {
    id: '3',
    title: {
      en: 'Design System',
      ar: 'نظام التصميم',
    },
    category: {
      en: 'Design Systems',
      ar: 'أنظمة التصميم',
    },
    summary: {
      en: 'Comprehensive design system for a global e-commerce platform with 500+ components.',
      ar: 'نظام تصميم شامل لمنصة تجارة إلكترونية عالمية مع أكثر من 500 مكون.',
    },
    problem: {
      en: 'Inconsistent UI across products led to poor user experience and development inefficiencies.',
      ar: 'أدى واجهة المستخدم غير المتسقة عبر المنتجات إلى تجربة مستخدم سيئة وعدم كفاءة في التطوير.',
    },
    process: {
      en: 'Audited existing components, defined design tokens, and created comprehensive documentation.',
      ar: 'تدقيق المكونات الموجودة، وتحديد رموز التصميم، وإنشاء وثائق شاملة.',
    },
    solution: {
      en: 'Built a scalable design system with Figma components, tokens, and developer handoff tools.',
      ar: 'بناء نظام تصميم قابل للتطوير مع مكونات Figma والرموز وأدوات تسليم المطورين.',
    },
    outcome: {
      en: '50% faster design-to-development handoff, 90% component reuse rate.',
      ar: 'تسليم تصميم إلى تطوير أسرع بنسبة 50%，معدل إعادة استخدام المكونات 90%.',
    },
    coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop',
    tags: ['Design System', 'Figma', 'Documentation'],
    caseStudyLink: '#',
    featured: false,
    hidden: false,
    order: 2,
  },
];

export const defaultArticles: PortfolioData['articles'] = [
  {
    id: '1',
    title: {
      en: 'The Future of UX in Fintech',
      ar: 'مستقبل UX في التكنولوجيا المالية',
    },
    category: {
      en: 'UX Trends',
      ar: 'اتجاهات UX',
    },
    date: '2026-03-15',
    excerpt: {
      en: 'Exploring how AI and personalization are reshaping financial user experiences.',
      ar: 'استكشاف كيف يعيد الذكاء الاصطناعي والتخصيص تشكيل تجارب المستخدم المالية.',
    },
    content: {
      en: 'Full article content here...',
      ar: 'محتوى المقال الكامل هنا...',
    },
    externalUrl: '',
    isExternal: false,
    published: true,
    order: 0,
  },
  {
    id: '2',
    title: {
      en: 'Building Scalable Design Systems',
      ar: 'بناء أنظمة تصميم قابلة للتطوير',
    },
    category: {
      en: 'Design Systems',
      ar: 'أنظمة التصميم',
    },
    date: '2026-02-28',
    excerpt: {
      en: 'A practical guide to creating design systems that grow with your organization.',
      ar: 'دليل عملي لإنشاء أنظمة تصميم تنمو مع مؤسستك.',
    },
    content: {
      en: 'Full article content here...',
      ar: 'محتوى المقال الكامل هنا...',
    },
    externalUrl: '',
    isExternal: false,
    published: true,
    order: 1,
  },
  {
    id: '3',
    title: {
      en: 'AI Tools for Designers',
      ar: 'أدوات الذكاء الاصطناعي للمصممين',
    },
    category: {
      en: 'AI Tools',
      ar: 'أدوات الذكاء الاصطناعي',
    },
    date: '2026-02-10',
    excerpt: {
      en: 'How to leverage AI to enhance your design workflow and creativity.',
      ar: 'كيفية الاستفادة من الذكاء الاصطناعي لتعزيز سير عمل التصميم وإبداعك.',
    },
    content: {
      en: 'Full article content here...',
      ar: 'محتوى المقال الكامل هنا...',
    },
    externalUrl: '',
    isExternal: false,
    published: true,
    order: 2,
  },
];

export const defaultBooks: PortfolioData['books'] = [
  {
    id: '1',
    title: {
      en: 'Design Systems Handbook',
      ar: 'دليل أنظمة التصميم',
    },
    category: {
      en: 'UX Design',
      ar: 'تصميم UX',
    },
    year: 2025,
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    description: {
      en: 'A comprehensive guide to building and maintaining design systems at scale.',
      ar: 'دليل شامل لبناء وصيانة أنظمة التصميم على نطاق واسع.',
    },
    purchaseLink: '#',
    visible: true,
    order: 0,
  },
  {
    id: '2',
    title: {
      en: 'The Art of Minimalism',
      ar: 'فن البساطة',
    },
    category: {
      en: 'Life & Thinking',
      ar: 'الحياة والتفكير',
    },
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    description: {
      en: 'Exploring how minimalism in design reflects a philosophy of life.',
      ar: 'استكشاف كيف تعكس البساطة في التصميم فلسفة الحياة.',
    },
    purchaseLink: '#',
    visible: true,
    order: 1,
  },
  {
    id: '3',
    title: {
      en: 'Fintech UX Patterns',
      ar: 'أنماط UX في التكنولوجيا المالية',
    },
    category: {
      en: 'UX Design',
      ar: 'تصميم UX',
    },
    year: 2023,
    coverImage: 'https://images.unsplash.com/photo-1554774853-71015e28c1ea?w=400&h=600&fit=crop',
    description: {
      en: 'Proven UX patterns for building trust and engagement in financial products.',
      ar: 'أنماط UX المثبتة لبناء الثقة والمشاركة في المنتجات المالية.',
    },
    purchaseLink: '#',
    visible: true,
    order: 2,
  },
];

export const defaultAITools: PortfolioData['aiTools'] = [
  {
    id: '1',
    name: 'ChatGPT',
    useCase: {
      en: 'Brainstorming and content generation',
      ar: 'العصف الذهني وإنشاء المحتوى',
    },
    icon: '💬',
    visible: true,
    order: 0,
  },
  {
    id: '2',
    name: 'Midjourney',
    useCase: {
      en: 'Visual concepts and mood boards',
      ar: 'المفاهيم البصرية ولوحات المزاج',
    },
    icon: '🎨',
    visible: true,
    order: 1,
  },
  {
    id: '3',
    name: 'Figma AI',
    useCase: {
      en: 'Rapid prototyping and layouts',
      ar: 'النماذج الأولية السريعة والتخطيطات',
    },
    icon: '🎯',
    visible: true,
    order: 2,
  },
  {
    id: '4',
    name: 'Notion AI',
    useCase: {
      en: 'Documentation and research',
      ar: 'التوثيق والبحث',
    },
    icon: '📝',
    visible: true,
    order: 3,
  },
  {
    id: '5',
    name: 'Claude',
    useCase: {
      en: 'Deep analysis and reasoning',
      ar: 'التحليل العميق والاستدلال',
    },
    icon: '🧠',
    visible: true,
    order: 4,
  },
  {
    id: '6',
    name: 'Runway',
    useCase: {
      en: 'Motion and video prototypes',
      ar: 'نماذج الحركة والفيديو',
    },
    icon: '🎬',
    visible: true,
    order: 5,
  },
];

export const defaultServices: PortfolioData['services'] = [
  {
    id: '1',
    icon: '🎨',
    title: {
      en: 'UX Design',
      ar: 'تصميم UX',
    },
    description: {
      en: 'End-to-end user experience design from research to high-fidelity prototypes.',
      ar: 'تصميم تجربة المستخدم من البحث إلى النماذج الأولية عالية الدقة.',
    },
    visible: true,
    order: 0,
  },
  {
    id: '2',
    icon: '🏗️',
    title: {
      en: 'Design Systems',
      ar: 'أنظمة التصميم',
    },
    description: {
      en: 'Scalable component libraries and design tokens for consistent products.',
      ar: 'مكتبات مكونات قابلة للتطوير ورموز تصميم لمنتجات متسقة.',
    },
    visible: true,
    order: 1,
  },
  {
    id: '3',
    icon: '🔍',
    title: {
      en: 'UX Research',
      ar: 'بحث UX',
    },
    description: {
      en: 'User interviews, usability testing, and data-driven insights.',
      ar: 'مقابلات المستخدمين واختبار قابلية الاستخدام والرؤى المستندة إلى البيانات.',
    },
    visible: true,
    order: 2,
  },
  {
    id: '4',
    icon: '👨‍🏫',
    title: {
      en: 'Mentorship',
      ar: 'الإرشاد',
    },
    description: {
      en: 'One-on-one guidance for designers looking to level up their skills.',
      ar: 'إرشاد فردي للمصممين الذين يتطلعون إلى رفع مهاراتهم.',
    },
    visible: true,
    order: 3,
  },
];

export const defaultContact: PortfolioData['contact'] = {
  email: 'hello@mohamedsaad.design',
  phone: '+971 50 123 4567',
  location: {
    en: 'Dubai, UAE',
    ar: 'دبي، الإمارات العربية المتحدة',
  },
  linkedin: 'https://linkedin.com/in/mohamedsaad',
  behance: 'https://behance.net/mohamedsaad',
  cvUrl: '#',
  available: true,
  availabilityLabel: {
    en: 'Open to Opportunities',
    ar: 'مفتوح للفرص',
  },
  formSubmissionEmail: 'hello@mohamedsaad.design',
};

export const defaultSettings: PortfolioData['settings'] = {
  pin: '1234',
  defaultLanguage: 'en',
  maintenanceMode: false,
};

export const defaultActivityLog: PortfolioData['activityLog'] = [
  {
    id: '1',
    action: 'Updated Hero text',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    action: 'Added new project "Fintech App"',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    action: 'Published article "UX Trends"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    action: 'Edited book "Design Systems"',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    action: 'Changed theme colors',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const defaultPortfolioData: PortfolioData = {
  theme: defaultTheme,
  hero: defaultHero,
  about: defaultAbout,
  projects: defaultProjects,
  articles: defaultArticles,
  books: defaultBooks,
  aiTools: defaultAITools,
  services: defaultServices,
  contact: defaultContact,
  settings: defaultSettings,
  activityLog: defaultActivityLog,
  lastUpdated: new Date().toISOString(),
};
