'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DetailedChannelIdea } from '@/lib/channelIdeasData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Clock,
  Film,
  Camera,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  BookOpen,
  Users,
  Target,
  FileText,
  Volume2,
  Share2,
  Calculator,
} from 'lucide-react';

interface IdeaDetailsModalProps {
  idea: DetailedChannelIdea | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: (idea: DetailedChannelIdea) => void;
}

export default function IdeaDetailsModal({
  idea,
  isOpen,
  onClose,
  onOpenCalculator,
}: IdeaDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'market' | 'production' | 'episodes' | 'strategy' | 'launch'>('overview');

  if (!idea) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-white rounded-3xl p-0 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Cover Header Banner */}
        <div className="relative h-44 sm:h-52 w-full bg-slate-900 shrink-0">
          <img
            src={idea.coverImage}
            alt={idea.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute bottom-4 inset-x-6 text-white space-y-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-[10px] bg-white/95 text-zinc-900 font-bold">{idea.category}</Badge>
              <Badge variant="secondary" className="text-[10px] bg-white/20 text-white backdrop-blur-xs">{idea.subCategory}</Badge>
              <Badge variant="secondary" className="text-[10px] bg-white/20 text-white backdrop-blur-xs">استدامة: {idea.sustainabilityScore}%</Badge>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-black text-white leading-tight">
              {idea.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-300 line-clamp-1">
              {idea.tagline}
            </DialogDescription>
          </div>
        </div>

        {/* 7 Navigation Tabs */}
        <div className="px-6 border-b border-zinc-200 bg-zinc-50/70 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1 py-2 text-xs font-semibold">
            {[
              { id: 'overview', label: 'أ. نظرة عامة' },
              { id: 'financial', label: 'ب. التحليل المالي' },
              { id: 'market', label: 'ج. تحليل السوق' },
              { id: 'production', label: 'د. خطة الإنتاج' },
              { id: 'episodes', label: 'هـ. 10 حلقات مقترحة' },
              { id: 'strategy', label: 'و. استراتيجية الربح' },
              { id: 'launch', label: 'ز. خطة 30 يوماً' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 text-white shadow-xs font-bold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content by Tab */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-zinc-700 leading-relaxed">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <span className="font-bold text-zinc-900 text-sm block">لماذا تعد هذه القناة فرصة ممتازة اليوم؟</span>
                <p className="text-zinc-700 leading-relaxed">{idea.overviewReason}</p>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 text-sm mb-1.5">تعريف المجال والرسالة الأساسية</h4>
                <p className="text-zinc-600 leading-relaxed">{idea.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                  <span className="text-[11px] text-zinc-500 font-semibold block">الجمهور المستهدف:</span>
                  <strong className="text-zinc-900 block">{idea.targetAudience}</strong>
                  <span className="text-[10px] text-zinc-500">الفئة العمرية: {idea.targetAge}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                  <span className="text-[11px] text-zinc-500 font-semibold block">السوق الجغرافي الملائم:</span>
                  <strong className="text-zinc-900 block">{idea.targetRegion}</strong>
                  <span className="text-[10px] text-emerald-700 font-semibold">قدرة شرائية ونسب إعلانات مرتفعة</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIAL ANALYSIS */}
          {activeTab === 'financial' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">وسيط RPM (طويل)</span>
                  <strong className="text-base font-extrabold text-zinc-900 block mt-0.5">${idea.longFormRpmMedian}</strong>
                  <span className="text-[9px] text-zinc-500">P25-P75: ${idea.longFormRpmP25}–${idea.longFormRpmP75}</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">وسيط Shorts RPM</span>
                  <strong className="text-base font-extrabold text-[#FF0000] block mt-0.5">${idea.shortsRpmMedian}</strong>
                  <span className="text-[9px] text-zinc-500">منفصل عن الطويل</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">متوسط CPM للمعلن</span>
                  <strong className="text-base font-extrabold text-zinc-800 block mt-0.5">${idea.estimatedCpm}</strong>
                  <span className="text-[9px] text-zinc-500">تكلفة الألف ظهور</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200">
                  <span className="text-[10px] text-zinc-700 block font-semibold">درجة الربحية</span>
                  <strong className="text-base font-extrabold text-zinc-900 block mt-0.5">{idea.profitabilityTier}</strong>
                  <span className="text-[9px] text-zinc-500">تنوع قنوات الدخل</span>
                </div>
              </div>

              {/* Earnings Table by views */}
              <div className="rounded-xl border border-zinc-200 overflow-hidden">
                <div className="bg-zinc-100 p-2.5 px-4 font-bold text-zinc-900 text-xs">
                  تقدير أرباح إعلانات الفيديوهات الطويلة حسب عدد المشاهدات
                </div>
                <table className="w-full text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
                    <tr>
                      <th className="p-2.5 text-right">عدد المشاهدات</th>
                      <th className="p-2.5 text-right">الحد الأدنى (P25)</th>
                      <th className="p-2.5 text-right">السيناريو المتوسط</th>
                      <th className="p-2.5 text-right">الحد الأعلى (P75)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[10000, 50000, 100000, 500000, 1000000].map((v) => (
                      <tr key={v} className="hover:bg-zinc-50/50">
                        <td className="p-2.5 font-bold text-zinc-900">{v.toLocaleString()} مشاهدة</td>
                        <td className="p-2.5 text-zinc-600">${Math.round((v * idea.longFormRpmP25) / 1000)}</td>
                        <td className="p-2.5 font-bold text-[#FF0000]">${Math.round((v * idea.longFormRpmMedian) / 1000)}</td>
                        <td className="p-2.5 font-bold text-zinc-900">${Math.round((v * idea.longFormRpmP75) / 1000)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="space-y-0.5">
                  <span className="font-bold text-zinc-900 block">هل تريد محاكاة تفصيلية للمشاهدات اليومية؟</span>
                  <span className="text-[11px] text-zinc-500">جرب الحاسبة التفاعلية لحساب الإيرادات الشهرية والسنوية بدقة.</span>
                </div>
                <Button
                  size="sm"
                  variant="youtube"
                  onClick={() => onOpenCalculator(idea)}
                  className="text-xs font-bold gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>فتح الحاسبة المباشرة</span>
                </Button>
              </div>
            </div>
          )}

          {/* TAB 3: MARKET ANALYSIS */}
          {activeTab === 'market' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                  <span className="text-[10px] text-zinc-500 block font-semibold">حجم الطلب</span>
                  <strong className="text-base font-bold text-zinc-900">{idea.demandVolume}</strong>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                  <span className="text-[10px] text-zinc-500 block font-semibold">مستوى المنافسة</span>
                  <strong className="text-base font-bold text-zinc-900">{idea.competitionLevel}</strong>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-center">
                  <span className="text-[10px] text-zinc-500 block font-semibold">طبيعة المشاهدات</span>
                  <strong className="text-base font-bold text-zinc-900">{idea.demandNature}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                <h4 className="font-bold text-zinc-900 text-xs">تحليل الفرص غير المستغلة في السوق العربي:</h4>
                <p className="text-zinc-600 leading-relaxed">{idea.marketAnalysisDetails}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] leading-relaxed">
                <strong>ملاحظة حول معدل النقر (CTR):</strong> وفق إرشادات YouTube الرسمية، تقع معظم الفيديوهات بين 2% و 10% لنسبة النقر للظهور. لا تنخدع بالأرقام المبالغ فيها، فالصورة المصغرة الواضحة والعنوان الفضولي الصادق هما مفتاح الثبات في هذا النطاق.
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTION ROADMAP */}
          {activeTab === 'production' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">الظهور أمام الكاميرا</span>
                  <strong className="text-sm font-bold text-zinc-900 block mt-0.5">{idea.cameraAppearance}</strong>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">نوع الصوت</span>
                  <strong className="text-sm font-bold text-zinc-900 block mt-0.5">{idea.voiceType}</strong>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">وقت إنتاج المقطع</span>
                  <strong className="text-sm font-bold text-zinc-900 block mt-0.5">{idea.productionTime}</strong>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">المعدات المطلوبة</span>
                  <strong className="text-sm font-bold text-zinc-900 block mt-0.5">{idea.equipmentRequired}</strong>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">الاعتماد على الذكاء الاصطناعي</span>
                  <strong className="text-sm font-bold text-zinc-900 block mt-0.5">{idea.aiAssistanceSuitability}</strong>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block font-semibold">صعوبة المونتاج</span>
                  <strong className="text-sm font-bold text-zinc-900 block mt-0.5">{idea.editingDifficulty}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
                <h4 className="font-bold text-zinc-900 text-xs flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#FF0000]" />
                  <span>استراتيجية الصوت والبدائل النقية للموسيقى:</span>
                </h4>
                <p className="text-zinc-600 leading-relaxed">{idea.soundtrackStrategy}</p>
              </div>

              {idea.hasAiDuplicationWarning && (
                <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">تنبيه سياسات YouTube للمحتوى المكرر (Repetitive Content):</strong>
                    احذر من الاعتماد على برامج الذكاء الاصطناعي لإنشاء فيديوهات تلقائية دون لمسة بشرية أو تدقيق لغوي شخصي؛ سياسات يوتيوب تمنع تحقيق الدخل للقنوات التي تطرح محتوى مكرراً أو آلياً بكميات كبيرة دون قيمة مضافة.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: 10 EPISODES IDEAS */}
          {activeTab === 'episodes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="font-bold text-zinc-900 text-xs">
                  عناوين وسيناريوهات 10 حلقات أولى مع خطاف البداية (Hook)
                </span>
                <Badge variant="secondary" className="text-[10px]">10 حلقات جاهزة</Badge>
              </div>

              <div className="space-y-2.5">
                {idea.episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-400 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-zinc-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h5 className="font-bold text-zinc-900 text-xs">{ep.title}</h5>
                    </div>
                    <p className="text-[11px] text-[#FF0000] font-medium pr-7">
                      الهوك الافتتاحي: &quot;{ep.hook}&quot;
                    </p>
                    <p className="text-[11px] text-zinc-500 pr-7">
                      القيمة المكتسبة للمشاهد: {ep.keyTakeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: STRATEGY & REVENUE STREAMS */}
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-zinc-900 text-xs mb-2">مصادر الدخل المتاحة لهذه القناة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {idea.revenueStreams.map((stream, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-zinc-800 text-xs">{stream}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <h4 className="font-bold text-zinc-900 text-xs">خريطة طريق تحقيق العائد:</h4>
                <p className="text-zinc-600 leading-relaxed">{idea.monetizationRoadmap}</p>
              </div>
            </div>
          )}

          {/* TAB 7: 30-DAY LAUNCH PLAN */}
          {activeTab === 'launch' && (
            <div className="space-y-3">
              <h4 className="font-bold text-zinc-900 text-xs mb-1">خطة إطلاق وتثبيت القناة خلال 30 يوماً خطوة بخطوة:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-zinc-200 bg-white space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Calendar className="w-4 h-4 text-[#FF0000]" />
                    <span>الأسبوع 1: التأسيس والهوية</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">{idea.thirtyDayPlan.week1}</p>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 bg-white space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Calendar className="w-4 h-4 text-[#FF0000]" />
                    <span>الأسبوع 2: إنتاج بنك المحتوى</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">{idea.thirtyDayPlan.week2}</p>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 bg-white space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Calendar className="w-4 h-4 text-[#FF0000]" />
                    <span>الأسبوع 3: الانطلاق والنشر المزدوج</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">{idea.thirtyDayPlan.week3}</p>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 bg-white space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Calendar className="w-4 h-4 text-[#FF0000]" />
                    <span>الأسبوع 4: قياس الاحتفاظ والتحسين</span>
                  </div>
                  <p className="text-zinc-600 text-[11px] leading-relaxed">{idea.thirtyDayPlan.week4}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        <DialogFooter className="p-4 px-6 border-t border-zinc-200 bg-zinc-50/80 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            إغلاق التفاصيل
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenCalculator(idea)}
              className="text-xs font-bold gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>احسب أرباح القناة</span>
            </Button>

            <Button
              size="sm"
              variant="youtube"
              asChild
              className="text-xs font-bold gap-1.5"
            >
              <Link href="/reviews">
                <span>طلب مراجعة عنوان صورة</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
