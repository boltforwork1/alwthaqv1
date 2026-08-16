import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'ar';

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: Translation;
};

type Translation = {
  nav: { home: string; about: string; services: string; contact: string; getInTouch: string };
  home: {
    badge: string;
    heroTitle: string;
    heroDesc: string;
    exploreBtn: string;
    contactBtn: string;
    quoteTitle: string;
    quoteDesc: string;
    quoteName: string;
    quoteContact: string;
    quoteSubmit: string;
    stats: { exp: string; clients: string; satisfaction: string; experts: string };
    aboutBadge: string;
    aboutTitle: string;
    aboutDesc: string;
    aboutBtn: string;
    trustedBy: string;
    trustedAcross: string;
    years: string;
    experts: string;
    satisfaction: string;
    servicesTitle: string;
    servicesBtn: string;
    whyTitle: string;
    whyDesc: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    services: { title: string; desc: string }[];
    features: { title: string; desc: string }[];
  };
  about: {
    heroTitle: string;
    heroDesc: string;
    whoWeAre: string;
    title: string;
    desc: string;
    yearsExcellence: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    whyTitle: string;
    values: { title: string; desc: string }[];
    ctaTitle: string;
    ctaBtn: string;
  };
  services: {
    heroTitle: string;
    heroDesc: string;
    viewDetails: string;
    alsoTitle: string;
    mainServices: { title: string; desc: string; details: string[] }[];
    quickServices: string[];
  };
  contact: {
    heroTitle: string;
    heroDesc: string;
    infoBadge: string;
    title: string;
    desc: string;
    phone1: string;
    whatsapp: string;
    email: string;
    address: string;
    addressValue: string;
    workingHours: string;
    workingHoursValue: string;
    formTitle: string;
    formDesc: string;
    fullName: string;
    emailLabel: string;
    phone: string;
    subject: string;
    message: string;
    submit: string;
  };
  footer: {
    desc: string;
    navigation: string;
    contact: string;
    phone1: string;
    whatsapp: string;
    email: string;
    address: string;
    addressValue: string;
    workingHours: string;
    workingHoursValue: string;
    rights: string;
  };
  assistant: {
    title: string;
    online: string;
    welcome: string;
    inputPlaceholder: string;
    notSure: string;
    talkOnWhatsApp: string;
    questions: { q: string; a: string; links?: { label: string; url: string }[] }[];
  };
};

