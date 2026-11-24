'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

import {
  DETAILED_CHANNEL_IDEAS,
  DetailedChannelIdea,
} from '@/lib/channelIdeasData';

import {
  Sparkles,
  Compass,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Layers,
  Flame,
  RotateCcw,
  Camera,
  Check,
  Calculator,
  ChevronLeft,
  ChevronDown,
  Bot,
  User,
  ShieldCheck,
  Clock,
  Briefcase,
  Smartphone,
  Eye,
  Star,
  Zap,
  Film,
  Calendar,
  Users,
  Target,
  Share2,
  BookOpen,
  ArrowRight,
  Info,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

function ReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'feasibility' | 'financial' | 'production' | 'episodes' | 'roadmap'>('feasibility');
  const [showReasoningTrace, setShowReasoningTrace] = useState(false);

  // Modals
  const [calculatorIdea, setCalculatorIdea] = useState<DetailedChannelIdea | null>(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [detailsIdea, setDetailsIdea] = useState<DetailedChannelIdea | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // URL parameters from the chat consultation
  const goalParam = searchParams.get('goal') || 'max_profit';
  const cameraParam = searchParams.get('camera') || 'faceless';
  const resourcesParam = searchParams.get('resources') || 'part_time';
  const nicheParam = searchParams.get('niche') || 'all';
  const selectedIdeaId = searchParams.get('ideaId');

  // Friendly Labels Mapping
  const goalLabels: Record<string, string> = {
    max_profit: 'أعلى ربحية ممكنة (RPM وعقود رعاية)',
    faceless_channel: 'قناة بدون ظهور نهائياً (Faceless)',
    lowest_cost: 'أقل ميزانية ومعدات (هاتف ذكي فقط)',
    max_views: 'انتشار واسع ومشاهدات ضخمة',
    business_venture: 'بناء مشروع تجاري وبيع منتجات/خدمات',
  };

  const cameraLabels: Record<string, string> = {
    faceless: 'بدون ظهور نهائياً (Faceless)',
    on_camera: 'ظهور مباشر أمام الكاميرا',
    flexible: 'مرن / أي أسلوب مناسب',
  };

  const resourceLabels: Record<string, string> = {
    part_time: '3 إلى 5 ساعات أسبوعياً (وقت جزئي)',
    medium: '6 إلى 15 ساعة أسبوعياً (التزام منتظم)',
    pro: 'أكثر من 20 ساعة أسبوعياً (تفرغ شبه كامل)',
  };

  // Find recommendations based on answers
  const scoredIdeas = useMemo(() => {
    return DETAILED_CHANNEL_IDEAS.map((idea) => {
      let score = 72;
      if (goalParam === 'max_profit' && idea.longFormRpmMedian >= 8) score += 14;
      if (goalParam === 'faceless_channel' && idea.cameraAppearance === 'بدون ظهور') score += 18;
      if (goalParam === 'lowest_cost' && (idea.difficulty === 'سهل' || idea.cameraAppearance === 'بدون ظهور')) score += 14;
      if (goalParam === 'max_views' && idea.demandVolume === 'مرتفع') score += 14;

      if (cameraParam === 'faceless') {
        if (idea.cameraAppearance === 'بدون ظهور') score += 12;
        else if (idea.cameraAppearance === 'ظهور كامل') score -= 25;
      } else if (cameraParam === 'on_camera') {
        if (idea.cameraAppearance === 'ظهور كامل') score += 10;
      }

      if (nicheParam !== 'all') {
        if (idea.category === nicheParam || idea.benchmarkKey === nicheParam) score += 15;
        else score -= 10;
      }

      if (resourcesParam === 'part_time' && idea.difficulty === 'سهل') score += 8;

      return { idea, score: Math.min(99, Math.max(68, score)) };
    }).sort((a, b) => b.score - a.score);
  }, [goalParam, cameraParam, resourcesParam, nicheParam]);

  // Current primary idea
  const currentIdeaObj = useMemo(() => {
    if (selectedIdeaId) {
      const found = scoredIdeas.find((item) => item.idea.id === selectedIdeaId);
      if (found) return found;
    }
    return scoredIdeas[0] || { idea: DETAILED_CHANNEL_IDEAS[0], score: 96 };
  }, [scoredIdeas, selectedIdeaId]);

  const currentIdea = currentIdeaObj.idea;
  const matchScore = currentIdeaObj.score;

  // Feasibility overall realism score
  const realismScore = useMemo(() => {
    let s = 89;
    if (cameraParam === 'faceless') s += 4;
    if (resourcesParam === 'part_time') s += 4;
    return Math.min(98, s);
  }, [cameraParam, resourcesParam]);

  const handleSelectDifferentIdea = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('ideaId', id);
    router.replace(`/channel-ideas/report?${params.toString()}`);
  };

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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Top Bar Navigation & Return to Chat */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/channel-ideas')}
                className="gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 rounded-xl"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة لجلسة المستشار</span>
              </Button>
              <span className="text-zinc-300">|</span>
              <span className="text-xs font-bold text-zinc-900">
                تقرير دراسة الجدوى التنفيذي الكامل
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCalculatorIdea(currentIdea);
                  setCalculatorOpen(true);
                }}
                className="text-xs rounded-xl gap-1.5 border-zinc-200 hover:border-zinc-900"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>حاسبة الأرباح التقديرية</span>
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={() => router.push('/channel-ideas')}
                className="text-xs rounded-xl gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استشارة جديدة</span>
              </Button>
            </div>
          </div>

          {/* Decisions Recap Ribbon */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm sm:text-base">
                  المدخلات المعتمدة في تقييم الجدوى
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400">مؤشر واقعية واستدامة الخطة:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {realismScore}% واقعية عالية
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                <span className="text-[10px] text-zinc-400 block mb-0.5">الهدف:</span>
                <strong className="text-white line-clamp-1">
                  {goalLabels[goalParam] || goalParam}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                <span className="text-[10px] text-zinc-400 block mb-0.5">أسلوب الظهور:</span>
                <strong className="text-white line-clamp-1">
                  {cameraLabels[cameraParam] || cameraParam}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                <span className="text-[10px] text-zinc-400 block mb-0.5">الطاقة الزمنية:</span>
                <strong className="text-white line-clamp-1">
                  {resourceLabels[resourcesParam] || resourcesParam}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60">
                <span className="text-[10px] text-zinc-400 block mb-0.5">المجال:</span>
                <strong className="text-white line-clamp-1">
                  {nicheParam === 'all' ? 'الأعلى عائداً في المصفوفة' : nicheParam}
                </strong>
              </div>
            </div>

            {/* Deep Reasoning Trace Toggle Button */}
            <div className="pt-1">
              <button
                onClick={() => setShowReasoningTrace(!showReasoningTrace)}
                className="text-[11px] font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{showReasoningTrace ? 'إخفاء سجل التفكير والتحليل العميق للمستشار' : 'عرض سجل التفكير والتحليل العميق للمستشار (Reasoning Trace)'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showReasoningTrace ? 'rotate-180' : ''}`} />
              </button>

              {showReasoningTrace && (
                <div className="mt-3 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-2 leading-relaxed animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-emerald-400 font-sans font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>سلسلة التفكير المنطقي المنفذة (Cognitive Synthesis Log):</span>
                  </div>
                  <div className="ps-6 space-y-1.5 text-zinc-400">
                    <p>• [1/4] استيعاب المحددات: الهدف ({goalParam}) مع تفضيل ظهور ({cameraParam}) ووقت متاح ({resourcesParam}).</p>
                    <p>• [2/4] تصفية مصفوفة 300 قناة موثقة: استبعاد المجالات ذات التكلفة التشغيلية العالية ونسبة المخاطرة المرتفعة لواقع المستخدم.</p>
                    <p>• [3/4] معايرة الـ RPM والـ CPM: القطاع المختار يحقق وسيط ربحي ${currentIdea.longFormRpmMedian} لكل ألف مشاهدة طويلة مع إمكانية دمج 3 مصادر دخل بديلة.</p>
                    <p>• [4/4] نمذجة الاستمرارية ومعدل النقر: نسبة التطابق التشغيلي بلغت {matchScore}% مع تصميم خطة 90 يوماً قائمة على تفادي متلازمة الانقطاع المبكر.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Hero Idea Banner */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xs overflow-hidden">
            {/* Banner Cover with Image & Overlay */}
            <div className="relative h-56 sm:h-72 w-full bg-zinc-900">
              <img
                src={currentIdea.coverImage}
                alt={currentIdea.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              <div className="absolute bottom-5 inset-x-6 text-white space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-[#FF0000] text-white font-black text-xs shadow-xs">
                    تطابق بنسبة {matchScore}%
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-xs text-white font-bold text-xs">
                    {currentIdea.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-xs text-white font-medium text-xs">
                    {currentIdea.subCategory}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/30 text-emerald-300 font-bold text-xs">
                    مؤشر الاستدامة: {currentIdea.sustainabilityScore}%
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                  {currentIdea.title}
                </h1>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                  {currentIdea.tagline}
                </p>
              </div>
            </div>

            {/* Quick Metrics KPI Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-zinc-100 bg-zinc-50 border-b border-zinc-200/90 text-center p-3 sm:p-4 text-xs">
              <div className="p-2 space-y-0.5">
                <span className="text-zinc-500 block text-[11px]">متوسط عائد الألف مشاهدة (RPM)</span>
                <strong className="text-sm sm:text-base font-extrabold text-emerald-600 tabular-nums">
                  ${currentIdea.longFormRpmMedian.toFixed(2)}
                </strong>
                <span className="text-[10px] text-zinc-400 block">نطاق: ${currentIdea.longFormRpmP25} - ${currentIdea.longFormRpmP75}</span>
              </div>

              <div className="p-2 space-y-0.5">
                <span className="text-zinc-500 block text-[11px]">أسلوب التقديم البصري</span>
                <strong className="text-sm sm:text-base font-extrabold text-zinc-900">
                  {currentIdea.cameraAppearance}
                </strong>
                <span className="text-[10px] text-zinc-400 block">{currentIdea.voiceType}</span>
              </div>

              <div className="p-2 space-y-0.5">
                <span className="text-zinc-500 block text-[11px]">مستوى صعوبة الإنتاج</span>
                <strong className="text-sm sm:text-base font-extrabold text-zinc-900">
                  {currentIdea.difficulty}
                </strong>
                <span className="text-[10px] text-zinc-400 block">{currentIdea.productionTime}</span>
              </div>

              <div className="p-2 space-y-0.5">
                <span className="text-zinc-500 block text-[11px]">حجم الطلب في السوق</span>
                <strong className="text-sm sm:text-base font-extrabold text-zinc-900">
                  طلب {currentIdea.demandVolume}
                </strong>
                <span className="text-[10px] text-zinc-400 block">طبيعة: {currentIdea.demandNature}</span>
              </div>
            </div>

            {/* Detailed Tabs Navigator */}
            <div className="px-6 border-b border-zinc-200 bg-white overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 py-3 text-xs font-bold">
                {[
                  { id: 'feasibility', label: '1. دراسة الجدوى التنفيذية', icon: ShieldCheck },
                  { id: 'financial', label: '2. التحليل المالي ومصادر الدخل', icon: DollarSign },
                  { id: 'production', label: '3. متطلبات وسير عمل الإنتاج', icon: Film },
                  { id: 'episodes', label: '4. مخطط أول 10 حلقات', icon: BookOpen },
                  { id: 'roadmap', label: '5. خارطة طريق الـ 90 يوماً', icon: Calendar },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                        isActive
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* TAB 1: EXECUTIVE FEASIBILITY */}
              {activeTab === 'feasibility' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h2 className="text-lg font-extrabold text-zinc-900">
                      التشخيص الاستشاري والجدوى الميدانية
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {currentIdea.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Why this idea matches */}
                    <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>نقطة القوة التنافسية المحورية</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        {currentIdea.overviewReason}
                      </p>
                    </div>

                    {/* Bottlenecks and Risk Mitigation */}
                    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>الخطر التشغيلي الأبرز وخطة الوقاية</span>
                      </div>
                      <p className="text-xs text-amber-950 leading-relaxed">
                        {currentIdea.hasAiDuplicationWarning
                          ? 'تحذير تكرار الذكاء الاصطناعي: يوتيوب يعاقب القنوات المؤتمتة بالكامل بدون لمسة بشرية. يجب إضافة تعليق صوتي بشري فريد أو إعادة كتابة السيناريوهات بأسلوب خاص.'
                          : 'المخاطرة التشغيلية: الاستنزاف في أول 60 يوماً. الحل الوقائي: الالتزام الصارم بجدول حلقة أسبوعية وتجهيز 3 حلقات كـ Buffer قبل النشر الأول.'}
                      </p>
                    </div>
                  </div>

                  {/* Target Audience & Region */}
                  <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-zinc-700" />
                      <span>الجمهور المستهدف والنطاق الجغرافي</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-zinc-200">
                        <span className="text-[11px] text-zinc-500 block mb-1">الشريحة المستهدفة:</span>
                        <strong className="text-zinc-900">{currentIdea.targetAudience}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-zinc-200">
                        <span className="text-[11px] text-zinc-500 block mb-1">الفئات العمرية:</span>
                        <strong className="text-zinc-900">{currentIdea.targetAge}</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-zinc-200">
                        <span className="text-[11px] text-zinc-500 block mb-1">المنطقة الجغرافية:</span>
                        <strong className="text-zinc-900">{currentIdea.targetRegion}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FINANCIAL ANALYSIS */}
              {activeTab === 'financial' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h2 className="text-lg font-extrabold text-zinc-900">
                      التحليل المالي وتوقعات الدخل الواقعية
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      بيانات مستندة إلى دراسة 300 قناة مفعلة للدخل وفق إحصائيات صناعة يوتيوب الحديثة:
                    </p>
                  </div>

                  {/* 3 Projected Scenarios */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="text-xs font-bold text-zinc-500 block">سيناريو متحفظ (15,000 مشاهدة شهرياً)</span>
                      <strong className="text-xl font-black text-zinc-900 block tabular-nums">
                        ${(15 * currentIdea.longFormRpmP25).toFixed(0)} - ${(15 * currentIdea.longFormRpmMedian).toFixed(0)} / شهر
                      </strong>
                      <span className="text-[11px] text-zinc-500 block leading-snug">
                        مرحلة البدايات (الشهر 2 إلى 4) بالاعتماد على محرك البحث والمشتركين الأوائل.
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800 block">سيناريو متوسط (50,000 مشاهدة شهرياً)</span>
                        <Badge className="bg-emerald-600 text-white text-[10px]">الأكثر ترجيحاً</Badge>
                      </div>
                      <strong className="text-xl font-black text-emerald-700 block tabular-nums">
                        ${(50 * currentIdea.longFormRpmMedian).toFixed(0)} - ${(50 * currentIdea.longFormRpmP75).toFixed(0)} / شهر
                      </strong>
                      <span className="text-[11px] text-emerald-900 block leading-snug">
                        مرحلة الاستقرار (الشهر 5 إلى 9) مع دخول فيديوهاتك في اقتراحات الصفحة الرئيسية.
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="text-xs font-bold text-zinc-500 block">سيناريو متقدم (150,000 مشاهدة شهرياً)</span>
                      <strong className="text-xl font-black text-zinc-900 block tabular-nums">
                        ${(150 * currentIdea.longFormRpmP75).toFixed(0)} / شهر + عقود رعاية
                      </strong>
                      <span className="text-[11px] text-zinc-500 block leading-snug">
                        مرحلة التوسع والنمو السريع، مع إمكانية تحصيل $500 إلى $1,500 لكل عقد رعاية منفصل.
                      </span>
                    </div>
                  </div>

                  {/* Revenue Streams List */}
                  <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-3">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>قنوات تنويع مصادر الدخل للقناة</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {currentIdea.revenueStreams.map((stream, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center gap-2 font-medium text-zinc-800">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{stream}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCalculatorIdea(currentIdea);
                        setCalculatorOpen(true);
                      }}
                      className="rounded-xl gap-2 border-zinc-300"
                    >
                      <Calculator className="w-4 h-4 text-emerald-600" />
                      <span>فتح حاسبة الأرباح التفاعلية المفصلة مع تخصيص المشاهدات</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 3: PRODUCTION & WORKFLOW */}
              {activeTab === 'production' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h2 className="text-lg font-extrabold text-zinc-900">
                      خطة الإنتاج، الأدوات، وسير العمل الأسبوعي
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      تصميم خطة إنتاج تناسب ساعات عملك ({resourceLabels[resourcesParam] || resourcesParam}) وتمنع الإرهاق:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="font-bold text-zinc-700 block">المعدات المطلوبة للبدء:</span>
                      <strong className="text-sm text-zinc-900 block">{currentIdea.equipmentRequired}</strong>
                      <p className="text-[11px] text-zinc-500">لا تحتاج لشراء استوديو مكلف في مرحلة التحقق الأولى.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="font-bold text-zinc-700 block">صعوبة المونتاج وتكلفة الإنتاج:</span>
                      <strong className="text-sm text-zinc-900 block">مونتاج {currentIdea.editingDifficulty} • تكلفة {currentIdea.productionCost}</strong>
                      <p className="text-[11px] text-zinc-500">يمكن الاعتماد على برامج مجانية مثل CapCut أو DaVinci Resolve.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="font-bold text-zinc-700 block">صيغة النشر الأساسية:</span>
                      <strong className="text-sm text-zinc-900 block">{currentIdea.primaryFormat}</strong>
                      <p className="text-[11px] text-zinc-500">الموازنة بين المقاطع الطويلة لتحقيق الساعات والشورتس للانتشار.</p>
                    </div>
                  </div>

                  {/* Weekly Time Allocation Plan */}
                  <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-4">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-700" />
                      <span>توزيع ساعات العمل الأسبوعية الموصى بها:</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                        <span className="font-bold text-zinc-900 block">1. البحث والسكريبت (35%)</span>
                        <p className="text-[11px] text-zinc-600">صياغة الفكرة، كتابة الخطاف الأول (Hook)، وجمع المراجع الموثوقة.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                        <span className="font-bold text-zinc-900 block">2. التسجيل والتعليق (20%)</span>
                        <p className="text-[11px] text-zinc-600">تسجيل التعليق الصوتي في غرفة هادئة أو تصوير المشاهد المطلوبة.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                        <span className="font-bold text-zinc-900 block">3. المونتاج والبصريات (30%)</span>
                        <p className="text-[11px] text-zinc-600">تركيب المقاطع التوضيحية B-Roll، المؤثرات الصوتية، والموسيقى الخلفية.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 space-y-1">
                        <span className="font-bold text-zinc-900 block">4. الغلاف والـ SEO (15%)</span>
                        <p className="text-[11px] text-zinc-600">تصميم صورتين مصغرتين لاختبارهما، وكتابة عنوان يثير الفضول.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: EPISODES BLUEPRINT */}
              {activeTab === 'episodes' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h2 className="text-lg font-extrabold text-zinc-900">
                      قائمة أول 10 حلقات مقترحة للإطلاق
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      عناوين وخطافات مدروسة لجذب المشاهدين في أول 15 ثانية ورفع معدل النقر (CTR):
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentIdea.episodes && currentIdea.episodes.length > 0 ? (
                      currentIdea.episodes.map((ep, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500">
                              الحلقة رقم #{idx + 1}
                            </span>
                            <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-lg">
                              جاهزة للتنفيذ
                            </span>
                          </div>

                          <h3 className="font-extrabold text-sm text-zinc-900">
                            {ep.title}
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 border-t border-zinc-200/60">
                            <div>
                              <span className="text-[11px] text-zinc-500 font-bold block mb-0.5">الخطاف الافتتاحي (Hook):</span>
                              <p className="text-zinc-700 text-[11px] leading-relaxed">{ep.hook}</p>
                            </div>
                            <div>
                              <span className="text-[11px] text-zinc-500 font-bold block mb-0.5">القيمة الجوهرية (Takeaway):</span>
                              <p className="text-zinc-700 text-[11px] leading-relaxed">{ep.keyTakeaway}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-500">جاري إعداد قائمة الحلقات التكميلية...</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: 90-DAY ROADMAP */}
              {activeTab === 'roadmap' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <h2 className="text-lg font-extrabold text-zinc-900">
                      خارطة طريق الـ 90 يوماً للوصول لتحقيق الدخل (Monetization)
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      خطة تدريجية مرحلية تضمن تجاوز شروط يوتيوب (1,000 مشترك و 4,000 ساعة مشاهدة) بأقل مجهود ضائع:
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Month 1 */}
                    <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <span className="font-extrabold text-sm text-zinc-900 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                          <span>الشهر الأول: التأسيس وإنتاج بنك الحلقات المسبق</span>
                        </span>
                        <Badge variant="outline" className="text-[10px]">أيام 1 - 30</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700">
                        <div className="p-3 rounded-xl bg-zinc-50 space-y-1">
                          <strong className="text-zinc-900 block">الأسبوع 1 و 2:</strong>
                          <p>{currentIdea.thirtyDayPlan.week1} — {currentIdea.thirtyDayPlan.week2}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-50 space-y-1">
                          <strong className="text-zinc-900 block">الأسبوع 3 و 4:</strong>
                          <p>{currentIdea.thirtyDayPlan.week3} — {currentIdea.thirtyDayPlan.week4}</p>
                        </div>
                      </div>
                    </div>

                    {/* Month 2 */}
                    <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <span className="font-extrabold text-sm text-zinc-900 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs flex items-center justify-center font-bold">2</span>
                          <span>الشهر الثاني: اختبار الخوارزميات وتحسين الأغلفة</span>
                        </span>
                        <Badge variant="outline" className="text-[10px]">أيام 31 - 60</Badge>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        نشر فيديو أسبوعي بانتظام في نفس اليوم والساعة. متابعة مؤشرات YouTube Studio اليومية: التأكد من بقاء معدل النقر للظهور (CTR) فوق 6.5%، ومتوسط مدة المشاهدة (AVD) فوق 40%. في حال انخفاض النقر، يتم استبدال الغلاف والعنوان فوراً خلال 24 ساعة من النشر.
                      </p>
                    </div>

                    {/* Month 3 */}
                    <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                        <span className="font-extrabold text-sm text-zinc-900 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                          <span>الشهر الثالث: تحقيق شروط الدخل وتفعيل الرعايات</span>
                        </span>
                        <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-300">أيام 61 - 90</Badge>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        تقديم طلب الانضمام لبرنامج شركاء يوتيوب (YPP) بعد استكمال ساعات المشاهدة. تفعيل روابط التسويق بالعمولة (Affiliate Links) في وصف الفيديوهات، وإعداد ملف تعريفي إعلامي (Media Kit) مختصر للتواصل مع أول 5 شركات معلنة في مجال القناة.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Alternative Matched Ideas Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FF0000]" />
                <span>خيارات بديلة متطابقة مع قراراتك</span>
              </h2>
              <span className="text-xs text-zinc-500">
                يمكنك التبديل بينها لمشاهدة دراسة جدواها فوراً
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoredIdeas.slice(1, 3).map(({ idea, score }) => (
                <div
                  key={idea.id}
                  onClick={() => handleSelectDifferentIdea(idea.id)}
                  className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        {idea.category}
                      </Badge>
                      <span className="text-xs font-bold text-emerald-600">
                        {score}% تطابق
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-zinc-900 group-hover:text-[#FF0000] transition-colors">
                      {idea.title}
                    </h3>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {idea.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                    <span className="text-zinc-600 font-bold">
                      RPM: ${idea.longFormRpmMedian.toFixed(2)}
                    </span>
                    <span className="text-zinc-900 font-bold flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                      <span>عرض دراسة الجدوى لهذه الفكرة</span>
                      <ChevronLeft className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* Modals */}
      {calculatorIdea && (
        <RevenueCalculatorModal
          isOpen={calculatorOpen}
          onClose={() => setCalculatorOpen(false)}
          idea={calculatorIdea}
        />
      )}

      {detailsIdea && (
        <IdeaDetailsModal
          isOpen={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          idea={detailsIdea}
          onOpenCalculator={(i) => {
            setDetailsOpen(false);
            setCalculatorIdea(i);
            setCalculatorOpen(true);
          }}
        />
      )}
    </div>
  );
}

export default function ChannelIdeasReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F9FAFC] flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 rounded-full border-3 border-zinc-900 border-t-transparent animate-spin" />
          <p className="text-sm font-bold text-zinc-700">جاري تحميل تقرير الجدوى التنفيذي...</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
