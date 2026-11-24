'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  Coins,
  Award,
  ShieldCheck,
  TrendingUp,
  CheckCircle,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Sparkles,
  Trophy,
  History,
  Gift,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function PointsPage() {
  const { user, transactions, badges } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Level calculation (200 points per level)
  const currentLevelMin = (user.level - 1) * 200;
  const currentLevelMax = user.level * 200;
  const levelProgress = Math.min(100, Math.round(((user.pointsBalance - currentLevelMin) / 200) * 100));

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-500" />;
      case 'CheckCircle': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default: return <Sparkles className="w-5 h-5 text-primary" />;
    }
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
                <Coins className="w-5 h-5 text-zinc-900" />
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">نظام نقاط السند والإنجازات (Ledger)</h1>
                <Badge variant="secondary" className="text-xs font-bold">المستوى {user.level}</Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
                سجل معاملات مالي موثق يمنحك نقاطاً مقابل نقد المحتوى البناء وإتمام التعاونات الصادقة دون أي تفاعل مصطنع.
              </p>
            </div>

            <Button asChild variant="youtube" size="sm" className="rounded-xl text-xs font-bold gap-2">
              <Link href="/reviews">
                <Sparkles className="w-4 h-4 fill-white" />
                <span>اكسب نقاطاً بمراجعة صور الزملاء</span>
              </Link>
            </Button>
          </div>

          {/* Balance & Level Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Balance Card */}
            <Card className="bg-zinc-900 text-white border-zinc-800 shadow-sm rounded-2xl">
              <CardContent className="p-6 flex flex-col justify-between space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-400">رصيدك الحالي من نقاط السند</span>
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 text-white flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <div className="text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
                    <span className="tabular-nums">{user.pointsBalance}</span>
                    <span className="text-xs font-normal text-zinc-400">نقطة سند</span>
                  </div>
                  <div className="mt-2 text-[11px] text-zinc-300 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>رصيد نشط ومتاح للاستخدام الفوري</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-400">
                  تُستخدم النقاط لطلب مراجعات متقدمة وتسليط الضوء على قناتك
                </div>
              </CardContent>
            </Card>

            {/* Level Progress Card */}
            <Card className="bg-white border-zinc-200/90 shadow-2xs rounded-2xl">
              <CardContent className="p-6 flex flex-col justify-between space-y-4 h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">رتبة صانع المحتوى</span>
                    <Badge variant="secondary" className="text-xs font-bold">
                      المستوى {user.level}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mt-2">صانع محتوى مساند (Pro Creator)</h3>

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs text-zinc-600">
                      <span>التقدم نحو المستوى {user.level + 1}</span>
                      <span className="font-bold text-zinc-900">{levelProgress}%</span>
                    </div>
                    <Progress value={levelProgress} className="h-2 bg-zinc-200" />
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500">
                  تحتاج إلى {200 - (user.pointsBalance % 200)} نقطة إضافية للترقية للشارة الذهبية القادمة.
                </p>
              </CardContent>
            </Card>

            {/* Quick Rewards Info */}
            <Card className="bg-white border-slate-200/90 shadow-2xs">
              <CardContent className="p-6 flex flex-col justify-between space-y-3 h-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Gift className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-900">مكافآت السند المتاحة</h3>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                    <span>طلب مراجعة صورة مصغرة</span>
                    <strong className="text-navy-900">30 نقطة</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                    <span>تثبيت القناة في التغذية الرئيسية</span>
                    <strong className="text-navy-900">150 نقطة</strong>
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild className="w-full text-xs">
                  <Link href="/reviews">استبدال النقاط بمراجعة</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Badges Shelf */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-navy-900">أوسمة وإنجازات صانع المحتوى</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  className={`border-slate-200/80 transition-all ${
                    badge.isUnlocked ? 'bg-white shadow-2xs' : 'bg-slate-50 opacity-60'
                  }`}
                >
                  <CardContent className="p-4 text-center space-y-2">
                    <div
                      className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${
                        badge.isUnlocked
                          ? 'bg-amber-50 text-amber-600 shadow-xs ring-1 ring-amber-200'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {renderBadgeIcon(badge.iconName)}
                    </div>
                    <h4 className="text-xs font-bold text-navy-900">{badge.titleAr}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                      {badge.descriptionAr}
                    </p>
                    {badge.isUnlocked ? (
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                        تم الإنجاز ✓
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full inline-block">
                        قيد الإنجاز
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Immutable Points Ledger Transactions Table */}
          <Card className="bg-white border-slate-200/90 shadow-2xs overflow-hidden">
            <CardHeader className="p-5 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-navy-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" />
                  <span>سجل الحركات المالية الموثقة للنقاط (Ledger)</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  سجل غير قابل للتعديل يوثق كل إضافة أو استهلاك لرصيد النقاط
                </CardDescription>
              </div>

              <Badge variant="outline" className="text-xs text-slate-500">
                {transactions.length} حركات
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {transactions.map((tx) => {
                  const isPositive = tx.amount > 0;

                  return (
                    <div
                      key={tx.id}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isPositive
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                            {tx.description}
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            {new Date(tx.createdAt).toLocaleDateString('ar-SA')} • معرّف المعاملة: {tx.id}
                          </span>
                        </div>
                      </div>

                      <div className="text-left shrink-0">
                        <span
                          className={`text-sm sm:text-base font-extrabold tabular-nums ${
                            isPositive ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isPositive ? `+${tx.amount}` : tx.amount} نقطة
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          الرصيد بعد: {tx.balanceAfter}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
}
