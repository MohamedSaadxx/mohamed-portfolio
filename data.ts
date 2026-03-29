// Portfolio Data - Mohamed Saad (Bilingual Version)
// All content centralized for CMS integration
// ADMIN CONTROLLED sections marked for Admin Panel wiring

type Translation = {
  en: string;
  ar: string;
};

export const DATA = {
  // ============================================
  // PERSONAL INFO - ADMIN CONTROLLED
  // Admin Panel → "Profile" section
  // ============================================
  personal: {
    name: {
      en: "Mohamed Saad",
      ar: "محمد سعد",
    } as Translation,
    initials: "MS",
    title: {
      en: "UX Designer & Consultant",
      ar: "مصمم تجربة المستخدم والاستشارات",
    } as Translation,
    tagline: {
      en: "Engineer by training. Data-driven by practice. Bilingual by nature. AI-native by choice.",
      ar: "مهندس بالتدريب. مبني على البيانات. ثنائي اللغة بالطبيعة. متقن للذكاء الاصطناعي باختيار.",
    } as Translation,
    location: {
      en: "Muscat, Oman",
      ar: "مسقط، عُمان",
    } as Translation,
    email: "mohamedsaad.8299@gmail.com", // ADMIN CONTROLLED
    phone: "+968 98017535", // ADMIN CONTROLLED
    linkedin: "#", // ADMIN CONTROLLED
    availability: {
      en: "Open to Opportunities",
      ar: "متاح للفرص",
    } as Translation,
    availabilityStatus: true, // ADMIN CONTROLLED - toggle on/off
  },

  // ============================================
  // NAVIGATION - ADMIN CONTROLLED
  // Admin Panel → "Navigation" section
  // ============================================
  nav: {
    links: [
      { 
        label: { en: "Work", ar: "أعمالي" } as Translation, 
        href: "#work" 
      },
      { 
        label: { en: "About", ar: "عني" } as Translation, 
        href: "#about" 
      },
      { 
        label: { en: "Writing", ar: "كتاباتي" } as Translation, 
        href: "#writing" 
      },
      { 
        label: { en: "Services", ar: "خدماتي" } as Translation, 
        href: "#services" 
      },
      { 
        label: { en: "Contact", ar: "تواصل" } as Translation, 
        href: "#contact" 
      },
    ],
    cta: { 
      label: { en: "Hire Me", ar: "وظفني" } as Translation, 
      href: "#contact" 
    },
    languageToggle: {
      en: "EN",
      ar: "ع",
    },
  },

  // ============================================
  // HERO SECTION
  // ============================================
  hero: {
    headline: {
      en: "MOHAMED SAAD",
      ar: "محمد سعد",
    } as Translation,
    subheadline: {
      en: "UX DESIGNER & CONSULTANT",
      ar: "مصمم تجربة المستخدم والاستشارات",
    } as Translation,
    description: {
      en: "Engineer by training. Data-driven by practice. Bilingual by nature. AI-native by choice.",
      ar: "مهندس بالتدريب. مبني على البيانات. ثنائي اللغة بالطبيعة. متقن للذكاء الاصطناعي باختيار.",
    } as Translation,
    ctas: [
      { 
        label: { en: "View My Work", ar: "شاهد أعمالي" } as Translation, 
        href: "#work", 
        variant: "filled" 
      },
      { 
        label: { en: "Hire Me", ar: "وظفني" } as Translation, 
        href: "#contact", 
        variant: "outlined" 
      },
    ],
    floatingTags: [
      { 
        label: { en: "Fintech", ar: "فينتك" } as Translation, 
        position: { en: "top-[18%] left-[8%]", ar: "top-[18%] right-[8%]" }
      },
      { 
        label: { en: "Arabic UX", ar: "تجربة المستخدم العربية" } as Translation, 
        position: { en: "top-[28%] right-[12%]", ar: "top-[28%] left-[12%]" }
      },
      { 
        label: { en: "AI Tools", ar: "أدوات الذكاء الاصطناعي" } as Translation, 
        position: { en: "bottom-[32%] left-[10%]", ar: "bottom-[32%] right-[10%]" }
      },
      { 
        label: { en: "Oman 🇴🇲", ar: "عُمان 🇴🇲" } as Translation, 
        position: { en: "bottom-[22%] right-[8%]", ar: "bottom-[22%] left-[8%]" }
      },
      { 
        label: { en: "BNPL", ar: "اشتر الآن وادفع لاحقاً" } as Translation, 
        position: { en: "top-[45%] left-[5%]", ar: "top-[45%] right-[5%]" }
      },
      { 
        label: { en: "Bilingual", ar: "ثنائي اللغة" } as Translation, 
        position: { en: "bottom-[40%] right-[5%]", ar: "bottom-[40%] left-[5%]" }
      },
    ],
  },

  // ============================================
  // COMPANIES - ADMIN CONTROLLED
  // Admin Panel → "Clients" section
  // ============================================
  companies: {
    title: {
      en: "COMPANIES I'VE WORKED WITH",
      ar: "الشركات التي عملت معها",
    } as Translation,
    // ADMIN CONTROLLED - Add/edit/remove clients
    logos: [
      { 
        name: "Thawani Pay", 
        id: "thawani",
        nameAr: "ثواني باي"
      },
      { 
        name: "Banan", 
        id: "banan",
        nameAr: "بنان"
      },
      { 
        name: "Ajarlee", 
        id: "ajarlee",
        nameAr: "أجارلي"
      },
      { 
        name: "Sooq Cars", 
        id: "sooq",
        nameAr: "سوق السيارات"
      },
      { 
        name: "InfoDrop", 
        id: "infodrop",
        nameAr: "إنفو دروب"
      },
      { 
        name: "Sayyar", 
        id: "sayyar",
        nameAr: "سيار"
      },
    ],
  },

  // ============================================
  // SELECTED WORK - ADMIN CONTROLLED
  // Admin Panel → "Projects" section
  // ============================================
  work: {
    title: {
      en: "SELECTED WORK",
      ar: "أبرز الأعمال",
    } as Translation,
    viewCaseStudy: {
      en: "View Case Study",
      ar: "اقرأ دراسة الحالة",
    } as Translation,
    // ADMIN CONTROLLED - Full CRUD for projects
    projects: [
      {
        id: 1,
        title: { en: "Thawani Pay", ar: "ثواني باي" } as Translation,
        subtitle: { en: "BNPL & Card System", ar: "نظام البطاقات والشراء الآن" } as Translation,
        category: { en: "Fintech UX", ar: "تجربة المستخدم المالية" } as Translation,
        summary: { 
          en: "Redesigned Buy Now Pay Later flows and digital card management for Oman's #1 fintech platform.",
          ar: "إعادة تصميم تجربة الشراء الآن والدفع لاحقاً وإدارة البطاقات الرقمية لأكبر منصة دفع في عُمان."
        } as Translation,
        tags: [
          { en: "BNPL", ar: "اشتر الآن" } as Translation,
          { en: "Card Management", ar: "إدارة البطاقات" } as Translation,
          { en: "A/B Testing", ar: "اختبار أ/ب" } as Translation,
          { en: "Mixpanel", ar: "ميكسبانل" } as Translation,
        ],
        coverImage: null, // ADMIN CONTROLLED - URL
        caseStudyLink: "#", // ADMIN CONTROLLED
      },
      {
        id: 2,
        title: { en: "Banan", ar: "بنان" } as Translation,
        subtitle: { en: "Digital Identity App", ar: "تطبيق الهوية الرقمية" } as Translation,
        category: { en: "Identity & Security", ar: "الهوية والأمان" } as Translation,
        summary: { 
          en: "Designed identity verification and digital credential experience for a national-scale app.",
          ar: "تصميم تجربة التحقق من الهوية والاعتمادات الرقمية لتطبيق على المستوى الوطني."
        } as Translation,
        tags: [
          { en: "Digital ID", ar: "هوية رقمية" } as Translation,
          { en: "Onboarding", ar: "التسجيل" } as Translation,
          { en: "Trust Design", ar: "تصميم الثقة" } as Translation,
        ],
        coverImage: null,
        caseStudyLink: "#",
      },
      {
        id: 3,
        title: { en: "Ajarlee", ar: "أجارلي" } as Translation,
        subtitle: { en: "Car Rental Platform", ar: "منصة تأجير السيارات" } as Translation,
        category: { en: "Mobility UX", ar: "تجربة التنقل" } as Translation,
        summary: { 
          en: "End-to-end UX for a car rental service, optimizing booking journey and reducing drop-off.",
          ar: "تصميم شامل لتجربة المستخدم لخدمة تأجير السيارات، تحسين رحلة الحجز وتقليل الانسحاب."
        } as Translation,
        tags: [
          { en: "Vehicle Rental", ar: "تأجير المركبات" } as Translation,
          { en: "Conversion", ar: "التحويل" } as Translation,
          { en: "Responsive Design", ar: "تصميم متجاوب" } as Translation,
        ],
        coverImage: null,
        caseStudyLink: "#",
      },
      {
        id: 4,
        title: { en: "Nema", ar: "نعمة" } as Translation,
        subtitle: { en: "Ramadan Food Sharing", ar: "مشاركة الطعام في رمضان" } as Translation,
        category: { en: "Social Impact UX", ar: "تجربة التأثير الاجتماعي" } as Translation,
        summary: { 
          en: "Full UX challenge submission covering research, flows, and final design for a food-sharing platform.",
          ar: "تقديم كامل لتحدي UX يغطي البحث، التدفقات، والتصميم النهائي لمنصة مشاركة الطعام."
        } as Translation,
        tags: [
          { en: "UX Challenge", ar: "تحدي UX" } as Translation,
          { en: "Rehal", ar: "رحال" } as Translation,
          { en: "Social Good", ar: "الخير الاجتماعي" } as Translation,
        ],
        coverImage: null,
        caseStudyLink: "#",
      },
    ],
  },

  // ============================================
  // ABOUT - ADMIN CONTROLLED
  // Admin Panel → "About" section
  // ============================================
  about: {
    headline: {
      en: "I DESIGN PRODUCTS THAT THINK.",
      ar: "أصمم منتجات تفكر.",
    } as Translation,
    // ADMIN CONTROLLED - About text
    body: {
      en: "With a foundation in mechanical engineering (3.89 GPA, First-Class Honours) and 3+ years designing fintech products at Thawani Pay — Oman's largest payment platform — I bring a rare combination of analytical rigor and design craft. I specialize in complex financial UX: BNPL flows, card systems, e-commerce, and bilingual Arabic/English products. I leverage AI tools daily to compress research, accelerate prototyping, and sharpen UX writing.",
      ar: "بخلفية في الهندسة الميكانيكية (معدل 3.89، مرتبة الشرف الأولى) وأكثر من 3 سنوات في تصميم منتجات فينتك في ثواني باي — أكبر منصة دفع إلكتروني في عُمان — أجمع بين الدقة التحليلية وحرفة التصميم. متخصص في تجربة المستخدم للتطبيقات المالية المعقدة، وكتابة UX ثنائية اللغة، وتوظيف أدوات الذكاء الاصطناعي بشكل يومي.",
    } as Translation,
    // ADMIN CONTROLLED - Stats
    stats: [
      { 
        value: "3+", 
        label: { en: "Years in Fintech UX", ar: "سنوات في فينتك" } as Translation 
      },
      { 
        value: "6+", 
        label: { en: "Products Shipped", ar: "منتجات مُسلَّمة" } as Translation 
      },
      { 
        value: "2", 
        label: { en: "Languages (Ar/En)", ar: "لغتان" } as Translation 
      },
      { 
        value: "8+", 
        label: { en: "AI Tools", ar: "أدوات ذكاء اصطناعي" } as Translation 
      },
    ],
    photoUrl: null, // ADMIN CONTROLLED - Profile photo URL
  },

  // ============================================
  // AI TOOLKIT - ADMIN CONTROLLED
  // Admin Panel → "AI Tools" section
  // ============================================
  aiToolkit: {
    title: {
      en: "AI-NATIVE WORKFLOW",
      ar: "سير عمل ذكاء اصطناعي أصيل",
    } as Translation,
    subtitle: {
      en: "I don't just use AI — I've engineered a personal system around it.",
      ar: "لا أستخدم الذكاء الاصطناعي فحسب — بل بنيت حولها منظومة عمل شخصية.",
    } as Translation,
    // ADMIN CONTROLLED - Tools list
    tools: [
      {
        name: "Claude",
        useCase: { 
          en: "UX writing, research synthesis, flowcharts, storyboards, prototypes",
          ar: "كتابة UX، تحليل البحث، المخططات، القصص المصورة، النماذج"
        } as Translation,
        icon: "C",
      },
      {
        name: "ChatGPT",
        useCase: { 
          en: "Photo generation, icon creation, ideation",
          ar: "توليد الصور، إنشاء الأيقونات، توليد الأفكار"
        } as Translation,
        icon: "G",
      },
      {
        name: "Figma Make",
        useCase: { 
          en: "UI generation and interactive prototypes",
          ar: "توليد واجهات المستخدم والنماذج التفاعلية"
        } as Translation,
        icon: "F",
      },
      {
        name: "Kimi",
        useCase: { 
          en: "Websites, presentations, documents",
          ar: "مواقع، عروض تقديمية، مستندات"
        } as Translation,
        icon: "K",
      },
      {
        name: "Antigravity",
        useCase: { 
          en: "Data cleaning, insights, app and system building",
          ar: "تنظيف البيانات، الرؤى، بناء التطبيقات والأنظمة"
        } as Translation,
        icon: "A",
      },
      {
        name: "DeepSeek",
        useCase: { 
          en: "Long-form text, prompt engineering",
          ar: "النصوص الطويلة، هندسة التعليمات"
        } as Translation,
        icon: "D",
      },
      {
        name: "Midjourney",
        useCase: { 
          en: "Moodboards, visual direction",
          ar: "لوحات المزاج، التوجيه البصري"
        } as Translation,
        icon: "M",
      },
      {
        name: "Cursor / v0",
        useCase: { 
          en: "Code-based prototyping",
          ar: "النماذج الأولية المبنية على الكود"
        } as Translation,
        icon: "Cu",
      },
      {
        name: "Maze",
        useCase: { 
          en: "AI-assisted usability testing",
          ar: "اختبار سهولة الاستخدام بالذكاء الاصطناعي"
        } as Translation,
        icon: "Mz",
      },
    ],
  },

  // ============================================
  // WRITING - ADMIN CONTROLLED
  // Admin Panel → "Articles" and "Books" sections
  // ============================================
  writing: {
    title: {
      en: "WRITING & THOUGHT LEADERSHIP",
      ar: "الكتابة والريادة الفكرية",
    } as Translation,
    note: {
      en: "Published in Arabic & English",
      ar: "منشور بالعربية والإنجليزية",
    } as Translation,
    tabs: {
      articles: { en: "Articles", ar: "مقالات" } as Translation,
      books: { en: "Books", ar: "كتب" } as Translation,
    },
    readMore: {
      en: "Read",
      ar: "اقرأ",
    } as Translation,
    // ADMIN CONTROLLED - Articles CRUD
    articles: [
      {
        id: 1,
        title: { 
          en: "Why Arabic UX is Not Just RTL", 
          ar: "لماذا تجربة المستخدم العربية ليست مجرد RTL" 
        } as Translation,
        category: { en: "UX Writing", ar: "كتابة UX" } as Translation,
        date: "2024",
        excerpt: { 
          en: "Exploring the cultural and linguistic nuances that make Arabic UX design a unique discipline beyond simple text direction.",
          ar: "استكشاف الفروق الثقافية واللغوية التي تجعل تصميم تجربة المستخدم العربية تخصصاً فريداً."
        } as Translation,
        link: "#",
      },
      {
        id: 2,
        title: { 
          en: "Building Trust in Fintech Products", 
          ar: "بناء الثقة في منتجات الفينتك" 
        } as Translation,
        category: { en: "Product Design", ar: "تصميم المنتجات" } as Translation,
        date: "2024",
        excerpt: { 
          en: "How transparency, clear communication, and thoughtful micro-interactions create confidence in financial applications.",
          ar: "كيف تخلق الشفافية والتواصل الواضح والتفاعلات الدقيقة الثقة في التطبيقات المالية."
        } as Translation,
        link: "#",
      },
      {
        id: 3,
        title: { 
          en: "The AI-Assisted Designer", 
          ar: "المصمم المدعوم بالذكاء الاصطناعي" 
        } as Translation,
        category: { en: "Process", ar: "العملية" } as Translation,
        date: "2023",
        excerpt: { 
          en: "My framework for integrating AI tools into the design workflow without losing creative ownership.",
          ar: "إطاري لدمج أدوات الذكاء الاصطناعي في سير العمل التصميمي دون فقدان الملكية الإبداعية."
        } as Translation,
        link: "#",
      },
    ],
    // ADMIN CONTROLLED - Books CRUD
    books: [
      {
        id: 1,
        title: { en: "UX Writing in Arabic", ar: "كتابة UX بالعربية" } as Translation,
        category: { en: "UX", ar: "UX" } as Translation,
        categoryType: "ux", // ux | life
        year: "2024",
        coverImage: null,
        link: "#",
      },
      {
        id: 2,
        title: { en: "Money in Islam", ar: "المال في الإسلام" } as Translation,
        category: { en: "Life & Thinking", ar: "الحياة والتفكير" } as Translation,
        categoryType: "life",
        year: "2023",
        coverImage: null,
        link: "#",
      },
    ],
  },

  // ============================================
  // SERVICES - ADMIN CONTROLLED
  // Admin Panel → "Services" section
  // ============================================
  services: {
    title: {
      en: "WHAT I DO",
      ar: "ما الذي أقدمه",
    } as Translation,
    // ADMIN CONTROLLED - Services CRUD
    items: [
      {
        icon: "◈",
        title: { 
          en: "UX Design", 
          ar: "تصميم تجربة المستخدم" 
        } as Translation,
        description: { 
          en: "End-to-end product design from research to high-fidelity. Fintech, e-commerce, and complex platforms.",
          ar: "تصميم المنتجات من البحث إلى النماذج عالية الدقة. فينتك، التجارة الإلكترونية، والمنصات المعقدة."
        } as Translation,
      },
      {
        icon: "◉",
        title: { 
          en: "UX Writing (Ar/En)", 
          ar: "كتابة UX" 
        } as Translation,
        description: { 
          en: "Bilingual microcopy, content frameworks, voice & tone strategy for Arabic and English markets.",
          ar: "النصوص الصغيرة ثنائية اللغة، أطر المحتوى، استراتيجية الصوت والنبرة للأسواق العربية والإنجليزية."
        } as Translation,
      },
      {
        icon: "◍",
        title: { 
          en: "AI-Assisted UX", 
          ar: "تصميم بالذكاء الاصطناعي" 
        } as Translation,
        description: { 
          en: "Accelerated research, prototyping, and design generation using a battle-tested AI toolkit.",
          ar: "تسريع البحث، النماذج الأولية، وتوليد التصاميم باستخدام مجموعة أدوات الذكاء الاصطناعي المختبرة."
        } as Translation,
      },
      {
        icon: "◎",
        title: { 
          en: "UX Consulting", 
          ar: "استشارات UX" 
        } as Translation,
        description: { 
          en: "Strategic audits, design critiques, and product direction for startups and growing teams.",
          ar: "التدقيق الاستراتيجي، نقد التصميم، وتوجيه المنتج للشركات الناشئة والفرق النامية."
        } as Translation,
      },
    ],
  },

  // ============================================
  // CONTACT - ADMIN CONTROLLED
  // Admin Panel → "Contact" section
  // ============================================
  contact: {
    title: {
      en: "LET'S WORK TOGETHER",
      ar: "لنعمل معاً",
    } as Translation,
    subtitle: {
      en: "Open to full-time roles, consulting projects, and speaking opportunities.",
      ar: "متاح للأدوار الكاملة، المشاريع الاستشارية، وفرص التحدث.",
    } as Translation,
    form: {
      name: { en: "Name", ar: "الاسم" } as Translation,
      email: { en: "Email", ar: "البريد الإلكتروني" } as Translation,
      subject: { en: "Subject", ar: "الموضوع" } as Translation,
      message: { en: "Message", ar: "الرسالة" } as Translation,
      submit: { en: "Send Message", ar: "إرسال الرسالة" } as Translation,
      success: { 
        en: "Message sent. I'll be in touch.", 
        ar: "تم الإرسال. سأتواصل معك قريباً." 
      } as Translation,
    },
    // ADMIN CONTROLLED - Contact details
    details: [
      { 
        label: { en: "Email", ar: "البريد" } as Translation, 
        value: "mohamedsaad.8299@gmail.com", 
        href: "mailto:mohamedsaad.8299@gmail.com",
        icon: "mail"
      },
      { 
        label: { en: "Phone", ar: "الهاتف" } as Translation, 
        value: "+968 98017535", 
        href: "tel:+96898017535",
        icon: "phone"
      },
      { 
        label: { en: "Location", ar: "الموقع" } as Translation, 
        value: "Muscat, Oman", 
        href: null,
        icon: "map"
      },
      { 
        label: { en: "LinkedIn", ar: "لينكدإن" } as Translation, 
        value: "Connect", 
        href: "#",
        icon: "linkedin"
      },
    ],
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    copyright: {
      en: "MOHAMED SAAD © 2026",
      ar: "محمد سعد © ٢٠٢٦",
    } as Translation,
    tagline: {
      en: "Designed with intention.",
      ar: "صُمِّم بنية وهدف.",
    } as Translation,
    adminLink: "Admin",
  },
};

export default DATA;
