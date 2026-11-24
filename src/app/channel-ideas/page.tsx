'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';

const RevenueCalculatorModal = dynamic(
  () => import('@/components/channel-ideas/RevenueCalculatorModal'),
  { ssr: false }
);
const IdeaDetailsModal = dynamic(
  () => import('@/components/channel-ideas/IdeaDetailsModal'),
  { ssr: false }
);
const ComparisonModal = dynamic(
  () => import('@/components/channel-ideas/ComparisonModal'),
  { ssr: false }
);

import {
  DETAILED_CHANNEL_IDEAS,
  DetailedChannelIdea,
  USER_GOALS,
} from '@/lib/channelIdeasData';

import {
  Sparkles,
  Compass,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Layers,
  Flame,
  Search,
  RotateCcw,
  Camera,
  Check,
  Calculator,
  ChevronLeft,
  Bot,
  User,
  ShieldCheck,
  Clock,
  Briefcase,
  Smartphone,
  Eye,
  Star,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  step?: number;
  thinkingNote?: string;
  selectedOptionLabel?: string;
}

export default function ChannelIdeasPage() {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // View Mode: 'chat' (AI Consultant) or 'library' (Directory)
  const [viewMode, setViewMode] = useState<'chat' | 'library'>('chat');

  // Conversation Machine State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [thinkingMessage, setThinkingMessage] = useState<string>('');

  // Deep Thinking Reasoning State (Simulated multi-stage cognitive AI)
  const [isDeepThinking, setIsDeepThinking] = useState<boolean>(false);
  const [deepThinkingProgress, setDeepThinkingProgress] = useState<number>(0);
  const [deepThinkingStage, setDeepThinkingStage] = useState<number>(0);
  const [deepThinkingElapsedTime, setDeepThinkingElapsedTime] = useState<number>(0);
  const [reportUrl, setReportUrl] = useState<string>('');

  // User Choices
  const [selectedGoal, setSelectedGoal] = useState<string>('max_profit');
  const [cameraChoice, setCameraChoice] = useState<string>('faceless');
  const [resourcesChoice, setResourcesChoice] = useState<string>('part_time');
  const [nicheChoice, setNicheChoice] = useState<string>('all');

  // Chat History
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'مرحباً بك. بصفتي مستشاراً لدراسة جدوى قنوات YouTube وتحليل نماذج الربح، سأساعدك في تحديد التخصص والمسار الأكثر جدوى واستدامة لظروفك الواقعية، بعيداً عن الوعود غير المحسوبة. سنحدد ذلك عبر 4 قرارات مباشرة دون كتابة نصوص. لنبدأ بالقرار الأول: ما هو هدفك الاستراتيجي الأساسي من القناة؟',
      step: 1,
    },
  ]);

  // Modals state
  const [calculatorIdea, setCalculatorIdea] = useState<DetailedChannelIdea | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [detailsIdea, setDetailsIdea] = useState<DetailedChannelIdea | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [comparedIdeaIds, setComparedIdeaIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Library mode states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Question 1 Options (Goals) - Single clear title only
  const goalOptions = [
    { id: 'max_profit', label: 'أعلى ربحية ممكنة (RPM وعقود رعاية)' },
    { id: 'faceless_channel', label: 'قناة بدون ظهور نهائياً (Faceless)' },
    { id: 'lowest_cost', label: 'أقل ميزانية ومعدات (هاتف ذكي فقط)' },
    { id: 'max_views', label: 'انتشار واسع ومشاهدات ضخمة' },
    { id: 'business_venture', label: 'بناء مشروع تجاري وبيع منتجات/خدمات' },
  ];

  // Question 2 Options (Camera Style) - Single clear title only
  const cameraOptions = [
    { id: 'faceless', label: 'بدون ظهور نهائياً (Faceless)' },
    { id: 'on_camera', label: 'ظهور مباشر أمام الكاميرا' },
    { id: 'flexible', label: 'مرن / أي أسلوب مناسب' },
  ];

  // Question 3 Options (Resources & Time) - Single clear title only
  const resourceOptions = [
    { id: 'part_time', label: '3 إلى 5 ساعات أسبوعياً (وقت جزئي)' },
    { id: 'medium', label: '6 إلى 15 ساعة أسبوعياً (التزام منتظم)' },
    { id: 'pro', label: 'أكثر من 20 ساعة أسبوعياً (تفرغ شبه كامل)' },
  ];

  // Question 4 Options (Niche Interests) - Single clear title only
  const nicheOptions = [
    { id: 'all', label: 'كل المجالات (اختر لي التخصص الأعلى جدوى)' },
    { id: 'المال والأعمال', label: 'المال والأعمال والاستثمار' },
    { id: 'التكنولوجيا والذكاء الاصطناعي', label: 'التكنولوجيا والذكاء الاصطناعي' },
    { id: 'تاريخ وحضارات', label: 'التاريخ والحضارات والوثائقيات' },
    { id: 'التعليم والعلوم', label: 'التعليم والعلوم وتبسيط المعرفة' },
  ];

  // Deep consultant analytical knowledge base per choice (No flattery, pure strategic advisory)
  const CONSULTANT_KNOWLEDGE: Record<string, Record<string, { analysis: string; nextQuestion: string; thinkingCue: string }>> = {
    step1: {
      max_profit: {
        analysis: 'استهداف الـ RPM المرتفع يضعك في صدارة القطاعات التي يدفع فيها المعلنون بين $10 و$22 لكل ألف مشاهدة (مثل التمويل، التقنية، واستشارات الأعمال). المعادلة هنا لا تتطلب ملايين المشاهدات؛ فـ 50,000 مشاهدة شهرياً متخصصة قد تحقق عائداً يفوق قنوات الترفيه ذات النصف مليون مشاهدة. التحدي الأساسي هو تقديم محتوى موثوق ودقيق يتجاوز السطحية.',
        nextQuestion: 'لتحديد نموذج العمل ونفقات الإنتاج: كيف تخطط لإدارة الظهور البصري أمام الكاميرا؟',
        thinkingCue: 'تحليل مصفوفة عوائد الـ CPM لقطاعات الأعمال والتقنية ومقارنة تكلفة الإنتاج...',
      },
      faceless_channel: {
        analysis: 'القنوات بدون ظهور تمتاز بقابلية أتمتة خط الإنتاج وتفويض المونتاج والتعليق الصوتي، وإمكانية بيع القناة لاحقاً كأصل تجاري. التحدي التشغيلي يتركز في التعويض عن تعبيرات الوجه بسرد قصصي متماسك (Storytelling) ومونتاج ديناميكي يحافظ على الاحتفاظ بالجمهور (Retention) فوق 45%.',
        nextQuestion: 'بناءً على اختيار نموذج عدم الظهور: كيف تفضل أسلوب التقديم والإخراج؟',
        thinkingCue: 'فحص تكاليف برامج المونتاج وبنوك المقاطع المرخصة ومؤشر بقاء المشاهد...',
      },
      lowest_cost: {
        analysis: 'البدء بأقل ميزانية هو الأسلوب الأفضل لاختبار السوق (Lean Validation) وتفادي المخاطرة برأس المال قبل إثبات اهتمام الجمهور. خوارزميات يوتيوب تعطي 80% من الوزن لجودة الفكرة ونقاء الصوت ومعدل النقر، بينما الكاميرات الاحترافية باهظة الثمن لا تعوض ضعف السيناريو.',
        nextQuestion: 'من زاوية التنفيذ العملي: ما هو أسلوب التقديم الذي ترغب باعتماده؟',
        thinkingCue: 'حساب نقطة التعادل المالي (Break-even) باستخدام الهاتف الذكي ومعدات أساسية...',
      },
      max_views: {
        analysis: 'استهداف المشاهدات الضخمة يوجه بوصلة المحتوى نحو الموضوعات الشعبية والقصصية سريعة الانتشار في الصفحة الرئيسية (Browse Features). متوسط عائد الألف مشاهدة (RPM) في هذا النمط يتراوح بين $1.5 و$4؛ بالتالي فإن نجاح النموذج يعتمد على وتيرة نشر سريعة وعناوين ذات جاذبية فضولية متقنة.',
        nextQuestion: 'لمطابقة هذا الانتشار مع أسلوب الإنتاج: كيف تفضل الظهور في مقاطعك؟',
        thinkingCue: 'تقييم كفاءة خوارزميات الاقتراح ومعدل النقر CTR المطلوب لتخطي 100 ألف مشاهدة...',
      },
      business_venture: {
        analysis: 'استخدام القناة كقمع بيعي (Sales Funnel) للمنتجات والخدمات هو النموذج الأكثر استقلالية عن تقلبات إعلانات AdSense؛ حيث تمثل الإعلانات عادة أقل من 20% فقط من إجمالي الدخل. هنا كل مشاهد مهتم يمثل عميلاً محتملاً بقيمة استثنائية، والمطلوب هو بناء سلطة معرفية واضحة وموثوقية في تقديم الحلول.',
        nextQuestion: 'بما أن الهدف بيعي واستثماري: ما هو أسلوب الظهور المفضل لبناء الثقة؟',
        thinkingCue: 'دراسة معدل التحويل (Conversion Rate) من مشاهد يوتيوب إلى مشترٍ للخدمات...',
      },
    },
    step2: {
      faceless: {
        analysis: 'عدم الظهور يلغي تماماً تكاليف الاستوديو ومعدات الإضاءة ورهبة الكاميرا، ويمنحك مرونة التسجيل في أي وقت. مفتاح النجاح هنا هو الصوت الواضح والمؤثرات البصرية التوضيحية (B-Roll) وحسن إدارة المواد المرخصة لتفادي أي قيود لحقوق الطبع والنشر.',
        nextQuestion: 'لضمان الاستمرارية وعدم الانقطاع بعد أشهر قليلة: كم ساعة يمكنك تخصيصها للمشروع أسبوعياً؟',
        thinkingCue: 'مراجعة معايير حقوق الطبع والملكية في يوتيوب وتأثير التعليق الصوتي على القبول...',
      },
      on_camera: {
        analysis: 'الظهور المباشر يختصر زمن بناء الثقة مع الجمهور للنصف، ويعزز ارتباط المتابع بشخصيتك، وهو الأسلوب المفضل للعلامات التجارية لدفع مبالغ رعاية (Sponsorships) أعلى. التكلفة هنا تشغيلية؛ تتطلب إعداد زاوية تصوير ثابتة وإضاءة متوازنة واستثمار وقت في الإلقاء.',
        nextQuestion: 'لحساب سقف الإنتاجية ومنع الإرهاق: كم ساعة تستطيع تكريسها أسبوعياً للبحث والتصوير والمونتاج؟',
        thinkingCue: 'حساب عائد الرعايات الشخصية ومعدل ولاء المشتركين للقنوات ذات الوجه المباشر...',
      },
      flexible: {
        analysis: 'المرونة في الظهور تتيح لك تطبيق النموذج الهجين (Hybrid Model): الظهور في المقدمة والخاتمة لترسيخ الهوية، والاعتماد على الشاشات والرسوم والمقاطع الأرشيفية في صلب الشرح. هذا الأسلوب هو الأعلى كفاءة في الحفاظ على تركيز المشاهد.',
        nextQuestion: 'لحساب خطة النشر بدقة: ما هو الوقت الفعلي الذي تستطيع الالتزام به كل أسبوع؟',
        thinkingCue: 'تحليل فاعلية الأسلوب الهجين في تقليل ساعات التصوير مع تعزيز البصمة الشخصية...',
      },
    },
    step3: {
      part_time: {
        analysis: '3 إلى 5 ساعات أسبوعياً تعني واقعياً إنتاج فيديو واحد متقن كل 10 إلى 14 يوماً، أو الاعتماد على فيديوهين قصيرين (Shorts) أسبوعياً لدفع النمو الأولي. يجب تجنب الموضوعات التي تتطلب بحثاً معقداً، والتركيز على قالب تحريري موحد وقابل للتكرار السريع.',
        nextQuestion: 'القرار الأخير لتحديد التخصص بدقة: في أي المجالات تمتلك معرفة مسبقة أو شغفاً مستداماً؟',
        thinkingCue: 'محاكاة دورة الإنتاج لـ 5 ساعات وحساب الحد الأدنى من الجودة التنافسية...',
      },
      medium: {
        analysis: '6 إلى 15 ساعة هي النطاق الذهبي لصانع المحتوى الجاد؛ تتيح لك نشر فيديو أسبوعي عالي الجودة بانتظام (4 مقاطع شهرياً). هذا التوزيع يمنحك يومين للبحث وكتابة السكريبت، ويوماً للتسجيل، ويومين للمونتاج وتصميم الغلاف بعناية.',
        nextQuestion: 'القرار الأخير لإغلاق دراسة الجدوى: ما هو المجال الذي ترى فيه فرصتك التنافسية؟',
        thinkingCue: 'معايرة جدول النشر الأسبوعي وقياس تأثير الانتظام على مؤشر خوارزمية يوتيوب...',
      },
      pro: {
        analysis: 'التفرغ لأكثر من 20 ساعة أسبوعياً يتيح لك بناء خط إنتاج وثائقي متقدم، أو نشر مقطعين طويلين أسبوعياً (8 إلى 10 مقاطع شهرياً). هذا الحجم من الإنتاج يسرّع دوران الخوارزميات وتجميع ساعات المشاهدة المطلوبة لتحقيق الدخل (4,000 ساعة) خلال 60 إلى 90 يوماً.',
        nextQuestion: 'لتوجيه هذه الطاقة الإنتاجية نحو التخصص الأعلى عائداً: ما هو المجال الذي تفضله؟',
        thinkingCue: 'تخطيط وتيرة النشر المكثفة وحساب سرعة تجاوز شروط تحقيق الدخل 4000 ساعة...',
      },
    },
    step4: {
      all: {
        analysis: 'تم مسح كامل قطاعات المحتوى وفرز التخصصات وفق مصفوفة الأمان المالي، وتكلفة الدخول، وسرعة كسب المشتركين، مع استبعاد المجالات المشبعة ذات المردود الضعيف.',
        nextQuestion: '',
        thinkingCue: 'مضاهاة المدخلات مع قاعدة بيانات 300 قناة YouTube موثقة واستخلاص النتائج...',
      },
      'المال والأعمال': {
        analysis: 'قطاع المال والأعمال يستحوذ على أعلى عائد إعلاني (RPM بين $10 و$22). المعلنون هم شركات التداول، البنوك، وحلول الدفع. القنوات التي تقدم قيمة حقيقية وتحليلات بالأرقام تتصدر سريعاً لأن جمهورها هو أصحاب القرار والمستثمرين.',
        nextQuestion: '',
        thinkingCue: 'مطابقة مؤشرات أسواق المال والاستثمار وحساب ميزانية الرعايات المتوقعة...',
      },
      'التكنولوجيا والذكاء الاصطناعي': {
        analysis: 'التقنية والذكاء الاصطناعي تشهد طلباً بحثياً متصاعداً مع عائد RPM ممتاز ($8 إلى $18). المنافسة تعتمد على سرعة مواكبة الأدوات الجديدة وشرح التطبيقات العملية المعقدة بلغة واضحة ومباشرة للمستخدم اليومي.',
        nextQuestion: '',
        thinkingCue: 'فحص معدلات البحث على أدوات AI ومقارنة كفاءة الكلمات المفتاحية التكنولوجية...',
      },
      'تاريخ وحضارات': {
        analysis: 'المحتوى التاريخي والوثائقي يمتلك أعلى معدلات بقاء (Retention Rate > 55%)، ما يجعل خوارزمية التوصيات تدفعه إلى الصفحة الرئيسية باستمرار. رغم أن الـ RPM متوسط ($3-$7)، إلا أن الأرباح الإجمالية تتفوق بفضل حجم المشاهدات المليوني التراكمي.',
        nextQuestion: '',
        thinkingCue: 'قياس كفاءة السرد الوثائقي ومعدلات المشاهدة التراكمية على المدى الطويل...',
      },
      'التعليم والعلوم': {
        analysis: 'محتوى العلوم وتبسيط المعرفة يتميز باستمرارية الطلب لسنوات (Evergreen Content) دون أن يفقد صلاحيته. مقاطعك ستستمر في تحقيق مشاهدات وأرباح تراكمية على مدار 24 إلى 36 شهراً من نشرها.',
        nextQuestion: '',
        thinkingCue: 'حساب القيمة التراكمية للفيديوهات الدائمة (Evergreen) على مدار 3 سنوات...',
      },
    },
  };

  // Handler: When user clicks an option card
  const handleSelectOption = (step: number, optionId: string, optionLabel: string) => {
    // 1. Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: optionLabel,
      selectedOptionLabel: optionLabel,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    if (step === 1) {
      setSelectedGoal(optionId);
      const insight = CONSULTANT_KNOWLEDGE.step1[optionId] || CONSULTANT_KNOWLEDGE.step1.max_profit;
      setThinkingMessage(insight.thinkingCue);

      setTimeout(() => {
        setIsThinking(false);
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `${insight.analysis}\n\n${insight.nextQuestion}`,
          step: 2,
        };
        setMessages((prev) => [...prev, aiResponse]);
        setCurrentStep(2);
      }, 800);
    } else if (step === 2) {
      setCameraChoice(optionId);
      const insight = CONSULTANT_KNOWLEDGE.step2[optionId] || CONSULTANT_KNOWLEDGE.step2.faceless;
      setThinkingMessage(insight.thinkingCue);

      setTimeout(() => {
        setIsThinking(false);
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `${insight.analysis}\n\n${insight.nextQuestion}`,
          step: 3,
        };
        setMessages((prev) => [...prev, aiResponse]);
        setCurrentStep(3);
      }, 800);
    } else if (step === 3) {
      setResourcesChoice(optionId);
      const insight = CONSULTANT_KNOWLEDGE.step3[optionId] || CONSULTANT_KNOWLEDGE.step3.part_time;
      setThinkingMessage(insight.thinkingCue);

      setTimeout(() => {
        setIsThinking(false);
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `${insight.analysis}\n\n${insight.nextQuestion}`,
          step: 4,
        };
        setMessages((prev) => [...prev, aiResponse]);
        setCurrentStep(4);
      }, 800);
    } else if (step === 4) {
      setNicheChoice(optionId);
      const insight = CONSULTANT_KNOWLEDGE.step4[optionId] || CONSULTANT_KNOWLEDGE.step4.all;

      // Calculate the top idea matching these choices
      let topIdeaId = 'idea-01';
      const scored = DETAILED_CHANNEL_IDEAS.map((idea) => {
        let score = 72;
        if (selectedGoal === 'max_profit' && idea.longFormRpmMedian >= 8) score += 14;
        if (selectedGoal === 'faceless_channel' && idea.cameraAppearance === 'بدون ظهور') score += 18;
        if (selectedGoal === 'lowest_cost' && (idea.difficulty === 'سهل' || idea.cameraAppearance === 'بدون ظهور')) score += 14;
        if (selectedGoal === 'max_views' && idea.demandVolume === 'مرتفع') score += 14;

        if (cameraChoice === 'faceless') {
          if (idea.cameraAppearance === 'بدون ظهور') score += 12;
          else if (idea.cameraAppearance === 'ظهور كامل') score -= 25;
        } else if (cameraChoice === 'on_camera') {
          if (idea.cameraAppearance === 'ظهور كامل') score += 10;
        }

        if (optionId !== 'all') {
          if (idea.category === optionId || idea.benchmarkKey === optionId) score += 15;
          else score -= 10;
        }

        if (resourcesChoice === 'part_time' && idea.difficulty === 'سهل') score += 8;
        return { idea, score };
      }).sort((a, b) => b.score - a.score);

      topIdeaId = scored[0]?.idea?.id || 'idea-01';
      const targetUrl = `/channel-ideas/report?goal=${selectedGoal}&camera=${cameraChoice}&resources=${resourcesChoice}&niche=${encodeURIComponent(optionId)}&ideaId=${topIdeaId}`;
      setReportUrl(targetUrl);

      // Start Multi-Stage Deep Thinking UI
      setIsThinking(false);
      setIsDeepThinking(true);
      setDeepThinkingProgress(15);
      setDeepThinkingStage(0);

      const startTime = Date.now();
      const timerInterval = setInterval(() => {
        setDeepThinkingElapsedTime(Date.now() - startTime);
      }, 100);

      // Stage 1 -> 2
      setTimeout(() => {
        setDeepThinkingStage(1);
        setDeepThinkingProgress(45);
      }, 750);

      // Stage 2 -> 3
      setTimeout(() => {
        setDeepThinkingStage(2);
        setDeepThinkingProgress(75);
      }, 1500);

      // Stage 3 -> 4
      setTimeout(() => {
        setDeepThinkingStage(3);
        setDeepThinkingProgress(95);
      }, 2300);

      // Stage 4 Complete -> Show AI response & Navigate
      setTimeout(() => {
        setDeepThinkingStage(4);
        setDeepThinkingProgress(100);
        clearInterval(timerInterval);

        setTimeout(() => {
          setIsDeepThinking(false);
          const aiResponse: Message = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `${insight.analysis}\n\nاكتملت دراسة الجدوى التنفيذية والتحليل المتعمق بنجاح! تم استخلاص النموذج الأمثل وربطه بكافة مؤشرات العائد المالي وخطة الـ 90 يوماً. جاري نقلك الآن إلى التقرير التنفيذي المفصل...`,
            step: 5,
          };
          setMessages((prev) => [...prev, aiResponse]);
          setCurrentStep(5);

          // Auto-navigate after 1.8 seconds to the new report page
          setTimeout(() => {
            router.push(targetUrl);
          }, 1800);
        }, 500);
      }, 2900);
    }
  };

  // Reset chat
  const handleReset = () => {
    setCurrentStep(1);
    setIsThinking(false);
    setIsDeepThinking(false);
    setDeepThinkingProgress(0);
    setDeepThinkingStage(0);
    setDeepThinkingElapsedTime(0);
    setReportUrl('');
    setSelectedGoal('max_profit');
    setCameraChoice('faceless');
    setResourcesChoice('part_time');
    setNicheChoice('all');
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: 'مرحباً بك مجدداً. تم تصفير المدخلات السابقة. لنبدأ الجلسة من جديد: ما هو هدفك الاستراتيجي الأساسي من القناة؟',
        step: 1,
      },
    ]);
  };

  // Recommendations Math based on chosen answers
  const recommendedIdeas = useMemo(() => {
    return DETAILED_CHANNEL_IDEAS.map((idea) => {
      let score = 72;
      if (selectedGoal === 'max_profit' && idea.longFormRpmMedian >= 8) score += 14;
      if (selectedGoal === 'faceless_channel' && idea.cameraAppearance === 'بدون ظهور') score += 18;
      if (selectedGoal === 'lowest_cost' && (idea.difficulty === 'سهل' || idea.cameraAppearance === 'بدون ظهور')) score += 14;
      if (selectedGoal === 'max_views' && idea.demandVolume === 'مرتفع') score += 14;

      if (cameraChoice === 'faceless') {
        if (idea.cameraAppearance === 'بدون ظهور') score += 12;
        else if (idea.cameraAppearance === 'ظهور كامل') score -= 25;
      } else if (cameraChoice === 'on_camera') {
        if (idea.cameraAppearance === 'ظهور كامل') score += 10;
      }

      if (nicheChoice !== 'all') {
        if (idea.category === nicheChoice || idea.benchmarkKey === nicheChoice) score += 15;
        else score -= 10;
      }

      if (resourcesChoice === 'part_time' && idea.difficulty === 'سهل') score += 8;

      return { idea, score: Math.min(99, Math.max(65, score)) };
    }).sort((a, b) => b.score - a.score);
  }, [selectedGoal, cameraChoice, resourcesChoice, nicheChoice]);

  // Overall Plan Feasibility Score
  const feasibilityScore = useMemo(() => {
    let s = 88;
    if (cameraChoice === 'faceless') s += 5;
    if (resourcesChoice === 'part_time') s += 3;
    return Math.min(98, s);
  }, [cameraChoice, resourcesChoice]);

  const comparedIdeas = useMemo(() => {
    return DETAILED_CHANNEL_IDEAS.filter((i) => comparedIdeaIds.includes(i.id));
  }, [comparedIdeaIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-slate-900">
      <Navbar
        onToggleSidebar={() => {
          if (window.innerWidth < 768) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <YouTubeSidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white h-full shadow-2xl animate-in slide-in-from-right duration-200">
              <YouTubeSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Main Title & Toggle Header */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                مستشار دراسة جدوى القنوات الذكي
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                استشارة تفاعلية مبنية على دراسة 300 قناة YouTube موثقة؛ تحدد التخصص والعائد المالي المناسب لك بالإجابة على خيارات محددة.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl self-start lg:self-auto shrink-0">
              <button
                onClick={() => setViewMode('chat')}
                className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'chat'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>جلسة المستشار الذكي</span>
              </button>
              <button
                onClick={() => setViewMode('library')}
                className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'library'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>المكتبة الشاملة للأفكار</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              VIEW MODE 1: CHATGPT-STYLE CONSULTANT WITH SIMULATED THINKING
              ======================================================== */}
          {viewMode === 'chat' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Chat Container */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                
                {/* Messages Feed */}
                <div className="space-y-5">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 sm:gap-4 items-start ${
                        msg.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                          msg.sender === 'ai'
                            ? 'bg-[#FF0000] text-white'
                            : 'bg-zinc-900 text-white'
                        }`}
                      >
                        {msg.sender === 'ai' ? (
                          <Bot className="w-5 h-5" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>

                      {/* Bubble Text */}
                      <div
                        className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'ai'
                            ? 'bg-zinc-50 border border-zinc-200/80 text-zinc-900'
                            : 'bg-zinc-900 text-white'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Simulated Thinking Bubble (Visual Cue) */}
                  {isThinking && (
                    <div className="flex gap-3 sm:gap-4 items-start animate-in fade-in duration-300">
                      <div className="w-9 h-9 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Bot className="w-5 h-5" />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-600 border-t-transparent animate-spin shrink-0" />
                        <div className="space-y-0.5">
                          <span className="font-bold block text-amber-900">المستشار يحلل البيانات...</span>
                          <span className="text-[11px] text-amber-800/90 font-medium">
                            {thinkingMessage}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Deep Thinking Synthesis Interface (Reasoning Protocol for Final Step) */}
                  {isDeepThinking && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950 text-white border border-zinc-800 shadow-xl space-y-4 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF0000] via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <span className="font-extrabold text-sm text-white block">
                              وضع التفكير والتحليل العميق (Deep Thinking)...
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              معالجة مصفوفة الـ 300 قناة YouTube وصياغة دراسة الجدوى التنفيذية
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-400 tabular-nums">
                            {(deepThinkingElapsedTime / 1000).toFixed(1)} ثانية
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        </div>
                      </div>

                      {/* Live Progress Bar */}
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-[#FF0000] h-full transition-all duration-300 ease-out"
                          style={{ width: `${deepThinkingProgress}%` }}
                        />
                      </div>

                      {/* Multi-stage Reasoning Steps */}
                      <div className="space-y-2.5 text-xs font-mono">
                        {[
                          'استيعاب ومقاطعة محدداتك الـ 4 مع خوارزميات يوتيوب...',
                          'مسح مصفوفة 300 قناة موثقة وحساب عائدات الـ RPM والـ CPM لأسواق المنطقة...',
                          'معايرة منحنى الاحتفاظ بالجمهور (Retention) وتخصيص ساعات الإنتاج الأسبوعية...',
                          'اكتمال بناء دراسة الجدوى التنفيذية وتوليد بنك الحلقات وخارطة الـ 90 يوماً!',
                        ].map((stageText, idx) => {
                          const isDone = deepThinkingStage > idx;
                          const isCurrent = deepThinkingStage === idx;
                          return (
                            <div
                              key={idx}
                              className={`flex items-center gap-2.5 transition-all ${
                                isDone
                                  ? 'text-emerald-400 font-medium'
                                  : isCurrent
                                  ? 'text-white font-bold'
                                  : 'text-zinc-600'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : isCurrent ? (
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border border-zinc-700 shrink-0" />
                              )}
                              <span className="text-[11px] sm:text-xs">{stageText}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-zinc-100 my-4" />

                {/* Multiple Choice Interactive Input Rails (Depends on currentStep) */}
                {!isThinking && !isDeepThinking && currentStep <= 4 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-bold">
                      <span>اختر الإجابة المناسبة بنقرة واحدة (المرحلة {currentStep} من 4):</span>
                      <span className="text-zinc-400">بدون الحاجة لكتابة نص</span>
                    </div>

                    {/* Step 1 Options */}
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {goalOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(1, opt.id, opt.label)}
                            className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-900 text-start font-bold text-xs sm:text-sm text-zinc-900 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99]"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 2 Options */}
                    {currentStep === 2 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {cameraOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(2, opt.id, opt.label)}
                            className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-900 text-start font-bold text-xs sm:text-sm text-zinc-900 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99]"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 3 Options */}
                    {currentStep === 3 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {resourceOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(3, opt.id, opt.label)}
                            className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-900 text-start font-bold text-xs sm:text-sm text-zinc-900 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99]"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 4 Options */}
                    {currentStep === 4 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {nicheOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(4, opt.id, opt.label)}
                            className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-900 text-start font-bold text-xs sm:text-sm text-zinc-900 transition-all shadow-2xs hover:shadow-xs active:scale-[0.99]"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Final Step Results (Step 5) */}
                {currentStep === 5 && (
                  <div className="space-y-6 pt-4 animate-in fade-in duration-400">
                    {/* Primary Hero Navigation to Detailed Report Page */}
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-400">
                            اكتمل التحليل المتعمق وصياغة دراسة الجدوى
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-white">
                          تقرير الجدوى التنفيذي الكامل: «{recommendedIdeas[0]?.idea?.title}»
                        </h2>
                        <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                          تم توليد خطة العمل الكاملة في صفحة مخصصة تشمل: التحليل المالي وتوقعات الدخل، قائمة أول 10 حلقات مقترحة، وخارطة طريق الـ 90 يوماً.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 relative z-10">
                        <Button
                          size="lg"
                          onClick={() => router.push(reportUrl || `/channel-ideas/report?goal=${selectedGoal}&camera=${cameraChoice}&resources=${resourcesChoice}&niche=${encodeURIComponent(nicheChoice)}&ideaId=${recommendedIdeas[0]?.idea?.id}`)}
                          className="bg-[#FF0000] hover:bg-[#CC0000] text-white font-black text-xs sm:text-sm rounded-2xl px-6 py-6 shadow-md gap-2 group transition-all"
                        >
                          <span>عرض تقرير الجدوى المفصل بالكامل</span>
                          <ChevronLeft className="w-5 h-5 group-hover:translate-x-[-3px] transition-transform" />
                        </Button>
                      </div>
                    </div>

                    {/* Decisions Summary Receipt Card */}
                    <div className="p-5 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                        <div>
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <span>ملخص القرارات المعتمدة في الجلسة</span>
                          </h3>
                          <span className="text-xs text-zinc-400">
                            المدخلات التي اجتزتها لتحديد التخصص
                          </span>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className="text-xs text-zinc-400">مؤشر واقعية الخطة:</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-sm tabular-nums border border-emerald-500/30">
                            {feasibilityScore}% ممتاز
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                          <span className="text-[10px] text-zinc-400 block mb-1">الهدف المعتمد:</span>
                          <strong className="text-white line-clamp-1" title={goalOptions.find((g) => g.id === selectedGoal)?.label}>
                            {goalOptions.find((g) => g.id === selectedGoal)?.label}
                          </strong>
                        </div>

                        <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                          <span className="text-[10px] text-zinc-400 block mb-1">أسلوب الظهور:</span>
                          <strong className="text-white line-clamp-1" title={cameraOptions.find((c) => c.id === cameraChoice)?.label}>
                            {cameraOptions.find((c) => c.id === cameraChoice)?.label}
                          </strong>
                        </div>

                        <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                          <span className="text-[10px] text-zinc-400 block mb-1">الطاقة الأسبوعية:</span>
                          <strong className="text-white line-clamp-1" title={resourceOptions.find((r) => r.id === resourcesChoice)?.label}>
                            {resourceOptions.find((r) => r.id === resourcesChoice)?.label}
                          </strong>
                        </div>

                        <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                          <span className="text-[10px] text-zinc-400 block mb-1">المجال المستهدف:</span>
                          <strong className="text-white line-clamp-1" title={nicheOptions.find((n) => n.id === nicheChoice)?.label}>
                            {nicheOptions.find((n) => n.id === nicheChoice)?.label}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* In-Depth Executive Advisory Audit */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-4">
                      <div className="border-b border-zinc-200/80 pb-3">
                        <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 flex items-center gap-2">
                          <Compass className="w-5 h-5 text-zinc-900" />
                          <span>التحليل الاستشاري التنفيذي للخطة</span>
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          تشخيص دقيق لنقاط القوة والمخاطر التشغيلية وخارطة أول 90 يوماً
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Core Strategic Edge */}
                        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs space-y-1.5">
                          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                            <TrendingUp className="w-4 h-4" />
                            <span>نقطة القوة التنافسية للنموذج</span>
                          </div>
                          <p className="text-xs text-zinc-700 leading-relaxed">
                            {selectedGoal === 'max_profit' && 'تركيزك على قطاعات الـ High-RPM يتيح تحقيق دخل مجزٍ بأعداد مشاهدات معتدلة دون الحاجة لسباق المشاهدات المليونية.'}
                            {selectedGoal === 'faceless_channel' && 'نموذج القناة بدون ظهور يمنحك مرونة إنتاجية وأتمتة عالية دون الارتباط بجداول تصوير معقدة أو الظهور الشخصي.'}
                            {selectedGoal === 'lowest_cost' && 'التشغيل بالحد الأدنى من المعدات يضمن سرعة إطلاق خفيفة ومرونة في تعديل المحتوى دون ضغوط مالية.'}
                            {selectedGoal === 'max_views' && 'المحتوى واسع الانتشار يتيح استغلال خوارزميات الاقتراح (Browse) والشورتس لتجميع قاعدة مشتركين ضخمة بسرعة.'}
                            {selectedGoal === 'business_venture' && 'استخدام القناة كقمع لبيع الخدمات والاستشارات يرفع العائد الفعلي لكل مشاهد بنسبة تتجاوز 400% عن AdSense.'}
                          </p>
                        </div>

                        {/* Operational Bottleneck & Mitigation */}
                        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs space-y-1.5">
                          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                            <ShieldCheck className="w-4 h-4" />
                            <span>الخطر التشغيلي وخطة الوقاية</span>
                          </div>
                          <p className="text-xs text-zinc-700 leading-relaxed">
                            {resourcesChoice === 'part_time'
                              ? 'الخطر: الإخلال بانتظام النشر بسبب ضيق الوقت. الحل: كتابة وإنتاج 3 فيديوهات كاملة كاحتياطي (Buffer) قبل نشر أي فيديو علنياً.'
                              : cameraChoice === 'faceless'
                              ? 'الخطر: هبوط معدل البقاء (Retention) في الدقيقة الأولى. الحل: التركيز الصارم على أول 15 ثانية وربط الصوت بمؤثرات وحركة بصرية مستمرة.'
                              : 'الخطر: تشتت التخصص والقفز بين مواضيع متعددة. الحل: حصر أول 15 فيديو في زاوية واحدة لبناء سلطة خوارزمية راسخة.'}
                          </p>
                        </div>
                      </div>

                      {/* 90-Day Roadmap */}
                      <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs space-y-2.5">
                        <span className="font-bold text-xs text-zinc-900 block">
                          خارطة طريق الـ 90 يوماً الأولى للإطلاق التجاري:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-2.5 rounded-lg bg-white border border-zinc-200/80 space-y-1">
                            <span className="font-bold text-zinc-900 block text-[11px]">الشهر الأول: التأسيس</span>
                            <span className="text-[11px] text-zinc-600 block leading-snug">
                              تجهيز الهوية وقالب الغلاف الخارجي، والانتهاء من 3 سكريبتات كاملة.
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-zinc-200/80 space-y-1">
                            <span className="font-bold text-zinc-900 block text-[11px]">الشهر الثاني: الخوارزميات</span>
                            <span className="text-[11px] text-zinc-600 block leading-snug">
                              نشر أسبوعي منتظم ومراقبة معدل النقر CTR (الهدف 6%+) ونسبة الاحتفاظ AVD.
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-zinc-200/80 space-y-1">
                            <span className="font-bold text-zinc-900 block text-[11px]">الشهر الثالث: تحقيق الدخل</span>
                            <span className="text-[11px] text-zinc-600 block leading-snug">
                              تفعيل روابط العمولة والانتساب والتواصل المباشر مع رعاتك الأوائل.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Recommended Channels Cards */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-base text-zinc-900 flex items-center gap-2">
                          <Flame className="w-5 h-5 text-[#FF0000]" />
                          <span>أفضل 3 قنوات متطابقة مع قراراتك:</span>
                        </h3>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReset}
                          className="text-xs rounded-xl gap-1.5 border-zinc-300"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>بدء استشارة جديدة</span>
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recommendedIdeas.slice(0, 3).map(({ idea, score }, idx) => (
                          <Card
                            key={idea.id}
                            className={`bg-white border rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all ${
                              idx === 0
                                ? 'border-[#FF0000]/60 ring-2 ring-red-500/20 shadow-xs'
                                : 'border-zinc-200/90 shadow-2xs'
                            }`}
                          >
                            <div className="p-4 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant={idx === 0 ? 'youtube' : 'secondary'}
                                  className="text-[10px] font-bold gap-1"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>{score}% تطابق</span>
                                </Badge>
                                <span className="text-[10px] text-zinc-400 font-bold">
                                  توصية #{idx + 1}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] text-zinc-400 font-bold block mb-0.5">
                                  {idea.category}
                                </span>
                                <h4 className="font-bold text-sm text-zinc-900 line-clamp-2 leading-snug">
                                  {idea.title}
                                </h4>
                              </div>

                              <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                                {idea.tagline}
                              </p>

                              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                                <div>
                                  <span className="text-[10px] text-zinc-400 block">الـ RPM المقدر</span>
                                  <strong className="text-emerald-700 font-bold tabular-nums">
                                    ${idea.longFormRpmMedian.toFixed(2)}
                                  </strong>
                                </div>
                                <div>
                                  <span className="text-[10px] text-zinc-400 block">الظهور</span>
                                  <strong className="text-zinc-800 font-bold">{idea.cameraAppearance}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-between gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCalculatorIdea(idea);
                                  setCalculatorOpen(true);
                                }}
                                className="text-xs rounded-xl flex-1 border-zinc-300"
                              >
                                <Calculator className="w-3.5 h-3.5 me-1 text-zinc-700" />
                                <span>حاسبة الأرباح</span>
                              </Button>

                              <Button
                                variant="youtube"
                                size="sm"
                                onClick={() => {
                                  setDetailsIdea(idea);
                                  setDetailsOpen(true);
                                }}
                                className="text-xs rounded-xl font-bold px-3"
                              >
                                <span>التفاصيل</span>
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              VIEW MODE 2: FULL DIRECTORY & EXPLORER (LIBRARY)
              ======================================================== */}
          {viewMode === 'library' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs space-y-4">
                <div className="relative w-full sm:w-96">
                  <Input
                    type="text"
                    placeholder="ابحث عن مجال، فكرة، أو كلمة مفتاحية..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs h-10 ps-9 pe-3 rounded-xl border-zinc-300"
                  />
                  <Search className="w-4 h-4 text-zinc-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {[
                    'الكل',
                    'تاريخ وحضارات',
                    'المال والأعمال',
                    'التعليم والعلوم',
                    'المنزل والتصميم',
                    'أسلوب الحياة',
                    'التكنولوجيا والذكاء الاصطناعي',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Library Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {DETAILED_CHANNEL_IDEAS.filter((i) =>
                  selectedCategory === 'الكل' ? true : i.category === selectedCategory
                )
                  .filter((i) =>
                    searchQuery === '' ? true : i.title.includes(searchQuery)
                  )
                  .map((idea) => (
                    <Card
                      key={idea.id}
                      className="bg-white border border-zinc-200/90 shadow-2xs rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-[10px] font-bold">
                            {idea.category}
                          </Badge>
                          <span className="text-xs font-extrabold text-emerald-700 tabular-nums">
                            RPM: ${idea.longFormRpmMedian.toFixed(2)}
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-zinc-900 leading-snug line-clamp-2">
                          {idea.title}
                        </h3>

                        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                          {idea.tagline}
                        </p>
                      </div>

                      <div className="p-4 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-between gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCalculatorIdea(idea);
                            setCalculatorOpen(true);
                          }}
                          className="text-xs rounded-xl flex-1 border-zinc-300"
                        >
                          حاسبة الأرباح
                        </Button>
                        <Button
                          variant="youtube"
                          size="sm"
                          onClick={() => {
                            setDetailsIdea(idea);
                            setDetailsOpen(true);
                          }}
                          className="text-xs rounded-xl font-bold px-4"
                        >
                          تفاصيل الفكرة
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Revenue Calculator Modal */}
      {calculatorOpen && (
        <RevenueCalculatorModal
          idea={calculatorIdea}
          isOpen={calculatorOpen}
          onClose={() => setCalculatorOpen(false)}
        />
      )}

      {/* Idea Details Modal */}
      {detailsOpen && (
        <IdeaDetailsModal
          idea={detailsIdea}
          isOpen={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          onOpenCalculator={(i) => {
            setCalculatorIdea(i);
            setCalculatorOpen(true);
          }}
        />
      )}
    </div>
  );
}
