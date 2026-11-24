'use client';

import React, { useState, useMemo } from 'react';
import { DetailedChannelIdea, NICHE_BENCHMARKS } from '@/lib/channelIdeasData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Info,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  Flame,
} from 'lucide-react';

interface RevenueCalculatorProps {
  idea?: DetailedChannelIdea | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RevenueCalculatorModal({ idea, isOpen, onClose }: RevenueCalculatorProps) {
  const defaultNiche = idea ? idea.benchmarkKey : 'education_science';
  const [selectedNicheKey, setSelectedNicheKey] = useState<string>(defaultNiche);
  const [formatType, setFormatType] = useState<'long_form' | 'shorts'>('long_form');
  const [monthlyViews, setMonthlyViews] = useState<number>(50000);
  const [customRpmOverride, setCustomRpmOverride] = useState<string>('');
  const [geoMultiplier, setGeoMultiplier] = useState<number>(1.0); // 1.0 = Mixed/Arab, 1.8 = GCC/US, 0.6 = Low-income region

  const benchmark = NICHE_BENCHMARKS[selectedNicheKey] || NICHE_BENCHMARKS.education_science;

  // Active RPM calculation: Long-form vs Shorts are strictly separated as mandated
  const activeMedianRpm = useMemo(() => {
    if (customRpmOverride && !isNaN(parseFloat(customRpmOverride))) {
      return parseFloat(customRpmOverride);
    }
    if (formatType === 'shorts') {
      return Number((benchmark.shortsRpmMedian * geoMultiplier).toFixed(3));
    }
    return Number((benchmark.medianRpm * geoMultiplier).toFixed(2));
  }, [customRpmOverride, formatType, benchmark, geoMultiplier]);

  const activeP25Rpm = useMemo(() => {
    if (formatType === 'shorts') {
      return Number((benchmark.shortsRpmMin * geoMultiplier).toFixed(3));
    }
    return Number((benchmark.p25Rpm * geoMultiplier).toFixed(2));
  }, [formatType, benchmark, geoMultiplier]);

  const activeP75Rpm = useMemo(() => {
    if (formatType === 'shorts') {
      return Number((benchmark.shortsRpmMax * geoMultiplier).toFixed(3));
    }
    return Number((benchmark.p75Rpm * geoMultiplier).toFixed(2));
  }, [formatType, benchmark, geoMultiplier]);

  // Standard Formula: Estimated Revenue = (Views × RPM) / 1000
  const monthlyRevenueMedian = (monthlyViews * activeMedianRpm) / 1000;
  const monthlyRevenueMin = (monthlyViews * activeP25Rpm) / 1000;
  const monthlyRevenueMax = (monthlyViews * activeP75Rpm) / 1000;

  const dailyViews = Math.round(monthlyViews / 30);
  const dailyRevenue = monthlyRevenueMedian / 30;
  const weeklyRevenue = monthlyRevenueMedian / 4.3;
  const annualRevenue = monthlyRevenueMedian * 12;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl p-6 max-h-[92vh] overflow-y-auto border border-zinc-200 shadow-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-zinc-700 text-xs font-bold mb-1">
            <Calculator className="w-4 h-4 text-[#FF0000]" />
            <span>حاسبة أرباح يوتيوب المرجعية التفاعلية</span>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-bold text-zinc-900">
            {idea ? `تقدير أرباح قناة: ${idea.title}` : 'حاسبة أرباح وإيرادات قنوات YouTube'}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            مبنية على معادلة YouTube الرسمية: <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-900 font-bold font-mono">Revenue = (Views × RPM) / 1000</code> مع فصل أرباح الفيديوهات الطويلة عن Shorts تماماً.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-3">
          {/* Format Selector: Long-form vs Shorts */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-900 block">نوع صيغة المحتوى المراد حسابه:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormatType('long_form');
                  setCustomRpmOverride('');
                }}
                className={`p-3 rounded-xl border text-right transition-all ${
                  formatType === 'long_form'
                    ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900'
                    : 'border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">فيديوهات طويلة (Long-Form)</span>
                  <Badge variant="secondary" className="text-[10px]">RPM وسيط: ${benchmark.medianRpm}</Badge>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  إعلانات قابلة للتخطي، إعلانات منتصف الفيديو، وأعلى معدل عائد.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormatType('shorts');
                  setCustomRpmOverride('');
                }}
                className={`p-3 rounded-xl border text-right transition-all ${
                  formatType === 'shorts'
                    ? 'border-[#FF0000] bg-red-50/50 ring-1 ring-[#FF0000]'
                    : 'border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">فيديوهات قصيرة (Shorts)</span>
                  <Badge variant="youtube" className="text-[10px]">RPM وسيط: ${benchmark.shortsRpmMedian}</Badge>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  مشاركات أرباح خلاصة الشورتس (من $0.02 إلى $0.45 تقريباً).
                </p>
              </button>
            </div>
          </div>

          {/* Calculator Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Niche select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-900">المجال / التخصص:</label>
              <select
                value={selectedNicheKey}
                onChange={(e) => {
                  setSelectedNicheKey(e.target.value);
                  setCustomRpmOverride('');
                }}
                className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {Object.values(NICHE_BENCHMARKS).map((bench) => (
                  <option key={bench.nicheKey} value={bench.nicheKey}>
                    {bench.nicheNameAr} (${bench.medianRpm})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Target Region / Audience Market */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-900">السوق الجغرافي للجمهور:</label>
              <select
                value={geoMultiplier}
                onChange={(e) => setGeoMultiplier(parseFloat(e.target.value))}
                className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value={1.0}>مختلط / دول الشرق الأوسط (المعدل الأساسي 1.0x)</option>
                <option value={1.7}>دول الخليج والولايات المتحدة وأوروبا (مرتفع 1.7x)</option>
                <option value={0.65}>شمال أفريقيا وجنوب آسيا (0.65x)</option>
              </select>
            </div>

            {/* 3. Custom RPM override */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-900">تخصيص RPM يدوياً ($):</label>
              <Input
                type="number"
                step="0.01"
                placeholder={`الافتراضي $${activeMedianRpm}`}
                value={customRpmOverride}
                onChange={(e) => setCustomRpmOverride(e.target.value)}
                className="text-xs font-mono"
              />
            </div>
          </div>

          {/* Monthly Views Slider & Presets */}
          <div className="space-y-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-900">المشاهدات الشهرية المحتملة:</span>
              <span className="font-extrabold text-zinc-900 text-base tabular-nums">
                {monthlyViews.toLocaleString('ar-SA')} مشاهدة
              </span>
            </div>

            <input
              type="range"
              min={1000}
              max={1000000}
              step={5000}
              value={monthlyViews}
              onChange={(e) => setMonthlyViews(parseInt(e.target.value))}
              className="w-full accent-zinc-900 h-2 bg-zinc-200 rounded-lg cursor-pointer"
            />

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[10000, 50000, 100000, 250000, 500000, 1000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMonthlyViews(preset)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-colors ${
                    monthlyViews === preset
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  {preset >= 1000000 ? 'مليون مشاهدة' : `${preset / 1000} ألف`}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Results Card */}
          <div className="p-5 rounded-2xl bg-zinc-900 text-white space-y-4 shadow-sm border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-zinc-400 font-medium">الدخل الشهري الصافي المتوقع (الوسيط)</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-1.5 tabular-nums">
                  <span>${Math.round(monthlyRevenueMedian).toLocaleString()}</span>
                  <span className="text-xs font-normal text-zinc-400">
                    (~{(Math.round(monthlyRevenueMedian) * 3.75).toLocaleString()} ر.س)
                  </span>
                </div>
              </div>

              <div className="text-left text-xs space-y-1">
                <Badge variant="secondary" className="text-[10px] bg-zinc-800 text-zinc-200 border-zinc-700">RPM: ${activeMedianRpm}</Badge>
                <span className="block text-[10px] text-zinc-400">اليومي: ~${Math.round(dailyRevenue).toLocaleString()}</span>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* P25 vs Median vs P75 Scenarios */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700">
                <span className="text-[10px] text-zinc-400 block font-semibold">الحد الأدنى (P25)</span>
                <strong className="text-white text-sm font-bold block mt-0.5">
                  ${Math.round(monthlyRevenueMin).toLocaleString()}
                </strong>
                <span className="text-[9px] text-zinc-400">RPM: ${activeP25Rpm}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-800 border-2 border-zinc-500">
                <span className="text-[10px] text-zinc-300 block font-bold">السيناريو المتوسط</span>
                <strong className="text-white text-sm font-extrabold block mt-0.5">
                  ${Math.round(monthlyRevenueMedian).toLocaleString()}
                </strong>
                <span className="text-[9px] text-zinc-400">وسيط العينة</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700">
                <span className="text-[10px] text-zinc-300 block font-semibold">الحد الأعلى (P75)</span>
                <strong className="text-white text-sm font-bold block mt-0.5">
                  ${Math.round(monthlyRevenueMax).toLocaleString()}
                </strong>
                <span className="text-[9px] text-zinc-400">RPM: ${activeP75Rpm}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
              <span>الأرباح السنوية المقدرة (استمرار النشر):</span>
              <strong className="text-white font-extrabold text-sm tabular-nums">
                ${Math.round(annualRevenue).toLocaleString()} سنويّاً
              </strong>
            </div>
          </div>

          {/* Official Source & Methodology Disclosure */}
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-zinc-900">
              <Info className="w-4 h-4 text-zinc-600 shrink-0" />
              <span>منهجية البيانات وتنبيه الدقة (Disclosures):</span>
            </div>
            <p className="text-[11px] text-zinc-600">
              • الأرقام مبنية على دراسة <strong>AIR Media-Tech (مايو 2025 - مايو 2026)</strong> لـ 300 قناة YouTube محققة للدخل، وليست أرقاماً عشوائية أو ضماناً بنكياً ملزماً.
              <br />
              • الأرباح الفعلية تتأثر بنسبة المشاهدات المؤهلة للإعلانات (Monetized Playbacks)، والمواسم التجارية (Q4 هو الأعلى سنوياً)، وسلوك المشاهدين وتفاعلهم.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-zinc-100 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            إغلاق الحاسبة
          </Button>

          <Button
            size="sm"
            variant="youtube"
            onClick={() => {
              navigator.clipboard?.writeText(
                `تقدير أرباح قناة يوتيوب (${benchmark.nicheNameAr}): ${monthlyViews.toLocaleString()} مشاهدة شهرية بعائد مقدر $${Math.round(monthlyRevenueMedian)} شهرياً (RPM: $${activeMedianRpm})`
              );
              alert('تم نسخ تفاصيل التقدير للحافظة!');
            }}
            className="text-xs font-bold"
          >
            نسخ تقرير الأرباح للحافظة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