const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
    },
    home: {
      badge: 'Your Trusted Government Services Partner',
      heroTitle: 'Business Setup & Government Transactions in UAE',
      heroDesc:
        'Our comprehensive services cover all individual and corporate needs with official authorities. We save your time and effort while avoiding common errors.',
      exploreBtn: 'Explore Services',
      contactBtn: 'Contact Us Now',
      quoteTitle: 'Request a Free Quote',
      quoteDesc: 'Tell us a little about your business goals.',
      quoteName: 'Full Name',
      quoteContact: 'Email / Phone',
      quoteSubmit: 'Request A Free Quote',
      stats: {
        exp: 'Years Experience',
        clients: 'Clients Helped',
        satisfaction: 'Client Satisfaction',
        experts: 'Expert Consultants',
      },
      aboutBadge: 'ABOUT US',
      aboutTitle: 'Your Trusted Partner for Government Transactions',
      aboutDesc:
        'With years of expertise in the UAE, Al Wthaq Group simplifies complex governmental procedures. Whether you are an individual seeking residency or a corporation expanding in Dubai, our dedicated consultants ensure seamless, error-free, and timely processing of all your official documents.',
      aboutBtn: 'Learn More About Us',
      trustedBy: 'Trusted by 2,500+ Clients',
      trustedAcross: 'Across all Emirates in the UAE',
      years: 'Years',
      experts: 'Experts',
      satisfaction: 'Satisfaction',
      servicesTitle: 'Our Top Services',
      servicesBtn: 'View All Services',
      whyTitle: 'Why Choose Al Wthaq',
      whyDesc:
        'A trusted partner for every transaction — built on precision, speed, and complete coverage.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'How long does it take to set up a company in the UAE?',
          a: 'The timeline varies depending on the jurisdiction (Mainland vs. Free Zone). Generally, it can take anywhere from 3 to 10 working days once all required documents are accurately submitted.',
        },
        {
          q: 'Do I need a local sponsor to start a business?',
          a: 'Recent legal updates allow 100% foreign ownership for most commercial and industrial activities in the UAE Mainland, eliminating the need for a local sponsor in many cases.',
        },
        {
          q: 'Can you assist with Golden Visa applications?',
          a: 'Yes, we handle the entire end-to-end process for Golden Visa applications for real estate investors, entrepreneurs, and highly skilled professionals.',
        },
        {
          q: 'Are your services limited to Dubai?',
          a: 'While we have a strong presence in Dubai, our services cover all Emirates across the UAE, handling federal and local municipal transactions.',
        },
      ],
      services: [
        {
          title: 'Company Setup & Licensing',
          desc: 'Booking trade names, issuing licenses, and amending commercial contracts.',
        },
        {
          title: 'Visas & Residency',
          desc: 'Residency issuance, work visas, and golden visa applications.',
        },
        {
          title: 'Ministry of Human Resources',
          desc: 'Establishment cards, labor contracts, and employee data updates.',
        },
        {
          title: 'Traffic & Municipalities',
          desc: 'Vehicle ownership transfer, driving licenses, and health permits.',
        },
      ],
      features: [
        {
          title: 'High Accuracy & Reliability',
          desc: 'Every transaction is handled with meticulous attention to detail.',
        },
        {
          title: 'Time & Effort Saving',
          desc: 'We handle the queues and paperwork so you never have to.',
        },
        {
          title: 'Comprehensive Coverage',
          desc: 'From individuals to corporations, we cover every authority.',
        },
      ],
    },
    about: {
      heroTitle: 'About Al Wthaq Group',
      heroDesc: "Your trusted partner in navigating UAE's government and corporate landscape.",
      whoWeAre: 'WHO WE ARE',
      title: 'Excellence in Government Services',
      desc: 'Al Wthaq Group is a leading documents clearance and corporate services provider in the UAE. We specialize in simplifying complex governmental procedures for investors, entrepreneurs, and individuals. Our expert team ensures that your transactions are processed with maximum efficiency, zero errors, and absolute compliance with local regulations.',
      yearsExcellence: 'Years of Excellence',
      missionTitle: 'Our Mission',
      missionDesc:
        'To provide seamless, transparent, and rapid government transaction services that empower businesses to launch and grow in the UAE without administrative hurdles.',
      visionTitle: 'Our Vision',
      visionDesc:
        'To be the most recognized and trusted corporate services agency in the Middle East, setting the standard for efficiency and client satisfaction.',
      whyTitle: 'Why Choose Us',
      values: [
        { title: 'Speed & Efficiency', desc: 'Fast turnaround on every transaction.' },
        { title: '100% Compliance', desc: 'Full adherence to UAE regulations.' },
        { title: 'Expert Consultants', desc: 'A seasoned team at your service.' },
        { title: 'Total Confidentiality', desc: 'Your data and documents stay private.' },
      ],
      ctaTitle: 'Ready to Start Your Business Journey?',
      ctaBtn: 'Contact Us Today',
    },
    services: {
      heroTitle: 'Our Premium Services',
      heroDesc: 'Comprehensive government transaction clearance for individuals and corporations.',
      viewDetails: 'View Details',
      alsoTitle: 'We Also Facilitate',
      mainServices: [
        {
          title: 'Company Setup & Licensing',
          desc: 'Trade name reservation, commercial license issuance & renewal, contract amendments, and company liquidation.',
          details: [
            'Trade Name Reservation & Initial Approvals',
            'Commercial License Issuance & Annual Renewal',
            'Amending Contracts & Commercial Registers (Adding/Removing partners, changing activities)',
            'Cancellation & Liquidation of Licenses according to official requirements.',
          ],
        },
        {
          title: 'Visas & Immigration',
          desc: 'Employee & family residency issuance, visit visas, golden/green visas, and sponsorship transfers.',
          details: [
            'Issuance & Renewal of Employee/Family Residencies',
            'Work Visas & Tourist/Visit Visas processing',
            'Visa Cancellation & Sponsorship/Service Transfer',
            'Golden & Green Visa Applications for investors and talents.',
          ],
        },
        {
          title: 'Ministry of Human Resources',
          desc: 'Establishment card opening, labor contract processing, and salary/profession updates.',
          details: [
            'Opening Establishment Cards & Company Registration',
            'Issuing & Renewing Labor Contracts/Permits',
            'Amending Professions & Updating Employee Salaries',
            'Filing Absconding Reports & Resolving Labor Disputes.',
          ],
        },
        {
          title: 'Municipalities & Approvals',
          desc: 'Signage permits, structural modifications, health certificates, and civil defense approvals.',
          details: [
            'Shop & Building Permits (Signage, Structural Modifications)',
            'Health Certificates for the Food & Restaurant Sector',
            'Civil Defense Approvals & Safety Licenses.',
          ],
        },
        {
          title: 'Traffic & Vehicle Services',
          desc: 'Vehicle ownership transfer, registration renewal, driving licenses, and traffic fines settlement.',
          details: [
            'Transfer of Vehicle Ownership & Plate Issuance',
            'Renewal of Driving & Vehicle Licenses',
            'Vehicle Inspection Procedures',
            'Traffic Fines Settlement & Official Objections.',
          ],
        },
        {
          title: 'Judicial & Notarization',
          desc: 'Attestation of certificates, agency notarizations, commercial and residential lease agreements.',
          details: [
            'Attestation of Agencies & Certificates (Ministry of Foreign Affairs, Notary Public)',
            'Notarization of Contracts (Commercial, Residential, Company MOAs).',
          ],
        },
      ],
      quickServices: [
        'Visas & Residencies',
        'Flight Tickets',
        'Family Sponsorship',
        'Bank Account Opening',
        'Ejari (Tenancy Contracts)',
        'Amer Center Services',
        'Tasheel',
        'Tadbeer',
        'Tawjeeh',
        'ICA Services',
        'Police & Interior Ministry',
      ],
    },
    contact: {
      heroTitle: 'Get in Touch',
      heroDesc:
        "We're here to help with all your government transaction needs. Reach out and our team will respond promptly.",
      infoBadge: 'CONTACT INFORMATION',
      title: "Let's Talk",
      desc: 'Reach us through any of the channels below, or fill out the form and we will get back to you shortly.',
      phone1: 'Phone 1',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Address',
      addressValue: 'Al Nuaimiya 1, Ajman, UAE, P.O Box: 067049022',
      workingHours: 'Working Hours',
      workingHoursValue: 'Sunday – Thursday, 8:00 AM – 5:00 PM',
      formTitle: 'Send Us a Message',
      formDesc: "Fill in the form below and we'll be in touch.",
      fullName: 'Full Name',
      emailLabel: 'Email',
      phone: 'Phone',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
    },
    footer: {
      desc: 'Clearing government transactions with care, clarity, and less time spent waiting.',
      navigation: 'NAVIGATION',
      contact: 'CONTACT',
      phone1: 'Phone 1',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Address',
      addressValue: 'Al Nuaimiya 1, Ajman, UAE, P.O Box: 067049022',
      workingHours: 'Working Hours',
      workingHoursValue: 'Sun – Thu, 8:00 – 17:00',
      rights: '© 2026 Al Wthaq Group. All rights reserved.',
    },
    assistant: {
      title: 'Al Wthaq Smart Assistant',
      online: 'Online now',
      welcome: 'Hello! I\'m your Al Wthaq virtual assistant. How can I help you today?',
      inputPlaceholder: 'Type your question...',
      notSure: "I'm not entirely sure about that. Our business consultants can give you the exact details.",
      talkOnWhatsApp: 'Talk on WhatsApp',
      questions: [
        {
          q: 'How much does business setup cost?',
          a: 'Costs vary based on mainland vs. free zone. Starting prices are typically around 12,000 AED.',
          links: [{ label: 'Explore Services', url: '/services' }],
        },
        {
          q: 'Mainland vs Free Zone?',
          a: 'Mainland allows trading anywhere in the UAE market. Free Zones offer 100% foreign ownership and zero tax but restrict local trading.',
          links: [{ label: 'Free Zone Setup', url: '/services' }],
        },
        {
          q: 'Do I need a local sponsor?',
          a: 'Recent updates allow 100% foreign ownership for most commercial activities in the Mainland without a local sponsor.',
        },
        {
          q: 'How long does it take?',
          a: 'Usually 3 to 10 working days after document submission.',
        },
      ],
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      contact: 'تواصل معنا',
      getInTouch: 'تواصل معنا',
    },
    home: {
      badge: 'شريكك الموثوق للخدمات الحكومية',
      heroTitle: 'تأسيس الشركات وتخليص المعاملات الحكومية في الإمارات',
      heroDesc:
        'تغطي خدماتنا الشاملة كافة احتياجات الأفراد والشركات لدى الجهات الرسمية. نوفر وقتك وجهدك مع ضمان إنجاز معاملاتك بدقة وبدون أخطاء.',
      exploreBtn: 'استكشف خدماتنا',
      contactBtn: 'تواصل معنا الآن',
      quoteTitle: 'اطلب تسعيرة مجانية',
      quoteDesc: 'أخبرنا قليلاً عن أهداف عملك واحتياجاتك.',
      quoteName: 'الاسم الكامل',
      quoteContact: 'البريد الإلكتروني / رقم الهاتف',
      quoteSubmit: 'اطلب تسعيرتك الآن',
      stats: {
        exp: 'سنوات من الخبرة',
        clients: 'عميل',
        satisfaction: 'نسبة الرضا',
        experts: 'مستشار خبير',
      },
      aboutBadge: 'من نحن',
      aboutTitle: 'شريكك الموثوق لإنجاز المعاملات الحكومية',
      aboutDesc:
        'بخبرة تمتد لسنوات في الإمارات، تبسط مجموعة الوثاق الإجراءات الحكومية المعقدة. سواء كنت فرداً يسعى للحصول على إقامة أو شركة تتوسع في دبي، يضمن خبراؤنا معالجة جميع وثائقك الرسمية بسلاسة وبدون أخطاء وفي الوقت المحدد.',
      aboutBtn: 'اعرف المزيد عنا',
      trustedBy: 'موثوق به من أكثر من 2,500 عميل',
      trustedAcross: 'في جميع إمارات الدولة',
      years: 'سنوات',
      experts: 'خبراء',
      satisfaction: 'رضا العملاء',
      servicesTitle: 'أبرز خدماتنا',
      servicesBtn: 'عرض كل الخدمات',
      whyTitle: 'لماذا تختار الوثاق',
      whyDesc: 'شريك موثوق لكل معاملة — نعتمد على الدقة، السرعة، والتغطية الشاملة.',
      faqTitle: 'الأسئلة الشائعة',
      faqs: [
        {
          q: 'كم يستغرق تأسيس شركة في الإمارات؟',
          a: 'تختلف المدة حسب الاختصاص القضائي (البر الرئيسي أم المنطقة الحرة). عادةً تستغرق العملية من 3 إلى 10 أيام عمل بعد تقديم جميع المستندات المطلوبة بدقة.',
        },
        {
          q: 'هل أحتاج إلى كفيل محلي لتأسيس شركة؟',
          a: 'تسمح التحديثات القانونية الأخيرة بالملكية الأجنبية بنسبة 100% لمعظم الأنشطة التجارية والصناعية في البر الرئيسي للإمارات، مما يلغي الحاجة إلى كفيل محلي في كثير من الحالات.',
        },
        {
          q: 'هل يمكنكم المساعدة في طلبات التأشيرة الذهبية؟',
          a: 'نعم، نتولى العملية بالكامل من البداية إلى النهاية لطلبات التأشيرة الذهبية لمستثمري العقارات ورواد الأعمال والمواهب المهنية المتميزة.',
        },
        {
          q: 'هل خدماتكم مقتصرة على دبي؟',
          a: 'رغم حضورنا القوي في دبي، إلا أن خدماتنا تغطي جميع الإمارات across الدولة، ونتولى المعاملات الفيدرالية والبلدية المحلية.',
        },
      ],
      services: [
        {
          title: 'تأسيس الشركات والترخيص',
          desc: 'حجز الأسماء التجارية، إصدار التراخيص، وتعديل العقود التجارية.',
        },
        {
          title: 'التأشيرات والإقامة',
          desc: 'إصدار الإقامات، تأشيرات العمل، وطلبات التأشيرة الذهبية.',
        },
        {
          title: 'وزارة الموارد البشرية',
          desc: 'بطاقات المنشأة، عقود العمل، وتحديث بيانات الموظفين.',
        },
        {
          title: 'المرور والبلديات',
          desc: 'نقل ملكية المركبات، رخص القيادة، والتصاريح الصحية.',
        },
      ],
      features: [
        {
          title: 'دقة وموثوقية عالية',
          desc: 'تتم معالجة كل معاملة بعناية فائقة في التفاصيل.',
        },
        {
          title: 'توفير الوقت والجهد',
          desc: 'نتولى عنك الطوابير والأوراق حتى لا تضطر لذلك أبداً.',
        },
        {
          title: 'تغطية شاملة',
          desc: 'من الأفراد إلى الشركات، نغطي كل جهة رسمية.',
        },
      ],
    },
    about: {
      heroTitle: 'عن مجموعة الوثاق',
      heroDesc: 'شريكك الموثوق في التنقل بين المشهد الحكومي والشركات في الإمارات.',
      whoWeAre: 'من نحن',
      title: 'التميز في الخدمات الحكومية',
      desc: 'مجموعة الوثاق هي مزود رائد لخدمات تخليص المعاملات والخدمات الشركاتية في الإمارات. نتخصص في تبسيط الإجراءات الحكومية المعقدة للمستثمرين ورواد الأعمال والأفراد. يضمن فريقنا الخبير معالجة معاملاتك بأقصى كفاءة وبدون أخطاء مع الالتزام التام باللوائح المحلية.',
      yearsExcellence: 'سنوات من التميز',
      missionTitle: 'رسالتنا',
      missionDesc:
        'تقديم خدمات حكومية سلسة وشفافة وسريعة تمكّن الشركات من الإطلاق والنمو في الإمارات دون عقبات إدارية.',
      visionTitle: 'رؤيتنا',
      visionDesc:
        'أن نكون الوكالة الأكثر شهرة وموثوقية للخدمات الشركاتية في الشرق الأوسط، ونضع معياراً للكفاءة ورضا العملاء.',
      whyTitle: 'لماذا تختارنا',
      values: [
        { title: 'السرعة والكفاءة', desc: 'إنجاز سريع لكل معاملة.' },
        { title: 'التزام كامل 100%', desc: 'الالتزام التام بلوائح الإمارات.' },
        { title: 'مستشارون خبراء', desc: 'فريق متمرّس في خدمتك.' },
        { title: 'سرية تامة', desc: 'بياناتك ومستنداتك تبقى خاصة.' },
      ],
      ctaTitle: 'هل أنت مستعد لبدء رحلتك التجارية؟',
      ctaBtn: 'تواصل معنا اليوم',
    },
    services: {
      heroTitle: 'خدماتنا المميزة',
      heroDesc: 'تخليص معاملات حكومية شاملة للأفراد والشركات.',
      viewDetails: 'عرض التفاصيل',
      alsoTitle: 'نُسهّل أيضاً',
      mainServices: [
        {
          title: 'تأسيس الشركات والترخيص',
          desc: 'حجز الاسم التجاري، إصدار وتجديد الترخيص التجاري، تعديل العقود، وتصفية الشركات.',
          details: [
            'حجز الاسم التجاري والموافقات المبدئية',
            'إصدار الترخيص التجاري والتجديد السنوي',
            'تعديل العقود والسجلات التجارية (إضافة/حذف شركاء، تغيير الأنشطة)',
            'إلغاء وتصفية التراخيص وفقاً للمتطلبات الرسمية.',
          ],
        },
        {
          title: 'التأشيرات والهجرة',
          desc: 'إصدار إقامات الموظفين والعائلة، تأشيرات الزيارة، التأشيرات الذهبية/الخضراء، ونقل الكفالة.',
          details: [
            'إصدار وتجديد إقامات الموظفين/العائلة',
            'تأشيرات العمل وتأشيرات الزيارة/السياحة',
            'إلغاء التأشيرات ونقل الكفالة/الخدمة',
            'طلبات التأشيرة الذهبية والخضراء للمستثمرين والمواهب.',
          ],
        },
        {
          title: 'وزارة الموارد البشرية',
          desc: 'فتح بطاقة المنشأة، معالجة عقود العمل، وتحديث الرواتب والمسميات.',
          details: [
            'فتح بطاقات المنشأة وتسجيل الشركات',
            'إصدار وتجديد عقود/تصاريح العمل',
            'تعديل المسميات المهنية وتحديث رواتب الموظفين',
            'تقديم بلاغات الهروب وحل النزاعات العمالية.',
          ],
        },
        {
          title: 'البلديات والتصاريح',
          desc: 'تصاريح اللافتات، التعديلات الإنشائية، الشهادات الصحية، وموافقات الدفاع المدني.',
          details: [
            'تصاريح المحلات والمباني (اللافتات، التعديلات الإنشائية)',
            'الشهادات الصحية لقطاع الأغذية والمطاعم',
            'موافقات الدفاع المدني ورخص السلامة.',
          ],
        },
        {
          title: 'خدمات المرور والمركبات',
          desc: 'نقل ملكية المركبات، تجديد التسجيل، رخص القيادة، وتسديد المخالفات المرورية.',
          details: [
            'نقل ملكية المركبات وإصدار اللوحات',
            'تجديد رخص القيادة والمركبات',
            'إجراءات فحص المركبات',
            'تسديد المخالفات المرورية والاعتراضات الرسمية.',
          ],
        },
        {
          title: 'القضاء والتوثيق',
          desc: 'تصديق الشهادات، توثيق الوكالات، وعقود الإيجار التجارية والسكنية.',
          details: [
            'تصديق الوكالات والشهادات (وزارة الخارجية، الكاتب بالعدل)',
            'توثيق العقود (تجارية، سكنية، مذكرات التفاهم للشركات).',
          ],
        },
      ],
      quickServices: [
        'التأشيرات والإقامات',
        'تذاكر الطيران',
        'كفالة العائلة',
        'فتح حساب بنكي',
        'إيجاري (عقود الإيجار)',
        'خدمات مركز العامر',
        'تسهيل',
        'تدبير',
        'توجيه',
        'خدمات الهوية',
        'الشرطة ووزارة الداخلية',
      ],
    },
    contact: {
      heroTitle: 'تواصل معنا',
      heroDesc:
        'نحن هنا لمساعدتك في جميع احتياجات معاملاتك الحكومية. تواصل معنا وسيرد فريقنا في أقرب وقت.',
      infoBadge: 'معلومات التواصل',
      title: 'لنتحدث',
      desc: 'تواصل معنا عبر أي من القنوات أدناه، أو املأ النموذج وسنعود إليك قريباً.',
      phone1: 'هاتف 1',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      address: 'العنوان',
      addressValue: 'النعيمية 1، عجمان، الإمارات، ص.ب: 067049022',
      workingHours: 'ساعات العمل',
      workingHoursValue: 'الأحد – الخميس، 8:00 ص – 5:00 م',
      formTitle: 'أرسل لنا رسالة',
      formDesc: 'املأ النموذج أدناه وسنتواصل معك.',
      fullName: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني',
      phone: 'الهاتف',
      subject: 'الموضوع',
      message: 'الرسالة',
      submit: 'إرسال الرسالة',
    },
    footer: {
      desc: 'تخليص المعاملات الحكومية بعناية ووضوح مع توفير وقت الانتظار.',
      navigation: 'التنقل',
      contact: 'تواصل',
      phone1: 'هاتف 1',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      address: 'العنوان',
      addressValue: 'النعيمية 1، عجمان، الإمارات، ص.ب: 067049022',
      workingHours: 'ساعات العمل',
      workingHoursValue: 'الأحد – الخميس، 8:00 – 17:00',
      rights: '© 2026 مجموعة الوثاق. جميع الحقوق محفوظة.',
    },
    assistant: {
      title: 'مساعد الوثاق الذكي',
      online: 'متصل الآن',
      welcome: 'مرحباً! أنا المساعد الافتراضي لمجموعة الوثاق. كيف يمكنني مساعدتك اليوم؟',
      inputPlaceholder: 'اكتب سؤالك...',
      notSure: 'لست متأكداً تماماً من ذلك. يمكن لمستشارينا التجاريين تقديم التفاصيل الدقيقة.',
      talkOnWhatsApp: 'تحدث عبر واتساب',
      questions: [
        {
          q: 'كم تكلفة تأسيس شركة؟',
          a: 'تختلف التكلفة حسب البر الرئيسي أم المنطقة الحرة. الأسعار تبدأ عادةً من حوالي 12,000 درهم.',
          links: [{ label: 'استكشف الخدمات', url: '/services' }],
        },
        {
          q: 'البر الرئيسي أم المنطقة الحرة؟',
          a: 'البر الرئيسي يسمح بالتجارة في أي مكان في الإمارات. المناطق الحرة تقدم ملكية أجنبية 100% وبدون ضرائب لكنها تقيّد التجارة المحلية.',
          links: [{ label: 'تأسيس المنطقة الحرة', url: '/services' }],
        },
        {
          q: 'هل أحتاج كفيلاً محلياً؟',
          a: 'التحديثات الأخيرة تسمح بالملكية الأجنبية 100% لمعظم الأنشطة التجارية في البر الرئيسي بدون كفيل محلي.',
        },
        {
          q: 'كم تستغرق العملية؟',
          a: 'عادةً من 3 إلى 10 أيام عمل بعد تقديم المستندات.',
        },
      ],
    },
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'ar' : 'en')),
    isRTL: language === 'ar',
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}