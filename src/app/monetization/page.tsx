'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  ShieldCheck,
  Info,
  TrendingUp,
  Calendar,
  ExternalLink,
  Sparkles,
  Lock,
  ArrowUpRight,
  Flame,
  FileCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function MonetizationPage() {
  const { activeChannel } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!activeChannel) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-50 text-[#FF0033] mx-auto flex items-center justify-center">
            <DollarSign className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">يرجى ربط قناة يوتيوب أولاً</h2>
          <p className="text-xs text-slate-500">
            للوصول إلى مسار تتبع شروط الأرباح الرسمية، يجب أن تكون هناك قناة نشطة مرتبطة.
          </p>
          <Button asChild variant="youtube">
            <Link href="/channels">ربط قناة يوتيوب الآن</Link>
          </Button>
        </main>
      </div>
    );
  }

  const subTarget = 1000;
  const watchTarget = 4000;
  const subPercent = Math.min(100, Math.round((activeChannel.subscriberCount / subTarget) * 100));
  const watchPercent = Math.min(100, Math.round((activeChannel.watchTimeHours / watchTarget) * 100));

  const remainingHours = Math.max(0, watchTarget - activeChannel.watchTimeHours);
  const estimatedDaysToEligible = Math.round(remainingHours / 12); // ~12 hours/day average

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

        {/* Mobile Sidebar */}
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
          
          {/* Top Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-zinc-900" />
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
                  برنامج شركاء YouTube (YPP) — مسار تحقيق الربح
                </h1>
                <Badge variant="secondary" className="text-xs">
                  {activeChannel.isMonetized ? 'القناة محققة للربح' : 'قيد استيفاء الشروط'}
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
                متابعة دقيقة ومباشرة لمتطلبات الأهلية الرسمية المعتمدة من YouTube لتفعيل إعلانات الفيديو وميزات التمويل.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-2 rounded-xl text-xs font-semibold border-zinc-300 hover:bg-zinc-100"
            >
              <a href="https://support.google.com/youtube/answer/72851" target="_blank" rel="noreferrer">
                <span>سياسات تحقيق الدخل في YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>

          {/* Official YouTube Disclaimer Box */}
          <Card className="bg-zinc-50 border-zinc-200 shadow-2xs">
            <CardContent className="p-4 sm:p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-bold text-zinc-900">
                  تنويه المادة FR-009 — شروط الأهلية والمراجعة البشرية
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  استيفاء الشروط العددية (1,000 مشترك و 4,000 ساعة مشاهدة) يتيح لقناتك التقدم بطلب الانضمام لبرنامج الشركاء، ولكنه لا يضمن القبول التلقائي؛ حيث تخضع القناة لمراجعة بشرية مستقلة من فريق YouTube للتحقق من سياسات أصالة المحتوى وعدم وجود مخالفات حقوق الطبع والنشر.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Condition 1: Subscribers */}
            <Card className="bg-white border-slate-200/90 shadow-2xs">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-navy-900">عدد المشتركين المطلوب</CardTitle>
                      <CardDescription className="text-xs">الحد الأدنى: 1,000 مشترك حقيقي</CardDescription>
                    </div>
                  </div>
                  <Badge variant="success" className="text-xs font-bold gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    مستوفى (100%)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-navy-900 tabular-nums">
                    {activeChannel.subscriberCount.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">/ 1,000 مشترك</span>
                </div>
                <Progress value={subPercent} className="h-3" />
                <p className="text-[11px] text-slate-500">
                  تم استيفاء هذا الشرط بنجاح ومصرح به في شبكة YouTube الرسمية.
                </p>
              </CardContent>
            </Card>

            {/* Condition 2: Watch Hours */}
            <Card className="bg-white border-slate-200/90 shadow-2xs">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-navy-900">ساعات المشاهدة العلنية</CardTitle>
                      <CardDescription className="text-xs">الحد الأدنى: 4,000 ساعة خلال 365 يوماً</CardDescription>
                    </div>
                  </div>
                  <Badge variant={watchPercent >= 100 ? 'success' : 'warning'} className="text-xs font-bold">
                    {watchPercent}% مكتمل
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-navy-900 tabular-nums">
                    {activeChannel.watchTimeHours.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">/ 4,000 ساعة</span>
                </div>
                <Progress value={watchPercent} className="h-3" />
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-primary font-bold">متبقي {remainingHours} ساعة مشاهدة</span>
                  <span className="text-slate-400">تحتسب الساعات العامة فقط</span>
                </div>
              </CardContent>
            </Card>

            {/* Condition 3: 2-Step Verification */}
            <Card className="bg-white border-slate-200/90 shadow-2xs">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-navy-900">التحقق بخطوتين (2-Step Verification)</h3>
                    <Badge variant="success" className="text-[10px]">مفعل ✓</Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    حساب Google المالك للقناة محمي بخاصية التحقق بخطوتين، وهو شرط أمان إلزامي للانضمام إلى YPP.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Condition 4: Community Guidelines Clean */}
            <Card className="bg-white border-slate-200/90 shadow-2xs">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-navy-900">إرشادات المنتدى (0 إنذارات نشطة)</h3>
                    <Badge variant="success" className="text-[10px]">خالٍ من الإنذارات ✓</Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    قناتك لا تحتوي على أي مخالفات نشطة لإرشادات المنتدى، ومطابقة للسياسات العامة للمحتوى.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growth Velocity Forecast Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-900 to-navy-800 text-white shadow-card border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold">
                بمعدل مشاهداتك الحالي، ستصل إلى 4,000 ساعة كاملة خلال تقريباً {estimatedDaysToEligible} يوماً!
              </h3>
              <p className="text-xs text-slate-300">
                تسريع التعاونات المشتركة ونشر فيديوهات بمعدل نقر عالي يقلص هذه المدة بنسبة 40%.
              </p>
            </div>

            <Button asChild variant="youtube" size="sm" className="rounded-xl text-xs font-bold shrink-0">
              <Link href="/reviews">تحسين صورك وعناوينك الآن</Link>
            </Button>
          </div>

        </main>
      </div>
    </div>
  );
}
