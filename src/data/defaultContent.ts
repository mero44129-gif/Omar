import { SiteContent } from '../types/content';

export const defaultSiteContent: SiteContent = {
  brandName: 'Coach Omar Elgafary',
  heroBadge: {
    en: 'Elite Online Fitness Coaching · Egypt & Worldwide',
    ar: 'تدريب لياقة بدنية أونلاين · مصر وجميع أنحاء العالم'
  },
  heroHeadline: {
    en: 'Build Your Strongest Physique with Science-Based Coaching',
    ar: 'ابنِ جسمك المثالي والأقوى مع تدريب أونلاين مبني على أسس علمية'
  },
  heroSubheadline: {
    en: 'Personalized training protocols, customized nutrition plans, and dedicated weekly follow-up designed to help you achieve measurable, sustainable results wherever you train.',
    ar: 'برامج تدريبية مخصصة، خطط تغذية محسوبة بدقة، ومتابعة أسبوعية مباشرة لتحقيق نتائج حقيقية ومستدامة من أي مكان في العالم.'
  },
  heroPortraitUrl: '/assets/aistudio/IMG-20260712-WA0162_417e412d.jpg',
  brandPosterUrl: '/assets/aistudio/IMG-20260712-WA0087_1__a8911c54.jpg',
  bioHeading: {
    en: 'Dedicated to Your Physical Transformation',
    ar: 'ملتزم بتحقيق أفضل نسخة من لياقتك البدنية'
  },
  bioBody: {
    en: 'Coach Omar Elgafary is an online fitness coach focused on scientific resistance training, structured progressive overload, and lifestyle nutrition. Working with clients locally in Egypt and internationally, Omar provides continuous guidance, technical exercise corrections, and tailored dietary planning to empower trainees toward long-term fitness goals.',
    ar: 'كوتش عمر الجعفري مدرب لياقة بدنية وبناء أجسام أونلاين، يركز على التدريب القائم على الأدلة العلمية، الزيادة التدريجية في الأحمال، والتغذية الصحية المرنة. يقدم عمر برامج متابعة للمشتركين داخل مصر وحول العالم مع متابعة فنية مستمرة وتصحيح التكنيك وتعديل الخطط الغذائية للوصول للهدف بأمان وفاعلية.'
  },
  coachingPrinciples: [
    {
      id: 'p1',
      title: {
        en: 'Science-Based Programming',
        ar: 'برامج تدريبية علمية'
      },
      description: {
        en: 'Every repetition, volume tier, and rest interval is tailored to your biometric profile and recovery capability.',
        ar: 'كل تكرار وحجم تدريبي محسوب بما يتناسب مع طبيعة جسمك ومعدل الاستشفاء الخاص بك.'
      }
    },
    {
      id: 'p2',
      title: {
        en: 'Sustainable Nutrition',
        ar: 'تغذية مرنة ومستدامة'
      },
      description: {
        en: 'No extreme deprivation. Macro-balanced meal structures using your preferred everyday foods with precise caloric targets.',
        ar: 'بدون حرمان قاسي؛ خطط ماكروز متوازنة من أطعمتك اليومية المفضلة تناسب نمط حياتك وروتينك.'
      }
    },
    {
      id: 'p3',
      title: {
        en: 'Continuous 1-on-1 Mentorship',
        ar: 'متابعة دورية مباشرة'
      },
      description: {
        en: 'Direct WhatsApp communication, regular form video reviews, and weekly metric assessments to ensure consistent progress.',
        ar: 'تواصل مباشر عبر الواتساب، تقييم دوري للفيديوهات وتكنيك التمارين، وتحديثات دورية لضمان الاستمرارية.'
      }
    }
  ],
  services: [
    {
      id: 'online-personal-training',
      order: 1,
      published: true,
      showPrice: false,
      title: {
        en: 'Online Personal Training & Workout Follow-up',
        ar: 'تدريب أونلاين ومتابعة التمارين'
      },
      description: {
        en: 'Comprehensive resistance training programs tailored to gym or home setups, including video exercise breakdowns and weekly progression tracking.',
        ar: 'برامج تدريب مقاومة متكاملة مصممة خصيصاً للجيم أو المنزل، تشمل شرح فيديوهات التكنيك ومتابعة أسبوعية لتطور الأوزان والقوة.'
      },
      features: {
        en: [
          'Personalized training split (Push/Pull/Legs, Upper/Lower, or Full Body)',
          'Technical form analysis via video review',
          'Progressive overload adjustments and deload scheduling',
          'Direct WhatsApp coach accessibility'
        ],
        ar: [
          'جدول تدريبي مخصص (بوش بول ليجز، علوي سفلي، أو جسم كامل)',
          'تحليل تكنيك التمارين بالفيديو والتصحيح المباشر',
          'تدرج محسوب في الأوزان وتنظيم فترات الديلود',
          'تواصل مستمر عبر الواتساب للاستفسارات'
        ]
      },
      imageUrl: '/assets/aistudio/IMG-20260727-WA0085_d075ea65.jpg',
      whatsappPrefill: {
        en: 'Hello Coach Omar, I am interested in joining your Online Personal Training & Workout Follow-up program. Please provide me with the onboarding details.',
        ar: 'مرحباً كوتش عمر، أود الاستفسار عن تفاصيل الاشتراك في برنامج التدريب الأونلاين ومتابعة التمارين.'
      }
    },
    {
      id: 'personalized-nutrition',
      order: 2,
      published: true,
      showPrice: false,
      title: {
        en: 'Personalized Nutrition Plans',
        ar: 'خطط تغذية مخصصة'
      },
      description: {
        en: 'Calorie and macronutrient-specific meal plans calculated around your metabolic rate, body composition goals, and dietary preferences.',
        ar: 'نظام غذائي محسوب السعرات والماكروز وفق معدل حرقك وهدفك البدني مع بدائل مرنة للأطعمة المفضلة لديك.'
      },
      features: {
        en: [
          'Calculated macro targets (Protein, Carbs, Fats)',
          'Easy-to-follow meal options and grocery guidelines',
          'Supplement guidance backed by research',
          'Adjustments based on weekly weigh-in trends'
        ],
        ar: [
          'حساب دقيق لاحتياجات البروتين، الكربوهيدرات والدهون الصحية',
          'وجبات متنوعة سهلة التحضير وقائمة مشتريات واضحة',
          'توجيه علمي للمكملات الغذائية المناسبة لهدفك',
          'تعديل السعرات أسبوعياً بناءً على استجابة الجسم'
        ]
      },
      imageUrl: '/assets/aistudio/IMG-20260714-WA0115_1f496f2b.jpg',
      whatsappPrefill: {
        en: 'Hello Coach Omar, I would like to get a Personalized Nutrition Plan customized for my fitness and body goals. How can we get started?',
        ar: 'مرحباً كوتش عمر، أرغب في الحصول على خطة تغذية مخصصة تناسب هدفي ونظام حياتي. كيف يمكننا البدء؟'
      }
    },
    {
      id: 'fitness-consultation',
      order: 3,
      published: true,
      showPrice: false,
      title: {
        en: 'Fitness Consultations',
        ar: 'استشارات تدريبية ولياقة بدنية'
      },
      description: {
        en: 'One-on-one strategic consultation to audit your current training routine, solve plateaus, evaluate body metrics, and establish clear action steps.',
        ar: 'جلسة استشارية فردية لمراجعة جدولك الحالي، كسر ثبات الوزن، تقييم القياسات ووضع خطة عمل واضحة للخطوة القادمة.'
      },
      features: {
        en: [
          'Current program and routine review',
          'Plateau-breaking diagnosis',
          'Cardiovascular and recovery optimization',
          'Actionable next-step blueprint'
        ],
        ar: [
          'مراجعة شاملة لبرنامجك الحالي وأسلوب حياتك',
          'تشخيص أسباب ثبات الوزن والقوة وحلها',
          'تحسين جدول الكارديو والاستشفاء العضلي',
          'خطة عمل واضحة للتطبيق الفوري'
        ]
      },
      imageUrl: '/assets/aistudio/IMG-20260714-WA0053_35d766ec.jpg',
      whatsappPrefill: {
        en: 'Hello Coach Omar, I would like to schedule a 1-on-1 Fitness Consultation session with you.',
        ar: 'مرحباً كوتش عمر، أود حجز جلسة استشارة تدريبية خاصة معك.'
      }
    },
    {
      id: 'international-coaching',
      order: 4,
      published: true,
      showPrice: false,
      title: {
        en: 'Online Coaching for Egypt & International Clients',
        ar: 'تدريب متكامل للمشتركين في مصر وخارجها'
      },
      description: {
        en: 'All-inclusive premium transformation package combining workout programming, nutrition tracking, and international timezone accommodation.',
        ar: 'باقة التحول الكاملة الشاملة للتمرين والتغذية والمتابعة اليومية للمتدربين داخل جمهورية مصر العربية ومختلف دول العالم.'
      },
      features: {
        en: [
          'Combined training and customized nutrition program',
          'Accommodates any timezone and equipment availability',
          'Continuous weekly check-in forms and progress photos',
          'High-priority direct WhatsApp channel'
        ],
        ar: [
          'برنامج متكامل يجمع بين خطة التمرين والتغذية المخصصة',
          'مرونة تامة مع فروق التوقيت والإمكانيات المتاحة لديك',
          'تقارير متابعة أسبوعية وصور قياسات دورية',
          'قناة تواصل ذات أولوية مباشرة على الواتساب'
        ]
      },
      imageUrl: '/assets/aistudio/IMG-20261023-WA0057_ea9b0582.jpg',
      whatsappPrefill: {
        en: 'Hello Coach Omar, I am interested in your All-Inclusive Online Coaching package for Egypt & International clients. Please share the enrollment procedure.',
        ar: 'مرحباً كوتش عمر، مهتم بالاشتراك في باقة التدريب الشاملة للمشتركين في مصر والاشتراك الدولي. ما هي خطوات الانضمام؟'
      }
    }
  ],
  gallery: [
    {
      id: 'trans-1',
      imageUrl: '/assets/aistudio/IMG-20261023-WA0058_1__bc94969b.jpg',
      caption: {
        en: 'Front physique progression showcasing upper-body lean muscle growth and core definition.',
        ar: 'تطور ملحوظ في بناء الكتلة العضلية للجزء العلوي وتحديد عضلات البطن.'
      },
      timeframe: {
        en: 'Documented Trainee Progression',
        ar: 'تطور موثق خلال فترة المتابعة'
      },
      published: true,
      order: 1
    },
    {
      id: 'trans-2',
      imageUrl: '/assets/aistudio/IMG-20261023-WA0056_40e48be5.jpg',
      caption: {
        en: 'Most muscular stance progression highlighting chest fullness, shoulder cap width, and vascularity.',
        ar: 'تطور في امتلاء عضلات الصدر، استدارة الأكتاف وزيادة النقاء العضلي.'
      },
      timeframe: {
        en: 'Structured Hypertrophy Protocol',
        ar: 'بروتوكول بناء عضلي موجه'
      },
      published: true,
      order: 2
    },
    {
      id: 'trans-3',
      imageUrl: '/assets/aistudio/IMG-20261023-WA0059_f40fca13.jpg',
      caption: {
        en: 'Back double biceps transformation showing enhanced V-taper taper, lats thickness, and rear deltoid balance.',
        ar: 'تحول واضح في عضلات الظهر، اتساع الـ V-taper وزيادة كثافة عضلات المجنص.'
      },
      timeframe: {
        en: 'Dedicated Progressive Overload',
        ar: 'نتيجة التدرج المنتظم في الأحمال'
      },
      published: true,
      order: 3
    },
    {
      id: 'trans-4',
      imageUrl: '/assets/aistudio/IMG-20261023-WA0057_ea9b0582.jpg',
      caption: {
        en: 'Rear lat spread physique presentation demonstrating back muscularity and symmetry.',
        ar: 'عرض لعضلات الظهر والتناسق العضلي العام.'
      },
      timeframe: {
        en: 'Verified Training Progression',
        ar: 'مستوى متقدم من التطور البدني'
      },
      published: true,
      order: 4
    }
  ],
  socials: {
    youtube: 'https://youtube.com/@youcanoa',
    tiktok: 'https://www.tiktok.com/@coach.omarelgafary',
    linkedin: 'https://www.linkedin.com/in/omar-fathy-782820422',
    instagram: '',
    facebook: ''
  },
  contact: {
    whatsappNumber: '+201286758903',
    email: '',
    defaultMessage: {
      en: 'Hello Coach Omar, I would like to inquire about online coaching and start my fitness journey.',
      ar: 'مرحباً كوتش عمر، أود الاستفسار عن تفاصيل التدريب الأونلاين والبدء في برنامجي الرياضي.'
    },
    availabilityNote: {
      en: 'Online coaching inquiries answered directly via WhatsApp within 24 hours.',
      ar: 'يتم الرد على استفسارات التدريب الأونلاين مباشرة عبر الواتساب خلال 24 ساعة.'
    }
  },
  footerNotice: {
    en: 'Professional 100% online fitness coaching. Real guidance, tailored protocols, sustainable results.',
    ar: 'تدريب لياقة بدنية أونلاين 100%. برامج علمية مخصصة، إشراف حقيقي، ونتائج مستدامة.'
  },
  disclaimer: {
    en: 'Disclaimer: All fitness coaching and nutritional guidance provided by Coach Omar Elgafary are designed for healthy individuals. Please consult your physician before undertaking any rigorous exercise or dietary change. All online coaching is conducted remotely.',
    ar: 'إخلاء مسؤولية: البرامج التدريبية والإرشادات الغذائية المقدمة من كوتش عمر الجعفري موجهة للأفراد الأصحاء. يُنصح باستشارة الطبيب المختص قبل البدء بأي نظام تمرين أو تعديل غذائي جذري. كافة خدمات التدريب والمتابعة تتم أونلاين عن بعد.'
  },
  privacyNotice: {
    en: 'Privacy Commitment: Client photographs, biometric measurements, and communications are held strictly confidential and never shared without prior explicit authorization.',
    ar: 'سياسة الخصوصية: صور المشتركين وقياساتهم البدنية ومحادثاتهم تُعامل بسرية تامة ولا يتم نشر أي محتوى دون إذن مسبق وصريح.'
  }
};
