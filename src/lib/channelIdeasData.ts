// SanadTube Channel Ideas & Benchmark Data
// Sources:
// 1. YouTube Official Monetization Documentation: https://support.google.com/youtube/answer/9314357
// 2. AIR Media-Tech Benchmark Study (300 monetized channels, May 2025 - May 2026): https://air.io/en/air-data-findings/youtube-monetization-statistics-2026
// 3. AIR Media-Tech Shorts RPM Study (274 channels, 2026): https://air.io/en/air-data-findings/what-is-youtube-shorts-rpm-in-your-niche-in-2026

export interface NicheBenchmark {
  nicheKey: string;
  nicheNameAr: string;
  medianRpm: number;
  p25Rpm: number;
  p75Rpm: number;
  shortsRpmMedian: number;
  shortsRpmMin: number;
  shortsRpmMax: number;
  estimatedCpm: number;
  sampleSize: number;
  confidenceLevel: 'موثوقية مرتفعة' | 'موثوقية متوسطة' | 'موثوقية منخفضة';
  studyPeriod: string;
  sourceName: string;
  sourceUrl: string;
}

export const NICHE_BENCHMARKS: Record<string, NicheBenchmark> = {
  education_science: {
    nicheKey: 'education_science',
    nicheNameAr: 'التعليم والعلوم',
    medianRpm: 10.22,
    p25Rpm: 2.31,
    p75Rpm: 19.50,
    shortsRpmMedian: 0.18,
    shortsRpmMin: 0.05,
    shortsRpmMax: 0.45,
    estimatedCpm: 18.50,
    sampleSize: 42,
    confidenceLevel: 'موثوقية مرتفعة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  transport_automotive: {
    nicheKey: 'transport_automotive',
    nicheNameAr: 'النقل والسيارات',
    medianRpm: 5.69,
    p25Rpm: 3.17,
    p75Rpm: 9.81,
    shortsRpmMedian: 0.12,
    shortsRpmMin: 0.03,
    shortsRpmMax: 0.35,
    estimatedCpm: 10.40,
    sampleSize: 18,
    confidenceLevel: 'موثوقية متوسطة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  lifestyle_productivity: {
    nicheKey: 'lifestyle_productivity',
    nicheNameAr: 'أسلوب الحياة والإنتاجية',
    medianRpm: 2.98,
    p25Rpm: 1.77,
    p75Rpm: 5.24,
    shortsRpmMedian: 0.09,
    shortsRpmMin: 0.02,
    shortsRpmMax: 0.28,
    estimatedCpm: 5.80,
    sampleSize: 35,
    confidenceLevel: 'موثوقية مرتفعة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  news_analysis: {
    nicheKey: 'news_analysis',
    nicheNameAr: 'الأخبار والتحليلات',
    medianRpm: 2.60,
    p25Rpm: 1.79,
    p75Rpm: 3.62,
    shortsRpmMedian: 0.08,
    shortsRpmMin: 0.02,
    shortsRpmMax: 0.22,
    estimatedCpm: 5.10,
    sampleSize: 22,
    confidenceLevel: 'موثوقية متوسطة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  crafts_diy: {
    nicheKey: 'crafts_diy',
    nicheNameAr: 'الحرف والأعمال اليدوية والمنزل',
    medianRpm: 2.39,
    p25Rpm: 1.00,
    p75Rpm: 3.90,
    shortsRpmMedian: 0.11,
    shortsRpmMin: 0.03,
    shortsRpmMax: 0.32,
    estimatedCpm: 4.80,
    sampleSize: 26,
    confidenceLevel: 'موثوقية متوسطة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  tech_software: {
    nicheKey: 'tech_software',
    nicheNameAr: 'التقنية والبرمجيات',
    medianRpm: 2.33,
    p25Rpm: 0.70,
    p75Rpm: 3.71,
    shortsRpmMedian: 0.14,
    shortsRpmMin: 0.04,
    shortsRpmMax: 0.40,
    estimatedCpm: 5.20,
    sampleSize: 38,
    confidenceLevel: 'موثوقية مرتفعة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  food_cooking: {
    nicheKey: 'food_cooking',
    nicheNameAr: 'الطعام والطبخ الصحي',
    medianRpm: 2.25,
    p25Rpm: 1.50,
    p75Rpm: 3.11,
    shortsRpmMedian: 0.07,
    shortsRpmMin: 0.02,
    shortsRpmMax: 0.20,
    estimatedCpm: 4.50,
    sampleSize: 31,
    confidenceLevel: 'موثوقية مرتفعة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  business_finance: {
    nicheKey: 'business_finance',
    nicheNameAr: 'الأعمال والتمويل الحقيقي',
    medianRpm: 2.01,
    p25Rpm: 0.73,
    p75Rpm: 5.17,
    shortsRpmMedian: 0.16,
    shortsRpmMin: 0.05,
    shortsRpmMax: 0.65,
    estimatedCpm: 7.20,
    sampleSize: 40,
    confidenceLevel: 'موثوقية مرتفعة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  health_wellness: {
    nicheKey: 'health_wellness',
    nicheNameAr: 'الصحة والعافية الوقائية',
    medianRpm: 1.23,
    p25Rpm: 0.72,
    p75Rpm: 1.53,
    shortsRpmMedian: 0.06,
    shortsRpmMin: 0.02,
    shortsRpmMax: 0.18,
    estimatedCpm: 2.80,
    sampleSize: 19,
    confidenceLevel: 'موثوقية متوسطة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  },
  history_civilization: {
    nicheKey: 'history_civilization',
    nicheNameAr: 'التاريخ والحضارات والوثائقيات',
    medianRpm: 3.45,
    p25Rpm: 1.85,
    p75Rpm: 6.20,
    shortsRpmMedian: 0.10,
    shortsRpmMin: 0.03,
    shortsRpmMax: 0.30,
    estimatedCpm: 6.90,
    sampleSize: 24,
    confidenceLevel: 'موثوقية متوسطة',
    studyPeriod: 'مايو 2025 – مايو 2026',
    sourceName: 'AIR Media-Tech Study 2026',
    sourceUrl: 'https://air.io/en/air-data-findings/youtube-monetization-statistics-2026'
  }
};

export interface UserGoal {
  id: string;
  label: string;
  badge: string;
  description: string;
  primarySort: string;
  weightings: {
    monetization: number;
    demand: number;
    competition: number;
    productionEase: number;
    sustainability: number;
    diversity: number;
  };
}

export const USER_GOALS: UserGoal[] = [
  {
    id: 'max_profit',
    label: 'أعلى ربحية ممكنة',
    badge: 'RPM و رعايات',
    description: 'التركيز على المجالات ذات العائد المالي الأعلى لكل ألف مشاهدة، وفرص الرعايات المباشرة والتسويق بالعمولة.',
    primarySort: 'highest_rpm',
    weightings: { monetization: 0.45, demand: 0.15, competition: 0.10, productionEase: 0.10, sustainability: 0.10, diversity: 0.10 }
  },
  {
    id: 'max_views',
    label: 'الوصول إلى أكبر عدد من المشاهدات',
    badge: 'انتشار واسع',
    description: 'استهداف موضوعات جماهيرية ذات بحث ضخم وقابلية عالية للانتشار في الاقتراحات والشورتس.',
    primarySort: 'highest_demand',
    weightings: { monetization: 0.15, demand: 0.45, competition: 0.10, productionEase: 0.15, sustainability: 0.10, diversity: 0.05 }
  },
  {
    id: 'fastest_growth',
    label: 'أسرع نمو للقناة',
    badge: 'وتيرة سريعة',
    description: 'مجالات يسهل فيها كسب أول 1,000 مشترك وساعات المشاهدة في وقت قياسي بفضل ترابط الجمهور.',
    primarySort: 'fastest_growth',
    weightings: { monetization: 0.20, demand: 0.35, competition: 0.20, productionEase: 0.15, sustainability: 0.05, diversity: 0.05 }
  },
  {
    id: 'engaged_community',
    label: 'بناء جمهور ومجتمع متفاعل',
    badge: 'ولاء مجتمعي',
    description: 'صناعة محتوى قيمي وثيق الصلة يبني علاقة طويلة الأمد مع المتابعين ومعدلات تعليق ومشاركة قياسية.',
    primarySort: 'highest_sustainability',
    weightings: { monetization: 0.20, demand: 0.20, competition: 0.15, productionEase: 0.15, sustainability: 0.20, diversity: 0.10 }
  },
  {
    id: 'sustainable_income',
    label: 'تحقيق دخل مستمر على المدى الطويل',
    badge: 'محتوى دائم (Evergreen)',
    description: 'فيديوهات لا تفقد قيمتها بمرور السنين وتستمر في جلب المشاهدات والأرباح التراكمية لسنوات.',
    primarySort: 'highest_sustainability',
    weightings: { monetization: 0.30, demand: 0.20, competition: 0.15, productionEase: 0.10, sustainability: 0.20, diversity: 0.05 }
  },
  {
    id: 'lowest_cost',
    label: 'إنشاء قناة بأقل تكلفة ممكنة',
    badge: 'ميزانية صفرية',
    description: 'أفكار يمكنك إطلاقها اليوم باستخدام هاتفك الذكي وبرامج مجانية فقط دون استوديو أو كاميرات باهظة.',
    primarySort: 'lowest_cost',
    weightings: { monetization: 0.15, demand: 0.20, competition: 0.15, productionEase: 0.35, sustainability: 0.10, diversity: 0.05 }
  },
  {
    id: 'faceless_channel',
    label: 'إنشاء قناة دون الظهور أمام الكاميرا',
    badge: 'Faceless Channel',
    description: 'قنوات تعتمد على التعليق الصوتي الهادئ، المشاهد الأرشيفية، الرسوم البيانية، واللقطات التوضيحية.',
    primarySort: 'best_faceless',
    weightings: { monetization: 0.25, demand: 0.25, competition: 0.10, productionEase: 0.25, sustainability: 0.10, diversity: 0.05 }
  },
  {
    id: 'ai_assisted',
    label: 'الاستفادة من الذكاء الاصطناعي في الإنتاج',
    badge: 'أدوات ذكية',
    description: 'توظيف أدوات المونتاج الآلي وكتابة المسودات والبحث السريع لتسريع وتيرة النشر دون تكرار سطحي.',
    primarySort: 'best_ai',
    weightings: { monetization: 0.20, demand: 0.25, competition: 0.15, productionEase: 0.25, sustainability: 0.10, diversity: 0.05 }
  },
  {
    id: 'business_venture',
    label: 'قناة يمكن تحويلها إلى مشروع تجاري',
    badge: 'منتجات وخدمات',
    description: 'قنوات تستهدف فئة مهتمة بالشراء؛ تسهل بيع منتجات مادية أو رقمية، استشارات، أو دورات تخصصية.',
    primarySort: 'best_business',
    weightings: { monetization: 0.35, demand: 0.20, competition: 0.15, productionEase: 0.10, sustainability: 0.10, diversity: 0.10 }
  },
  {
    id: 'minimal_effort',
    label: 'أفضل نتائج بأقل وقت وجهد',
    badge: 'كفاءة زمنية',
    description: 'تنسيقات محتوى رشيقة وسريعة الإعداد تمكنك من الاستمرار بنشر أسبوعي منتظم حتى مع وجود وظيفة أخرى.',
    primarySort: 'easiest_production',
    weightings: { monetization: 0.15, demand: 0.20, competition: 0.15, productionEase: 0.35, sustainability: 0.10, diversity: 0.05 }
  }
];

export interface ChannelIdeaEpisode {
  title: string;
  hook: string;
  keyTakeaway: string;
}

export interface DetailedChannelIdea {
  id: string;
  title: string;
  tagline: string;
  category: string;
  subCategory: string;
  coverImage: string;
  description: string;
  targetAudience: string;
  difficulty: 'سهل' | 'متوسط' | 'متقدم';
  
  // Financial metrics
  benchmarkKey: string;
  longFormRpmMedian: number;
  longFormRpmP25: number;
  longFormRpmP75: number;
  shortsRpmMedian: number;
  shortsRpmMin: number;
  shortsRpmMax: number;
  estimatedCpm: number;
  profitabilityTier: 'استثنائي' | 'مرتفع' | 'متوسط' | 'اقتصادي';
  revenueStreams: string[];
  
  // Growth & Demand
  demandVolume: 'مرتفع' | 'متوسط' | 'منخفض';
  competitionLevel: 'منخفض' | 'متوسط' | 'مرتفع';
  growthSpeed: 'سريعة جداً' | 'سريعة' | 'متوسطة' | 'بطيئة';
  demandNature: 'دائم (Evergreen)' | 'موسمي' | 'ترند';
  sustainabilityScore: number;
  
  // Production
  cameraAppearance: 'بدون ظهور' | 'ظهور جزئي' | 'ظهور كامل';
  voiceType: 'تعليق صوتي' | 'صوت مباشر' | 'بدون تعليق';
  productionCost: 'مجانية' | 'منخفضة' | 'متوسطة' | 'مرتفعة';
  productionTime: 'أقل من ساعة' | 'من 1 إلى 3 ساعات' | 'من ساعة إلى 3 ساعات' | 'من 3 إلى 6 ساعات' | 'أكثر من 6 ساعات';
  equipmentRequired: 'هاتف فقط' | 'هاتف وميكروفون' | 'كاميرا ومعدات أساسية' | 'استوديو احترافي';
  aiAssistanceSuitability: 'مرتفع' | 'متوسط' | 'منخفض';
  editingDifficulty: 'سهلة' | 'متوسطة' | 'متقدمة';
  primaryFormat: 'فيديوهات طويلة' | 'Shorts' | 'YouTube Shorts' | 'مزيج من الصيغ';
  
  // Target market
  targetRegion: string;
  targetAge: string;
  soundtrackStrategy: string;
  dataConfidence: 'موثوقية مرتفعة' | 'موثوقية متوسطة' | 'موثوقية منخفضة';
  sampleNotes: string;
  
  // Deep Blueprint
  overviewReason: string;
  marketAnalysisDetails: string;
  monetizationRoadmap: string;
  thirtyDayPlan: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
  hasAiDuplicationWarning?: boolean;
  
  episodes: ChannelIdeaEpisode[];
}

export const DETAILED_CHANNEL_IDEAS: DetailedChannelIdea[] = [
  {
    id: 'idea-01',
    title: 'سيرة المدن — روائع العمارة والتاريخ',
    tagline: 'وثائقيات بصرية ترصد عبقرية البناء، أسرار تخطيط المدن العريقة، وحكايات الأسواق القديمة',
    category: 'تاريخ وحضارات',
    subCategory: 'وثائقيات العمارة والتراث',
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    description: 'قناة متخصصة في إنتاج وثائقيات سينمائية تستعرض كيف صمدت المدن القديمة كالقدس، وقرطبة، ودمشق، وبغداد، والدرعية، مع التركيز على الهندسة المائية، العمارة الفاطمية والأندلسية، ونمط الحياة اليومي الراقي لأجدادنا دون صخب أو لغة مبتذلة.',
    targetAudience: 'عشاق الوثائقيات، طلاب العمارة، ومحبو التاريخ الإنساني الرصين',
    difficulty: 'متوسط',
    benchmarkKey: 'history_civilization',
    longFormRpmMedian: 3.45,
    longFormRpmP25: 1.85,
    longFormRpmP75: 6.20,
    shortsRpmMedian: 0.10,
    shortsRpmMin: 0.03,
    shortsRpmMax: 0.30,
    estimatedCpm: 6.90,
    profitabilityTier: 'مرتفع',
    revenueStreams: [
      'إعلانات YouTube AdSense',
      'YouTube Premium',
      'الرعايات والإعلانات المباشرة Sponsorships',
      'بيع الكتب الإلكترونية',
      'بيع المنتجات الرقمية'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'متوسط',
    growthSpeed: 'سريعة',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 96,
    cameraAppearance: 'بدون ظهور',
    voiceType: 'تعليق صوتي',
    productionCost: 'منخفضة',
    productionTime: 'من 3 إلى 6 ساعات',
    equipmentRequired: 'هاتف وميكروفون',
    aiAssistanceSuitability: 'متوسط',
    editingDifficulty: 'متوسطة',
    primaryFormat: 'مزيج من الصيغ',
    targetRegion: 'دول الخليج والشرق الأوسط والعالم',
    targetAge: '25–44',
    soundtrackStrategy: 'مؤثرات صوتية محيطية حقيقية (حفيف الأشجار، جريان المياه، أصوات النقش على الحجر، صدى الأسواق القديمة) مع إلقاء صوتي فصيح وهادئ.',
    dataConfidence: 'موثوقية متوسطة',
    sampleNotes: 'مبنية على عينة من 24 قناة وثائقية وثقافية بمتوسط RPM $3.45',
    overviewReason: 'الجمهور العربي متعطش للوثائقيات ذات الإنتاج الراقي التي تعتز بالتراث دون تزييف، وهي من أعلى مجالات الاحتفاظ بالجمهور (Retention).',
    marketAnalysisDetails: 'المنافسة منخفضة في الجودة السينمائية العالية؛ معظم القنوات تقدم قراءة رتيبة من ويكيبيديا، بينما التركيز على زوايا العمارة والقصص الإنسانية يشكل فجوة سوقية هائلة.',
    monetizationRoadmap: 'تحقيق شروط YPP خلال 4 إلى 6 أشهر، متبوعاً برعايات شركات التطوير العقاري والمتاحف الثقافية ومبيعات ألبومات الصور والمطبوعات التاريخية.',
    thirtyDayPlan: {
      week1: 'تحديد الهوية البصرية، واختيار أول 3 مدن عريقة مع تجميع لقطات الأرشيف ومكتبات المشاهد المجانية.',
      week2: 'تسجيل التعليق الصوتي لـ 3 حلقات باحترافية وتوليد الخرائط التوضيحية المتحركة ثلاثية الأبعاد.',
      week3: 'مونتاج أول مقطع كامل بطول 15 دقيقة مع تقطيع 3 مقاطع Shorts جاذبة منه تمهيداً للنشر.',
      week4: 'إطلاق القناة بجدول نشر أسبوعي ثابت، ودراسة تفاعل المشاهدين مع أول 30 ثانية لتطوير الهوك.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'كيف هندس الأجداد دورة مياه وتبريد طبيعية في قصر الحمراء قبل 700 عام؟',
        hook: 'في قلب غرناطة، نافورة تعمل بدون مضخة كهربائية منذ قرون بحسابات فيزيائية مذهلة!',
        keyTakeaway: 'شرح مبسط لنظام السقاية الأندلسي العبقري وأساليب العزل الحراري.'
      },
      {
        title: 'أسرار بناء سور دمشق القديم: بوابات لم تسقط في أصعب الحصارات',
        hook: 'سبعة أبواب أسطورية، كل باب له سر استراتيجي وحكاية غيرت مصير المنطقة.',
        keyTakeaway: 'الربط بين التخطيط العسكري وحماية الحركة التجارية للمدنيين.'
      },
      {
        title: 'العمارة النجدية الأصيلة: كيف تغلب الطين والخشب على قيظ الصحراء؟',
        hook: 'جدران سميكة ونوافذ ذكية تُبقي الداخل بارداً صيفاً ودافئاً شتاءً بأبسط المواد الطبيعية.',
        keyTakeaway: 'استلهام دروس البناء المستدام الصديق للبيئة في عصرنا الحديث.'
      },
      {
        title: 'أسواق بغداد في العصر الذهبي: كيف كانت تُدار التجارة والنزاهة التعاقدية؟',
        hook: 'نظام الحسبة وفحص المكاييل والموازين الذي منع الاحتكار قبل مئات السنين.',
        keyTakeaway: 'أخلاقيات السوق والتعاملات التجارية النزيهة وأثرها على ازدهار المجتمع.'
      },
      {
        title: 'جامع القرويين بفاس: أقدم جامعة في العالم مستمرة حتى اليوم',
        hook: 'سيدة واحدة أوقفت كل ثروتها لبناء صرح علمي تخرج منه كبار فلاسفة وعلماء الشرق والغرب.',
        keyTakeaway: 'أهمية الوقف المعرفي والتعليمي في بقاء الحضارات ونمو الأمم.'
      },
      {
        title: 'عبقرية سنان باشا: كيف قاومت مبانيه الزلازل العنيفة لأكثر من 500 عام؟',
        hook: 'المهندس الذي وضع مفاصل مرنة تحت قواعد المآذن لتتحرك مع الهزات الأرضية دون أن تنكسر!',
        keyTakeaway: 'قواعد الهندسة المقاومة للزلازل في التراث الإسلامي.'
      },
      {
        title: 'حكاية خان الخليلي: ملتقى قوافل الحرير والتوابل من أقاصي آسيا إلى القاهرة',
        hook: 'ممرات ضيقة شهدت صفقات تجارية ضخمة غيرت اقتصاد البحر المتوسط بأكمله.',
        keyTakeaway: 'كيف صُممت الخانات القديمة لحماية التجار وبضائعهم بالمجان.'
      },
      {
        title: 'مدينة شبام حضرموت: مانهاتن الصحراء وأول ناطحات سحاب طينية في التاريخ',
        hook: 'مبانٍ طينية بارتفاع 8 طوابق صامدة منذ 600 سنة في قلب الرمال الحارقة!',
        keyTakeaway: 'معجزة البناء الطيني وقوة الطمي المعالج بأشعة الشمس.'
      },
      {
        title: 'قناطر المياه الرومانية والإسلامية: كيف قطعت المياه جبالاً لتصل لبيوت العامة؟',
        hook: 'جريان الماء بانحدار ملليمتر واحد لكل كيلومتر عبر مسافات شاسعة بدون أي محركات.',
        keyTakeaway: 'حسابات الميل الهيدروليكي وإتاحة المياه النظيفة كحق إنساني عام.'
      },
      {
        title: 'القلاع الصحراوية: كيف وفرت الأمن والإمداد لرحلات الحج والتجارة الدولية؟',
        hook: 'محطات إمداد متكاملة بالآبار والمؤن شُيدت على أبعاد يوم سير كامل في قلب القفار.',
        keyTakeaway: 'اللوجستيات والتخطيط الجغرافي لحماية شرايين الحياة البرية.'
      }
    ]
  },
  {
    id: 'idea-02',
    title: 'المستثمر الواعي — ثروة مستدامة بلا ديون',
    tagline: 'دليل تأسيس المشاريع المنتجة، إدارة المال الأسري، والاستثمار في الأصول الملموسة',
    category: 'المال والأعمال',
    subCategory: 'التمويل الشخصي والاستثمار',
    coverImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80',
    description: 'قناة تثقيف مالي تطرح حلولاً عملية للاستقلال المالي بعيداً عن فخ القروض الاستهلاكية والربوية، والمضاربات الرقمية الوهمية، والرهانات. تركز على نماذج التجارة الحقيقية، المشروعات المنزلية المجدية، دراسات الجدوى الميدانية، والاستثمار في الأصول الآمنة كالعقار والذهب والمصانع الصغيرة.',
    targetAudience: 'الشباب، أرباب الأسر، ورواد الأعمال الباحثون عن دخل نقي ومستدام',
    difficulty: 'سهل',
    benchmarkKey: 'business_finance',
    longFormRpmMedian: 2.01,
    longFormRpmP25: 0.73,
    longFormRpmP75: 5.17,
    shortsRpmMedian: 0.16,
    shortsRpmMin: 0.05,
    shortsRpmMax: 0.65,
    estimatedCpm: 7.20,
    profitabilityTier: 'استثنائي',
    revenueStreams: [
      'الرعايات والإعلانات المباشرة Sponsorships',
      'الخدمات والاستشارات',
      'بيع المنتجات الرقمية',
      'التسويق بالعمولة Affiliate Marketing',
      'إعلانات YouTube AdSense'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'مرتفع',
    growthSpeed: 'سريعة جداً',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 98,
    cameraAppearance: 'ظهور جزئي',
    voiceType: 'صوت مباشر',
    productionCost: 'منخفضة',
    productionTime: 'من ساعة إلى 3 ساعات',
    equipmentRequired: 'هاتف وميكروفون',
    aiAssistanceSuitability: 'منخفض',
    editingDifficulty: 'سهلة',
    primaryFormat: 'مزيج من الصيغ',
    targetRegion: 'دول الخليج والشرق الأوسط',
    targetAge: '25–44',
    soundtrackStrategy: 'أصوات توضيحية لرسومات الشاشة البيانية (Whoosh, Click) وبيئة نقاش احترافية هادئة ونقية بدون مشتتات.',
    dataConfidence: 'موثوقية مرتفعة',
    sampleNotes: 'بيانات دراسة AIR لـ 40 قناة مالية وتجارية. RPM قد يتجاوز $8 في مشاهدات دول الخليج.',
    overviewReason: 'الوعي المالي الصحيح المبني على الاقتصاد الحقيقي هو أندر وأثمن ما يبحث عنه المتابع العربي الذي تعب من دورات الثراء السريع الزائفة.',
    marketAnalysisDetails: 'السوق مشبع بنصائح التداول عالي المخاطر، لكنه يفتقر بشدة للمحتوى الهادئ والواقعي الذي يعلم الناس بناء أصول حقيقية وإدارة نفقات البيت بوعي.',
    monetizationRoadmap: 'إمكانية تحقيق دخل سريع من الاستشارات والدورات التدريبية حتى قبل بلوغ 5,000 مشترك، نظراً للقدرة الشرائية المرتفعة للجمهور.',
    thirtyDayPlan: {
      week1: 'تجهيز قوالب إكسل ميزانية مجانية لتوزيعها كهدية ترحيبية للمشاهدين.',
      week2: 'تصوير أول 4 حلقات تشرح أخطاء الديون الاستهلاكية وكيفية الخروج منها.',
      week3: 'نشر حلقتين أسبوعياً مع مقتطفات شورتس تلخص أهم الأفكار على مدار الأسبوع.',
      week4: 'إطلاق استبيان لمتابعة احتياجات الجمهور وتجهيز أول كتيب إرشادي رقمي مدفوع.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'قاعدة الأظرف الأربعة: كيف تُدير دخل أسرتك دون أن تحتاج لأي استدانة؟',
        hook: '90% من الأزمات المالية ليست بسبب قلة الدخل، بل بسبب فوضى المصروفات غير المحسوبة.',
        keyTakeaway: 'نظام عملي ومرن لتقسيم الدخل إلى ادخار حقيقي، وتكاليف تشغيلية، وتطوير.'
      },
      {
        title: 'مقارنة شاملة: شراء الذهب مقابل العقار المدر للدخل في فترات التضخم',
        hook: 'أيهما يحمي القوة الشرائية لعائلتك بشكل أفضل خلال السنوات الخمس القادمة؟',
        keyTakeaway: 'فهم الفارق بين حفظ رأس المال واستثماره لإنتاج تدفقات نقدية مستمرة.'
      },
      {
        title: '5 مشاريع إنتاجية صغيرة يمكنك بدؤها من منزلك برأس مال أقل من 5,000 ريال',
        hook: 'التجارة الحقيقية تقوم على سد احتياج حقيقي في حيك أو مدينتك، وليست مجرد إعلانات وهمية.',
        keyTakeaway: 'خطوات اختيار المنتج، التسعير العادل، وبناء ثقة العملاء الأولى.'
      },
      {
        title: 'كيف تفحص الأسهم وتتأكد من نقاء نشاط الشركة وخلوها من الديون المحرمة؟',
        hook: 'معايير تدقيق القوائم المالية للتفريق بين الشركات المنتجة والشركات القائمة على الإقراض.',
        keyTakeaway: 'أدوات مجانية لقراءة نسب الديون ونشاط الشركة الرئيسي قبل وضع أي ريال.'
      },
      {
        title: 'أخلاقيات البيع والشراء: كيف تبني علامة تجارية يثق بها الناس لأجيال؟',
        hook: 'الصدق في عيوب السلعة هو أسرع طريق لكسب عملاء مخلصين يعودون دائماً.',
        keyTakeaway: 'البركة والأمانة في المعاملات كأقوى استراتيجية تسويقية طويلة المدى.'
      },
      {
        title: 'صناديق المؤشرات المتداولة (ETFs) النقية: الدليل المبسط للمبتدئين',
        hook: 'كيف تمتلك حصة صغيرة في أكبر 100 شركة دون الحاجة لمتابعة الشاشات كل دقيقة؟',
        keyTakeaway: 'الاستثمار التراكمي الهادئ ومنهجية الشراء الشهري المنتظم.'
      },
      {
        title: 'كيف تشتري عقارك الأول دون أن تدفع ضعف ثمنه في فوائد بنكية؟',
        hook: 'حيل التفاوض وخطط التوفير المسبق وتجنب الشراء في ذروة الفقاعات العقارية.',
        keyTakeaway: 'حساب العائد الصافي الحقيقي للعقار بعد الصيانة والضرائب والرسوم.'
      },
      {
        title: 'بناء صندوق الطوارئ: الدرع المالي الذي يمنحك نوماً هادئاً كل ليلة',
        hook: 'كم شهراً من نفقاتك يجب أن تكون في حسابك الجاري قبل أن تفكر في أي استثمار؟',
        keyTakeaway: 'الأمان المالي النفسي كخطوة أولى وأساسية قبل المخاطرة بأي رأس مال.'
      },
      {
        title: 'التسويق الشفهي الصادق: كيف تجعل جودة خدمتك تتحدث عنك مجاناً؟',
        hook: 'الشركات الكبرى تنفق الملايين على الإعلانات، بينما الشركات الذكية تركز على إبهار أول 100 عميل.',
        keyTakeaway: 'بناء ولاء العملاء وتخفيض تكلفة الاستحواذ إلى الصفر تقريباً.'
      },
      {
        title: 'أسرار الشراكة التجارية الناجحة: كيف تكتب اتفاقاً يحمي الود والمال؟',
        hook: 'أغلب الشراكات تفشل ليس بسبب الخسارة، بل بسبب غموض توزيع المهام والأرباح منذ اليوم الأول.',
        keyTakeaway: 'عقد الشراكة الواضح وفصل الإدارة التنفيذية عن ملكية الحصص.'
      }
    ]
  },
  {
    id: 'idea-03',
    title: 'أسرار الطبيعة وعجائب الخلق',
    tagline: 'تأملات مرئية بدقة 4K في أدق تفاصيل عالم الحيوان، النبات، والمحيطات',
    category: 'التعليم والعلوم',
    subCategory: 'العلوم وعجائب الطبيعة',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'قناة تجمع بين الدقة العلمية والسرد التأملي الهادئ لعجائب الطبيعة والحياة الفطرية. تستعرض التعاون بين الكائنات الحية، تقنيات التمويه، دورات المياه، وميكانيكا الطيران عند الطيور بأسلوب يجذب الطفل والأب في آن واحد، ومناسب للعرض العائلي دون أي مشاهد خادشة أو صخب.',
    targetAudience: 'كافة أفراد العائلة، الطلاب، والمعلمون',
    difficulty: 'متوسط',
    benchmarkKey: 'education_science',
    longFormRpmMedian: 10.22,
    longFormRpmP25: 2.31,
    longFormRpmP75: 19.50,
    shortsRpmMedian: 0.18,
    shortsRpmMin: 0.05,
    shortsRpmMax: 0.45,
    estimatedCpm: 18.50,
    profitabilityTier: 'استثنائي',
    revenueStreams: [
      'إعلانات YouTube AdSense',
      'بيع المنتجات الرقمية',
      'YouTube Premium',
      'العضويات المدفوعة',
      'الشراكات التجارية'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'متوسط',
    growthSpeed: 'سريعة',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 99,
    cameraAppearance: 'بدون ظهور',
    voiceType: 'تعليق صوتي',
    productionCost: 'منخفضة',
    productionTime: 'من 3 إلى 6 ساعات',
    equipmentRequired: 'هاتف وميكروفون',
    aiAssistanceSuitability: 'متوسط',
    editingDifficulty: 'متوسطة',
    primaryFormat: 'مزيج من الصيغ',
    targetRegion: 'جمهور عالمي وعربي',
    targetAge: '18–44',
    soundtrackStrategy: 'أصوات الطبيعة النقية (حفيف الرياح، أمواج البحر، تغريد الطيور النادرة، دقات المطر) المسجلة بأعلى درجات النقاء الصوتي.',
    dataConfidence: 'موثوقية مرتفعة',
    sampleNotes: 'تصنيف التعليم والعلوم سجل أعلى وسيط RPM ($10.22) في دراسة AIR Media-Tech بفضل ارتفاع وقت المشاهدة.',
    overviewReason: 'المحتوى العلمي والتأملي يحظى بأعلى ثقة أسرية ومدارسية ومعدلات مشاهدة متكررة على شاشات التلفاز الذكية في المنازل.',
    marketAnalysisDetails: 'المشاهدات المكتسبة تدوم لسنوات طويلة دون انخفاض لأن معلومات الطبيعة لا تتقادم كالأخبار أو الألعاب.',
    monetizationRoadmap: 'دخل إعلاني استثنائي من يوتيوب، بالإضافة لبيع حقائب تعليمية للأطفال وتطبيقات ألعاب ذاكرة علمية.',
    thirtyDayPlan: {
      week1: 'اختيار 5 كائنات حية مدهشة وجمع مقاطع الطبيعة بدقة 4K من المنصات المفتوحة مع كتابة نصوص علمية موثقة.',
      week2: 'تسجيل الصوت بنبرة وثائقية تأملية عميقة ومطابقة التعليق على تفاصيل حركة الكائنات.',
      week3: 'تصميم صور مصغرة ذات تباين بصري عالٍ تُظهر لقطات ماكرو مدهشة لعيون الكائنات أو أجنحتها.',
      week4: 'نشر حلقة أسبوعية مطولة ونشر نسختين عموديتين Shorts لكل حلقة لاستقطاب الجيل الجديد.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'مملكة النحل: كيف تدير 60,000 نحلة مدينتها المعمارية بدقة متناهية بلا قائد مرئي؟',
        hook: 'مهندسون فحصوا أشكال الخلية السداسية واكتشفوا أنها الحل الرياضي الوحيد لاستهلاك أقل شمع بأكبر سعة!',
        keyTakeaway: 'دروس النظام، العمل الجماعي، والتعاون الفطري البديع.'
      },
      {
        title: 'حيتان الأعماق المظلمة: كيف تتواصل على مسافة 4,000 كيلومتر تحت الماء؟',
        hook: 'في ظلام دامس وبرودة قارسة، تصدر موجات صوتية ترددية تجوب المحيطات كلها.',
        keyTakeaway: 'فيزياء الصوت تحت الماء وإتقان الصنع في تكيّف الكائنات البحرية.'
      },
      {
        title: 'بذور تسافر آلاف الأميال: أسرار الطيران الشراعي في النباتات',
        hook: 'قبل أن يخترع الإنسان مظلات الهبوط بقرون، كانت هذه النبتة تنثر بذورها بمظلات نانوية دقيقة!',
        keyTakeaway: 'تصميم النباتات وحفظ التنوع البيئي في أصعب الصحاري.'
      },
      {
        title: 'عالم النمل الخفي: مزارعون يزرعون الفطر ويربون حشرات المن تحت الأرض',
        hook: 'مجتمعات معقدة تمتلك مخازن مكيفة، طرقات سريعة، ومستشفيات ميدانية لعلاج المصابين!',
        keyTakeaway: 'التنظيم المدهش وأساليب تخزين الحبوب لمنع إنباتها تحت الأرض.'
      },
      {
        title: 'معجزة الغلاف الجوي: كيف يحمي درعنا السماوي الأرض من 100 طن نيازك يومياً؟',
        hook: 'طبقات متتالية تسحق الصخور الفضائية وتسمح فقط للضوء النافع بالمرور لسطح الأرض.',
        keyTakeaway: 'التوازن الدقيق لنسب الغازات والضغط الجوي لحفظ حياة الإنسان.'
      },
      {
        title: 'رؤية الصقور: كيف يرى الطائر الجارح حركة فأر صغير من ارتفاع 2,000 متر؟',
        hook: 'عدسات عين تمتلك تكبيراً بصرياً فائقاً ودقة تفوق أحدث كاميرات العالم بأميال.',
        keyTakeaway: 'بصريات عين الصقر وميكانيكا التحديق أثناء الانقضاض السريع.'
      },
      {
        title: 'أسرار هجرة الطيور: بوصلة مغناطيسية داخل خلايا الدماغ ترشدها عبر القارات',
        hook: 'طائر يقطع المحيط الهادئ 8 أيام متواصلة بلا توقف أو نوم أو طعام ويعود لنفس الشجرة بدقة سنتيمتر واحد!',
        keyTakeaway: 'الملاحة المغناطيسية الفطرية ودقة التوقيت في مواسم الهجرة.'
      },
      {
        title: 'لغة الأشجار الخفية: كيف تحذر الغابة بعضها عند هجوم الآفات عبر شبكات الجذور؟',
        hook: 'شبكة فطرية متصلة تحت أقدامنا تنقل الإشارات الكيميائية بين الأشجار كأنه إنترنت طبيعي!',
        keyTakeaway: 'التكافل بين الفطريات والأشجار وحماية التنوع الغابي.'
      },
      {
        title: 'عجائب أعماق الخنادق البحرية: كائنات تعيش تحت ضغط يسحق الحديد الصلب',
        hook: 'حرارة تقترب من التجمد وضغط مائي خيالي، ومع ذلك تضيء هذه المخلوقات بأجسامها ناصعة الجمال.',
        keyTakeaway: 'الإضاءة الحيوية Bioluminescence والتكيف الكيميائي مع الضغط الهائل.'
      },
      {
        title: 'دورة الماء المعجزة: كيف تنقل السحب تريليونات الأطنان من العذب فوق البحار المالحة؟',
        hook: 'محطة تحلية مائية عملاقة تعمل بالطاقة الشمسية وتغذي قارات العالم بانتظام لا يختل.',
        keyTakeaway: 'دقة دورة التبخر والتكثف والرياح كأعظم نظام لوجستي عرفته الأرض.'
      }
    ]
  },
  {
    id: 'idea-04',
    title: 'مهندس البيت — مهارات الاكتفاء والعمل اليدوي',
    tagline: 'دليل عملي للزراعة المنزلية، صيانة الأجهزة، النجارة، وتوفير تكاليف الحياة',
    category: 'المنزل والتصميم',
    subCategory: 'الأعمال اليدوية والزراعة المنزلية',
    coverImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    description: 'محتوى تطبيقي يعيد للشباب والرجال قيمة العمل اليدوي والاعتماد على الذات. دروس واضحة في استغلال الأسطح والبلكونات لإنتاج الخضروات العضوية، صيانة السباكة والكهرباء الأساسية، صنع الأثاث البسيط بخشب البالت، وتقليل الهدر المنزلي بطرق ذكية وممتعة.',
    targetAudience: 'أرباب المنازل، الشباب، وهواة الأعمال اليدوية والزراعة العضوية',
    difficulty: 'سهل',
    benchmarkKey: 'crafts_diy',
    longFormRpmMedian: 2.39,
    longFormRpmP25: 1.00,
    longFormRpmP75: 3.90,
    shortsRpmMedian: 0.11,
    shortsRpmMin: 0.03,
    shortsRpmMax: 0.32,
    estimatedCpm: 4.80,
    profitabilityTier: 'متوسط',
    revenueStreams: [
      'التسويق بالعمولة Affiliate Marketing',
      'بيع المنتجات المادية',
      'إعلانات YouTube AdSense',
      'الرعايات والإعلانات المباشرة Sponsorships'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'منخفض',
    growthSpeed: 'سريعة',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 97,
    cameraAppearance: 'ظهور جزئي',
    voiceType: 'صوت مباشر',
    productionCost: 'منخفضة',
    productionTime: 'من ساعة إلى 3 ساعات',
    equipmentRequired: 'هاتف فقط',
    aiAssistanceSuitability: 'منخفض',
    editingDifficulty: 'سهلة',
    primaryFormat: 'مزيج من الصيغ',
    targetRegion: 'الشرق الأوسط والخليج',
    targetAge: '25–45 فأكثر',
    soundtrackStrategy: 'أصوات بيئة الورشة الطبيعية وأصوات أدوات العمل (صوت المنشار اليدوي، ري التربة، تدفق الماء) لتجربة حسية غامرة (ASMR طبيعي).',
    dataConfidence: 'موثوقية متوسطة',
    sampleNotes: 'دراسة AIR لـ 26 قناة حرف وDIY. يعوض انخفاض الـ RPM بقوة دخل التسويق بالعمولة لأدوات الصيانة.',
    overviewReason: 'تكاليف الصيانة المنزلية والعمالة تزداد عالمياً؛ محتوى "افعلها بنفسك" يوفر أموالاً حقيقية للناس ويبني ثقة جارفة بصاحب القناة.',
    marketAnalysisDetails: 'المحتوى العربي في هذا المجال قليل جداً مقارنة بالمحتوى الغربي، وفرص الصدارة فيه هائلة وسهلة جداً.',
    monetizationRoadmap: 'روابط تسويق بالعمولة لعدد الصيانة وبذور الزراعة في وصف كل فيديو، ومراجعات مدفوعة لمعدات الحدائق.',
    thirtyDayPlan: {
      week1: 'تجهيز ركن صغير في المنزل أو البلكونة وتصوير فيديو مبسط عن الأدوات الأساسية التي يجب أن يمتلكها كل بيت.',
      week2: 'تصوير فيديو زراعة الطماطم والنعناع في أوعية بلاستيكية معاد تدويرها خطوة بخطوة.',
      week3: 'تصوير فيديو إصلاح أشهر 3 أعطال سباكة منزلية توفر تكلفة استدعاء فني صيانة.',
      week4: 'نشر مقاطع Shorts توضح النتيجة النهائية قبل وبعد العمل لجذب آلاف المشاهدات في أيام معدودة.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'ازرع خضروات سلطتك بالكامل على سطح منزلك بمساحة 2 متر مربع فقط!',
        hook: 'كيف تنتج طماطم، ونعناع، وجرجير عضوي طازج أسبوعياً بأقل تكلفة ودون الحاجة لتربة زراعية ثقيلة.',
        keyTakeaway: 'أساسيات الزراعة المائية والتربة البديلة (Cocopeat) في المنازل.'
      },
      {
        title: 'دليل إصلاح تسريبات المياه الشائعة في المنزل وتوفير 50% من الفاتورة',
        hook: 'قطعة مطاطية قيمتها ريالات معدودة قد تسبب هدر آلاف اللترات شهرياً دون أن تنتبه!',
        keyTakeaway: 'فهم أجزاء المحابس، العوامات، وتغيير مانعات التسريب بنفسك بأمان.'
      },
      {
        title: 'اصنع مكتب دراسة متيناً من خشب البالت بتكلفة لا تتجاوز 100 ريال',
        hook: 'تحويل الأخشاب المهملة إلى قطع أثاث راقية تنافس المتاجر الفاخرة بعد السنفرة والدهان الطبيعي.',
        keyTakeaway: 'مهارات القياس، التثبيت، واستخدام الزيوت الطبيعية لحماية الخشب.'
      },
      {
        title: 'صناعة السماد العضوي (الكومبوست) من بقايا مطبخك دون أي روائح كريهة',
        hook: 'تحويل قشور الخضار وبقايا الشاي والقهوة إلى غذاء ذهبي يُنعش نباتاتك مجاناً.',
        keyTakeaway: 'التوازن بين المواد الكربونية (البنية) والمواد النيتروجينية (الخضراء).'
      },
      {
        title: 'صيانة مكيفات الهواء الدورية: خطوات تنظيف الفلاتر ورفع كفاءة التبريد',
        hook: 'طريقة بسيطة تستغرق 20 دقيقة تزيد من برودة الغرفة وتقلل استهلاك الكهرباء بنسبة ملحوظة.',
        keyTakeaway: 'إرشادات السلامة، تنظيف أنابيب التصريف، والحفاظ على عمر الجهاز.'
      },
      {
        title: 'دليل اختيار مثقاب الحفر (الدريل) المناسب لاحتياجات بيتك دون دفع مبالغ زائدة',
        hook: 'الفرق الحقيقي بين دريل الشحن ودريل الكهرباء وماذا تعني أرقام الفولت والعزم.',
        keyTakeaway: 'شراء المعدة الصحيحة التي تدوم معك 10 سنوات على الأقل.'
      },
      {
        title: 'تجديد دهان الجدران القديمة: أسرار معالجة الشقوق وسر استواء الرول',
        hook: 'كيف تعيد طلاء غرفتك كالمحترفين في عطلة نهاية أسبوع واحدة بلا فوضى وبأقل تكلفة.',
        keyTakeaway: 'استخدام معجون الشقوق، شريط الحماية، والطلاء المائي عديم الرائحة.'
      },
      {
        title: 'زراعة شجرة ليمون قزمة في أصيص منزلي تثمر طوال العام',
        hook: 'العناية بالحمضيات على البلكونة: ساعات الشمس، التسميد بالحديد، ومواعيد الري الصحيحة.',
        keyTakeaway: 'كيفية تحفيز التزهير ومنع تساقط الثمار الصغيرة في المنازل.'
      },
      {
        title: 'إصلاح كراسي وطاولات المنزل المتخلخلة وتقويتها للأبد',
        hook: 'لا ترمِ أثاثك الخشبي المفضل؛ قطعتان من الزوايا المعدنية وغراء الخشب سيعيدانه أقوى من الجديد!',
        keyTakeaway: 'تقنيات ربط المفاصل الخشبية وتثبيت البراغي بشكل مخفي.'
      },
      {
        title: 'تركيب رفوف ديكور حائطية مخفية تتحمل الأوزان الثقيلة بأمان تام',
        hook: 'كيف تعلق أثقل الكتب دون أن تظهر مسامير التثبيت ودون أن تخاطر بسقوط الرف.',
        keyTakeaway: 'استخدام ميزان الماء واستخدام خوابير التثبيت (الفيشر) المناسبة لنوع الجدار.'
      }
    ]
  },
  {
    id: 'idea-05',
    title: 'البيت الدافئ — فنون التربية وبناء الشخصية',
    tagline: 'حلول نفسية وتربوية ناضجة للتعامل مع تحديات المراهقة، تقليل الشاشات، وتعزيز الترابط الأسري',
    category: 'أسلوب الحياة',
    subCategory: 'التربية الأسرية وتطوير الذات',
    coverImage: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=800&q=80',
    description: 'قناة موجهة للآباء والأمهات والمربين لغرس القيم الفاضلة كالصدق، والشجاعة، وحفظ الأمانة، والبر بالوالدين بأساليب حوارية ذكية بعيدة عن الصراخ والضرب. تناقش القضايا المعاصرة كعزلة المراهقين، ومخاطر التطبيقات الإلكترونية، وسبل صناعة بيئة منزلية مفعمة بالثقة والمحبة.',
    targetAudience: 'الآباء، الأمهات، المعلمون، والمقبلون على الزواج',
    difficulty: 'متوسط',
    benchmarkKey: 'lifestyle_productivity',
    longFormRpmMedian: 2.98,
    longFormRpmP25: 1.77,
    longFormRpmP75: 5.24,
    shortsRpmMedian: 0.09,
    shortsRpmMin: 0.02,
    shortsRpmMax: 0.28,
    estimatedCpm: 5.80,
    profitabilityTier: 'مرتفع',
    revenueStreams: [
      'الخدمات والاستشارات',
      'بيع الكتب الإلكترونية',
      'بيع الدورات التدريبية',
      'إنشاء مجتمع مدفوع',
      'إعلانات YouTube AdSense'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'متوسط',
    growthSpeed: 'سريعة',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 98,
    cameraAppearance: 'ظهور كامل',
    voiceType: 'صوت مباشر',
    productionCost: 'منخفضة',
    productionTime: 'من ساعة إلى 3 ساعات',
    equipmentRequired: 'هاتف وميكروفون',
    aiAssistanceSuitability: 'منخفض',
    editingDifficulty: 'سهلة',
    primaryFormat: 'مزيج من الصيغ',
    targetRegion: 'الوطن العربي ودول الخليج',
    targetAge: '25–45 فأكثر',
    soundtrackStrategy: 'بيئة استوديو صوتي دافئة جداً مع فواصل إيقاعية طبيعية ونغمات خافتة تحفز التفكير الإيجابي والسكينة.',
    dataConfidence: 'موثوقية مرتفعة',
    sampleNotes: 'دراسة AIR لـ 35 قناة نمط حياة وتربية. تمتاز بنسبة مشاركة عالية جداً بين الأمهات والآباء.',
    overviewReason: 'الآباء في العصر الحديث يعانون من غربة رقمية مع أبنائهم ويبحثون بلهفة عن إرشادات موثوقة تعيد الدفء لبيوتهم.',
    marketAnalysisDetails: 'المحتوى التربوي الرصين القائم على حلول علمية وعاطفية هادئة يندر مقارنة بالمحتوى السطحي، وهو مطلوب بقوة من أسر الخليج والمهجر.',
    monetizationRoadmap: 'استشارات أسرية مدفوعة بالساعة، ورش عمل افتراضية عبر Zoom للمقبلين على الزواج، واشتراكات نوادي قراءة تربوية.',
    thirtyDayPlan: {
      week1: 'تحديد 10 أسئلة ملحة يسألها الآباء حول شاشات الهواتف وعناد الأطفال.',
      week2: 'تصوير 3 فيديوهات بأسلوب الحوار الودي المباشر بكرسي مريح وخلفية منزلية هادئة.',
      week3: 'توزيع جداول متابعة سلوكية مجانية للطباعة في الوصف لبناء قائمة بريدية نشطة.',
      week4: 'إطلاق أول بث مباشر أسبوعي للإجابة على تساؤلات المتابعين وتوطيد الصلة بالمجتمع.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'كيف تكسر حاجز الصمت مع ابنك المراهق وتبدأ حواراً حقيقياً بلا عتاب؟',
        hook: 'لماذا يُغلق المراهق باب غرفته بمجرد دخولك؟ والخطأ الأول الذي يرتكبه 80% من الآباء في أول 5 دقائق.',
        keyTakeaway: 'فن الاستماع الفعال وطرح الأسئلة المفتوحة التي تبني الثقة والصداقة.'
      },
      {
        title: 'خطة عملية لتقليل استخدام الشاشات والألعاب في المنزل دون صراخ أو مشاحنات',
        hook: 'الأطفال لا يتخلون عن الهاتف إلا إذا وجدوا بديلاً أكثر إثارة وحضوراً حقيقياً من والديهم.',
        keyTakeaway: 'جدول البدائل الحركية، المشاريع الأسرية المشتركة، وقواعد الشاشات المتفق عليها.'
      },
      {
        title: 'كيف تبني في طفلك احترام الكلمة والصدق حتى في أصعب المواقف؟',
        hook: 'إذا خاف الطفل من العقوبة الشديدة سيتعلم الكذب ليحمي نفسه.. كيف نعلمه أن الصدق هو الأمان؟',
        keyTakeaway: 'الفصل بين تصحيح الخطأ وتقدير شجاعة الاعتراف بالحق.'
      },
      {
        title: 'الذكاء العاطفي بين الزوجين: كيف تحمي بيتك من التوتر اليومي وضغوط الحياة؟',
        hook: 'الكلمة الطيبة والتقدير المتبادل ليسا رفاهية، بل هما جدار الحماية الأول لاستقرار الأبناء النفسي.',
        keyTakeaway: 'إدارة الخلافات بحكمة بعيداً عن أعين الأطفال، وتبادل الدعم الإيجابي.'
      },
      {
        title: 'تربية الطفل على المسؤولية والاعتماد على النفس من سن 6 سنوات',
        hook: 'الطفل الذي يُخدَم في كل شيء يكبر وهو يشعر بالاستحقاقية والعجز عن مواجهة الحياة.',
        keyTakeaway: 'مهام منزلية متدرجة تمنح الطفل شعوراً بالإنجاز والمكانة داخل الأسرة.'
      },
      {
        title: 'علاج نوبات الغضب والعناد عند الأطفال من سن سنتين إلى خمس سنوات',
        hook: 'لماذا يصرخ طفلك في الأسواق؟ وكيف تنهي المشهد في 60 ثانية بهدوء مذهل.',
        keyTakeaway: 'تسمية المشاعر، الاحتواء الجسدي، وتفادي الاستجابة للابتزاز بالبكاء.'
      },
      {
        title: 'كيف تحمي أبناءك من التنمر في المدرسة وتمنحهم ثقة حديدية بأنفسهم؟',
        hook: 'المتنمر يختار الضحية التي تظهر الارتباك؛ علّم ابنك لغة الجسد ونبرة الصوت الرادعة.',
        keyTakeaway: 'تدريبات محاكاة منزلية للمواقف المحرجة وسبل التواصل مع إدارة المدرسة.'
      },
      {
        title: 'التربية بالحب والحدود: التوازن الذهبي بين الحنان المفرط والقسوة الضارة',
        hook: 'الحب دون حدود يُنتج طفلاً مدللاً، والحدود بلا حب تُنتج طفلاً مكسوراً.',
        keyTakeaway: 'صياغة قواعد منزلية واضحة وثابتة تطبق بلطف وحزم متزامنين.'
      },
      {
        title: 'فن صناعة الذكريات الأسرية: طقوس صغيرة تجعل أبناءك يتذكرون بيتك بكل دفء',
        hook: 'جلسة الشاي الأسبوعية، نزهة الصباح الباكر، ومشاريع الطبخ المشتركة التي لا تُنسى.',
        keyTakeaway: 'بناء الانتماء العائلي الذي يحمي الأبناء من الانجراف خلف التيارات الخارجية.'
      },
      {
        title: 'المحافظة على صلاة الأبناء بحب واشتياق دون مطاردة أو نزاع يومي',
        hook: 'القدوة الصامتة ومشاركة السجود في البيت تصنع ما لا تصنعه ألف موعظة متكررة.',
        keyTakeaway: 'التدرج الصبور، ربط الصلاة بالراحة والشكر، ومكافأة الالتزام الهادئ.'
      }
    ]
  },
  {
    id: 'idea-06',
    title: 'كود وابتكار — تكنولوجيا تبني وتخدم',
    tagline: 'شروحات برمجية لبناء تطبيقات عملية وحلول رقمية حقيقية تحل مشاكل الناس اليومية',
    category: 'التكنولوجيا والذكاء الاصطناعي',
    subCategory: 'البرمجة وأدوات الذكاء الاصطناعي',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'قناة برمجية تركز على تحويل التقنية إلى أداة نفع وبناء بدلاً من التشتت والاستهلاك الأعمى. تركز على هندسة البرمجيات النظيفة، بناء تطبيقات الويب السريعة باستخدام Next.js وPython، أتمتة مهام العمل، وتوظيف الذكاء الاصطناعي في مساعدة أصحاب المشاريع الصغيرة في أرشفة وتنظيم أعمالهم.',
    targetAudience: 'المبرمجون، طلاب الحاسب، والمهتمون بالتقنية النافعة',
    difficulty: 'متقدم',
    benchmarkKey: 'tech_software',
    longFormRpmMedian: 2.33,
    longFormRpmP25: 0.70,
    longFormRpmP75: 3.71,
    shortsRpmMedian: 0.14,
    shortsRpmMin: 0.04,
    shortsRpmMax: 0.40,
    estimatedCpm: 5.20,
    profitabilityTier: 'استثنائي',
    revenueStreams: [
      'الرعايات والإعلانات المباشرة Sponsorships',
      'بيع المنتجات الرقمية',
      'الخدمات والاستشارات',
      'بيع الدورات التدريبية',
      'التسويق بالعمولة Affiliate Marketing'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'متوسط',
    growthSpeed: 'متوسطة',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 95,
    cameraAppearance: 'بدون ظهور',
    voiceType: 'صوت مباشر',
    productionCost: 'مجانية',
    productionTime: 'من 3 إلى 6 ساعات',
    equipmentRequired: 'هاتف وميكروفون',
    aiAssistanceSuitability: 'مرتفع',
    editingDifficulty: 'سهلة',
    primaryFormat: 'فيديوهات طويلة',
    targetRegion: 'عالمي والشرق الأوسط',
    targetAge: '18–34',
    soundtrackStrategy: 'أصوات نقر لوحة المفاتيح المريحة (Mechanical Keyboard ASMR) مع صوت شرح نقي وعالي التركيز دون أي مؤثرات مشوشة.',
    dataConfidence: 'موثوقية مرتفعة',
    sampleNotes: 'دراسة AIR لـ 38 قناة تقنية. RPM البرمجة المتخصصة يرتفع كثيراً مع الرعايات السحابية والوظائف.',
    overviewReason: 'المبرمجون والشركات مستعدون لدفع مبالغ كبيرة مقابل الشروحات المتخصصة التي توفر ساعات تطوير شاقة.',
    marketAnalysisDetails: 'معظم القنوات تشرح الأساسيات النظرية؛ القنوات التي تشرح بناء مشاريع حقيقية متكاملة من الصفر للإنتاج تحظى بمتابعة نادرة.',
    monetizationRoadmap: 'رعايات منصات الاستضافة (Vercel, Supabase, Cloudflare) وبيع قوالب SaaS مفتوحة المصدر واستشارات بناء الأنظمة.',
    thirtyDayPlan: {
      week1: 'تحديد فكرة مشروع متكامل لحل مشكلة متجر محلي وتجهيز كود البداية على GitHub.',
      week2: 'تسجيل الحلقات الأولى بجودة صوت كريستالية وتوضيح هيكل المشروع وبناء الواجهات.',
      week3: 'ربط قاعدة البيانات والمصادقة الأمنية وشرح الأخطاء الشائعة وحلولها بصراحة.',
      week4: 'نشر التطبيق على خادم حقيقي وتوفير الكود مجاناً مع رابط استشارات للراغبين في ميزات مخصصة.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'بناء نظام إدارة مخزون ومبيعات لمحل تجاري محلي باستخدام Next.js وSupabase مجاناً',
        hook: 'كيف تنقذ تاجراً صغيراً من فوضى الدفاتر الورقية عبر تطبيق ويب مبسط يعمل على الهاتف والكمبيوتر.',
        keyTakeaway: 'تصميم قواعد البيانات، جداول الفواتير، ونظام الحماية والصلاحيات.'
      },
      {
        title: 'أتمتة الأعمال باستخدام بايثون: قراءة الفواتير وتلخيصها في جدول إكسل بضغطة زر',
        hook: 'وفر 10 ساعات عمل أسبوعية من الإدخال اليدوي المتكرر باستخدام سكريبت ذكي من 40 سطراً فقط!',
        keyTakeaway: 'التعامل مع ملفات PDF، استخراج النصوص، وحفظ البيانات المنظمة.'
      },
      {
        title: 'دليل الأمان الرقمي وحماية خصوصية بيانات عائلتك من التجسس والتتبع',
        hook: 'ماذا تعرف عنك التطبيقات المجانية؟ وكيف تضبط إعدادات الراوتر وجوالات أطفالك بأمان؟',
        keyTakeaway: 'استخدام بروتوكولات التشفير، مدراء كلمات المرور، وفلاتر حجب المحتوى غير اللائق.'
      },
      {
        title: 'كيف توظف نماذج الذكاء الاصطناعي مفتوحة المصدر على جهازك المحلي دون اتصال بالإنترنت؟',
        hook: 'استفد من قوة الذكاء الاصطناعي مع الحفاظ التام على سرية وخصوصية مستنداتك وملفاتك.',
        keyTakeaway: 'تثبيت Ollama وتشغيل النماذج اللغوية محلياً بكفاءة وسرعة.'
      },
      {
        title: 'بناء منصة تبرعات وتكافل مجتمعي لحيّك السكني خطوة بخطوة',
        hook: 'التقنية في خدمة الجار: كيف تربط المتبرعين بالمحتاجين بشفافية وحفظ لكرامة الأسر.',
        keyTakeaway: 'معايير الأمان، الدفع الإلكتروني الموثق، وتحديث الحالات المحتاجة.'
      },
      {
        title: 'تسريع مواقع الويب 10 أضعاف: أسرار تحسين SEO وسرعة الاستجابة في Next.js',
        hook: 'كل ثانية تأخير في تحميل متجرك تضيع 20% من مبيعاتك المحتملة؛ إليك الحل البرمجي الجذري.',
        keyTakeaway: 'تحسين أحجام الصور، ضغط الحزم البرمجية، والتصيير المسبق الذكي.'
      },
      {
        title: 'صناعة بوت واتساب لخدمة العملاء والرد التلقائي على الاستفسارات المتكررة',
        hook: 'كيف تجعل محلك يعمل 24 ساعة للرد على استفسارات الأسعار والمواعيد دون تعيين موظف إضافي.',
        keyTakeaway: 'استخدام WhatsApp Cloud API وربطه بـ Webhook مبسط.'
      },
      {
        title: 'أفضل ممارسات كتابة كود نظيف (Clean Code) يفهمه أي مبرمج يقرأه بعدك',
        hook: 'الفرق بين المبرمج الهاوي والمحترف ليس في كثرة السطور بل في وضوحها وسهولة صيانتها.',
        keyTakeaway: 'تسمية المتغيرات، الدوال أحادية الوظيفة، واختبارات الوحدة المبسطة.'
      },
      {
        title: 'دليل اختيار البنية السحابية المناسبة لمشروعك الناشئ بتكلفة 0 دولار في البداية',
        hook: 'كيف تستفيد من المستويات المجانية السخية للشركات السحابية قبل أن تدفع دولاراً واحداً.',
        keyTakeaway: 'المقارنة بين قواعد بيانات Serverless وحلول التخزين السحابي الآمن.'
      },
      {
        title: 'كيف تبني تطبيق هاتف محمول لنظامي أندرويد وiOS بكود واحد في عطلة أسبوع؟',
        hook: 'تعلم كيف تحول فكرة تطبيق مفيد إلى واقع بين أيدي الناس باستخدام React Native Expo.',
        keyTakeaway: 'إعداد البيئة، التنقل بين الشاشات، ورفع التطبيق للمتاجر الرسمية.'
      }
    ]
  },
  {
    id: 'idea-07',
    title: 'دقيقة حكمة — أفكار مكثفة في 60 ثانية',
    tagline: 'شورتس عمودي سريع يقدم خلاصة فكرة لغوية، أدبية، أو حكمة عملية تغير يومك',
    category: 'التعليم والعلوم',
    subCategory: 'الثقافة العامة والشورتس',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    description: 'قناة متخصصة في فيديوهات YouTube Shorts فائقة الجاذبية والنفع. مدة كل مقطع 45 إلى 60 ثانية، تطرح تصحيحاً لخطأ لغوي شائع، أو سراً بلاغياً في اللغة العربية، أو قاعدة نفسية لتنظيم اليوم، أو قصة مثل عربي شهير. تمتاز بمعدل إكمال مشاهدة مرتفع جداً وتفاعل واسع بين الأجيال الشابة.',
    targetAudience: 'مستخدمو الهواتف المحمولة والشباب الباحثون عن وجبات معرفية سريعة',
    difficulty: 'سهل',
    benchmarkKey: 'education_science',
    longFormRpmMedian: 10.22,
    longFormRpmP25: 2.31,
    longFormRpmP75: 19.50,
    shortsRpmMedian: 0.18,
    shortsRpmMin: 0.05,
    shortsRpmMax: 0.45,
    estimatedCpm: 12.00,
    profitabilityTier: 'متوسط',
    revenueStreams: [
      'إعلانات YouTube AdSense',
      'صندوق YouTube Shorts',
      'بيع الكتب الإلكترونية',
      'الرعايات والإعلانات المباشرة Sponsorships'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'مرتفع',
    growthSpeed: 'سريعة جداً',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 94,
    cameraAppearance: 'بدون ظهور',
    voiceType: 'تعليق صوتي',
    productionCost: 'مجانية',
    productionTime: 'أقل من ساعة',
    equipmentRequired: 'هاتف فقط',
    aiAssistanceSuitability: 'مرتفع',
    editingDifficulty: 'سهلة',
    primaryFormat: 'YouTube Shorts',
    targetRegion: 'كافة أرجاء الوطن العربي',
    targetAge: '18–34',
    soundtrackStrategy: 'مؤثرات بصرية وصوتية دقيقة (Whoosh, Pop, Page Flip) مع إلقاء صوتي جذاب وواضح بلغة عربية فصيحة وممتعة.',
    dataConfidence: 'موثوقية متوسطة',
    sampleNotes: 'دراسة Shorts 2026 تثبت تراوح أرباح الشورتس بين $0.02 و$0.45 لكل ألف مشاهدة في المحتوى المعرفي.',
    overviewReason: 'عصر السرعة يتطلب تقديم المعرفة القيمة بجرعات مكثفة تثير شغف المتابع وتجعل وقت تصفح الهاتف نافعاً.',
    marketAnalysisDetails: 'الشورتس هو المحرك الأول لاكتساب المشتركين اليوم في خوارزميات YouTube وتسهيل انتشار القناة للوصول لملايين المشاهدين.',
    monetizationRoadmap: 'الاعتماد على حجم المشاهدات المليونية في الشورتس، واستثمار الجمهور في بيع كتب رقمية ملخصة وبودكاست مطول.',
    thirtyDayPlan: {
      week1: 'جمع 30 خطأ لغوي شائع أو حكمة تراثية وكتابة سكريبت 50 كلمة لكل مقطع.',
      week2: 'تسجيل الصوت دفعة واحدة في جلسة ساعتين مع تجهيز قوالب المونتاج الرأسية السريعة.',
      week3: 'نشر مقطع واحد يومياً في ساعة الذروة (بين 7 و 10 مساءً بتوقيت مكة).',
      week4: 'تحليل نسبة المشاهدة مقابل التخطي (Viewed vs Swiped away) ومضاعفة الأفكار التي تحقق أكثر من 80% إكمال.'
    },
    hasAiDuplicationWarning: true, // Warn against pure robotic auto-generated text without personal curation
    episodes: [
      {
        title: 'ما الفرق بين "الصمت" و "السكوت" في لسان العرب؟',
        hook: 'تظنهما كلمة واحدة؟ أحدهما حكمة واختيار والآخر عجز واضطرار!',
        keyTakeaway: 'دقة المعاجم العربية وجماليات الفروق اللغوية الدقيقة.'
      },
      {
        title: 'قاعدة الخمس ثوانٍ لكسر التسويف والبدء في عمل المهام المؤجلة فوراً',
        hook: 'عقلك يحتاج إلى 5 ثوانٍ فقط ليبدأ في اختلاق الأعذار.. كيف تسبقه وتبدأ العمل؟',
        keyTakeaway: 'طريقة نفسية مجربة للتغلب على الكسل والبدء الفوري.'
      },
      {
        title: 'قصة المثل الشهير: "على أهلها جنت براقش" في 45 ثانية!',
        hook: 'من هي براقش؟ ولماذا تسببت في إلحاق الضرر بقومها دون أن تقصد؟',
        keyTakeaway: 'أثر التهور وكشف الأسرار وأخذ العبرة من التراث القديم.'
      },
      {
        title: 'كيف تتذكر أسماء الأشخاص الذين تقابلهم لأول مرة بحيلة ذهنية بسيطة؟',
        hook: 'أكبر إحراج هو نسيان اسم الشخص بعد ثانيتين من مقابلته.. إليك الحل الذكي.',
        keyTakeaway: 'ربط الاسم بصورة ذهنية وتكراره في أول جملة ترحيبية.'
      },
      {
        title: 'أفضل استثمار في بداية العشرينات: مهارة واحدة تجعلك لا تخشى البطالة أبداً',
        hook: 'ليست البرمجة ولا التصميم.. بل مهارة التواصل وحل المشكلات المعقدة بهدوء.',
        keyTakeaway: 'التركيز على المهارات الأساسية الدائمة (Evergreen Skills).'
      },
      {
        title: 'الفرق بين "العام" و "السنة" في التعبير القرآني والبيان العربي',
        hook: 'لماذا يُستعمل أحدهما في الخير والرخاء والآخر في الشدة والجدب؟',
        keyTakeaway: 'إعجاز اختيار الألفاظ في لغة الضاد.'
      },
      {
        title: 'حيلة الدقيقتين: كيف تحافظ على مكتبك وبيتك منظماً طوال اليوم؟',
        hook: 'أي عمل يستغرق أقل من 120 ثانية، أنجزه في الحال ولا تؤجله لدقيقة واحدة!',
        keyTakeaway: 'منع تراكم الفوضى وحفظ صفاء الذهن للعمل العميق.'
      },
      {
        title: 'قصة بيت الشعر الأشهر: "إذا كنت ذا رأي فكن ذا عزيمة"',
        hook: 'أبو جعفر المنصور والموقف الحاسم الذي أنقذ ملكه بفضل قرار لم يتردد فيه.',
        keyTakeaway: 'الشجاعة في اتخاذ القرارات بعد المشورة ودراسة العواقب.'
      },
      {
        title: 'لماذا ينصح الأطباء بالمشي 10 دقائق فور الانتهاء من الوجبات الدسمة؟',
        hook: 'تخفيض قفزات السكر في الدم وتحسين الهضم دون الحاجة لأي أدوية.',
        keyTakeaway: 'العادات الصحية البسيطة ذات التأثير التراكمي الضخم.'
      },
      {
        title: 'السر الذي يجعل الشخص محبوباً بين زملائه دون تصنع أو تملق',
        hook: 'توقف عن الحديث عن نفسك، واسألهم بصدق واهتمام عن إنجازاتهم وتحدياتهم.',
        keyTakeaway: 'أسرار الكاريزما الأخلاقية وفن الاستماع الحقيقي.'
      }
    ]
  },
  {
    id: 'idea-08',
    title: 'المطبخ الطيب — أسرار الطهي الأصيل والصحة',
    tagline: 'وجبات منزلية متوازنة بالعودة للمكونات الطبيعية والزيوت الصحية والخبز المخمر',
    category: 'الطعام والطبخ',
    subCategory: 'الطبخ الصحي والاقتصادي',
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    description: 'قناة طهي ذات رسالة صحية وثقافية عالية تركز على العودة إلى الغذاء الحقيقي غير المعالج. وصفات مبتكرة باستخدام السمن البلدي وزيت الزيتون، تحضير الخبز بالخميرة البلدية الطبيعية (Sourdough)، وطرق حفظ الأطعمة وتخليلها طبيعياً لتقوية المناعة وميكروبيوم الأمعاء، مع احتساب التكاليف الاقتصادية لكل وجبة لتناسب كل ميزانية.',
    targetAudience: 'الأمهات، الشباب المغتربون، والمهتمون بالصحة والوقاية الغذائية',
    difficulty: 'سهل',
    benchmarkKey: 'food_cooking',
    longFormRpmMedian: 2.25,
    longFormRpmP25: 1.50,
    longFormRpmP75: 3.11,
    shortsRpmMedian: 0.07,
    shortsRpmMin: 0.02,
    shortsRpmMax: 0.20,
    estimatedCpm: 4.50,
    profitabilityTier: 'متوسط',
    revenueStreams: [
      'إعلانات YouTube AdSense',
      'الرعايات والإعلانات المباشرة Sponsorships',
      'بيع الكتب الإلكترونية',
      'بيع المنتجات المادية',
      'التسويق بالعمولة Affiliate Marketing'
    ],
    demandVolume: 'مرتفع',
    competitionLevel: 'مرتفع',
    growthSpeed: 'سريعة جداً',
    demandNature: 'دائم (Evergreen)',
    sustainabilityScore: 97,
    cameraAppearance: 'ظهور جزئي',
    voiceType: 'تعليق صوتي',
    productionCost: 'منخفضة',
    productionTime: 'من 1 إلى 3 ساعات',
    equipmentRequired: 'هاتف فقط',
    aiAssistanceSuitability: 'منخفض',
    editingDifficulty: 'سهلة',
    primaryFormat: 'مزيج من الصيغ',
    targetRegion: 'العالم العربي والمهجر',
    targetAge: '18–45 فأكثر',
    soundtrackStrategy: 'أصوات الطهي الواقعية الهادئة (صوت تقطيع الخضار الطازج، غليان الحساء، قرمشة الخبز الساخن) ASMR طعام طبيعي 100%.',
    dataConfidence: 'موثوقية مرتفعة',
    sampleNotes: 'دراسة AIR لـ 31 قناة طهي. يمتاز المحتوى الغذائي الصحي بعقود رعاية مربحة لمنتجات الزيوت والتمور والأغذية العضوية.',
    overviewReason: 'الأمراض العصرية دفعت ملايين الأسر للبحث عن بدائل صحية للوجبات السريعة والزيوت المهدرجة دون التخلي عن لذة المذاق الأصيل.',
    marketAnalysisDetails: 'قنوات الطبخ التقليدية كثيرة، لكن القنوات التي تجمع بين الطعم اللذيذ والأسس الصحية العلمية والتوفير المالي قليلة ومطلوبة جداً.',
    monetizationRoadmap: 'كتيبات وصفات رقمية مدفوعة لمتبعي الحميات الصحية، رعايات شركات زيت الزيتون والمطاحن العضوية، وإعلانات يوتيوب.',
    thirtyDayPlan: {
      week1: 'إعداد أول فيديو عن صنع الخميرة الطبيعية في البيت بالماء والدقيق فقط.',
      week2: 'تصوير 3 وجبات عائلية متكاملة تكفي 5 أفراد بتكلفة أقل من 30 ريال وبمكونات طازجة.',
      week3: 'نشر مقاطع شورتس سريعة مدتها 30 ثانية لكل وجبة لتحقيق انتشار سريع.',
      week4: 'إطلاق مسابقة شهرية لأفضل تطبيق للوصفة ومشاركة صور المتابعين في تبويب المجتمع.'
    },
    hasAiDuplicationWarning: false,
    episodes: [
      {
        title: 'اصنع خبز الخميرة الطبيعية (Sourdough) المقرمش في فرنك العادي دون عجانة',
        hook: 'لماذا لا يسبب هذا الخبز نفخة القولون؟ والسر في تخمير يدوم 24 ساعة يفكك الجلوتين المعقد!',
        keyTakeaway: 'طريقة تغذية البادئة وحساب نسب الترطيب الصحيحة للخبز الريفي.'
      },
      {
        title: 'تحضير السمن البلدي الطبيعي في المنزل من الزبدة غير المملحة بخطوات مضمونة',
        hook: 'كيف تتخلص من بروتينات الحليب وتحصل على دهن ذهبي نقي يتحمل درجات حرارة القلي العالية؟',
        keyTakeaway: 'درجة حرارة الطهي الهادئة وحفظ السمن لشهور طويلة خارج الثلاجة.'
      },
      {
        title: 'وجبة غداء متكاملة لـ 4 أفراد بـ 25 ريال فقط: عدس بالخضار وزيت الزيتون البكر',
        hook: 'قنبلة بروتين وألياف طبيعية تشعرك بالشبع لساعات طويلة وبطعم شرقي لا يقاوم.',
        keyTakeaway: 'التوازن بين البروتين النباتي والخضار الورقية والتوابل المعززة للهضم.'
      },
      {
        title: 'تخليل الزيتون والخيار بطريقة التخمير اللاكتيكي دون خل أو مواد حافظة',
        hook: 'بكتيريا البروبيوتيك الصديقة للأمعاء التي يمكنك إنتاجها في مطبخك بالماء والملح الخشن فقط.',
        keyTakeaway: 'نسبة الملوحة الدقيقة (3% إلى 5%) لمنع التعفن وحفظ القرمشة.'
      },
      {
        title: 'بدائل السكر البيضاء: كيف تحلي حلوياتك بالتمر والدبس الطبيعي دون تضحية بالمذاق؟',
        hook: 'كعكة الشوكولاتة الصحية التي يمكنك تقديمها لأطفالك وأنت مطمئن لعدم ارتفاع الأنسولين الحاد.',
        keyTakeaway: 'استخدام معجون التمر كمحلي ومكثف طبيعي في المخبوزات.'
      },
      {
        title: 'مرق العظام الذهبي: إكسير الكولاجين الطبيعي لصحة المفاصل وجدار الأمعاء',
        hook: 'كيف تطهو عظام البقر أو الدجاج على نار هادئة 12 ساعة لتستخلص كل المعادن الثمينة.',
        keyTakeaway: 'إضافة ملعقة خل تفاح للمساعدة في استخلاص الكالسيوم والكولاجين.'
      },
      {
        title: 'أسرار تحميص التوابل وطحنها طازجة: الفرق الذي يحول طعامك إلى مستوى المطاعم الفاخرة',
        hook: 'لماذا تفقد التوابل الجاهزة نكهتها في شهور؟ وكيف تحمي زيوتها العطرية في دقائق معدودة.',
        keyTakeaway: 'التحميص الجاف للكمون والكزبرة وحفظها في برطمانات زجاجية معتمة.'
      },
      {
        title: 'تجهيز وجبات الأسبوع الصحية في ساعتين فقط (Meal Prep) للعاملين والطلاب',
        hook: 'وفر وقت الطهي اليومي وتجنب طلبات المطاعم المكلفة بعلب زجاجية جاهزة للتسخين الفوري.',
        keyTakeaway: 'تخزين الخضار الورقية، سلق الحبوب، وتجهيز التتبيلات مسبقاً.'
      },
      {
        title: 'صناعة اللبنة البلدية والجبن القريش من الحليب الطازج بلا منفحة كيميائية',
        hook: 'طعم الأرياف الأصيل في شقتك السكنية بطريقة التصفية البسيطة بالقماش النظيف.',
        keyTakeaway: 'فصل مصل اللبن الغني بالبروتين واستخدامه في عجن المخبوزات.'
      },
      {
        title: 'مشروبات الشتاء الصحية: شاي الكرك الأصيل بالتوابل الحية والزنجبيل الدافئ',
        hook: 'بديل رائع للمشروبات المعلبة يرفع المناعة ويمنحك طاقة وحيوية في أيام البرد القارس.',
        keyTakeaway: 'غلي الهيل والقرنفل والقرفة مع حليب طبيعي وشاي أسود غير منكه.'
      }
    ]
  }
];
