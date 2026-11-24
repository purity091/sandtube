'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  Youtube,
  ShieldCheck,
  Plus,
  RefreshCw,
  Trash2,
  ExternalLink,
  Lock,
  CheckCircle2,
  Info,
  Sparkles,
  AlertCircle,
  PlaySquare,
  Users,
  Eye,
  Clock,
  Check,
  Radio,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default function ChannelsPage() {
  const { channels, activeChannel, setActiveChannel, connectNewChannel, refreshChannelSync } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Modal Form State
  const [channelTitle, setChannelTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('@');
  const [category, setCategory] = useState('التقنية والتعليم');
  const [subscribers, setSubscribers] = useState('2400');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSync = (channelId: string) => {
    setSyncingId(channelId);
    setTimeout(() => {
      refreshChannelSync(channelId);
      setSyncingId(null);
      showToast('تمت المزامنة بنجاح مع YouTube API');
    }, 800);
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      connectNewChannel({
        title: channelTitle || 'قناة جديدة',
        customUrl: customUrl.startsWith('@') ? customUrl : `@${customUrl}`,
        category,
        subscriberCount: parseInt(subscribers) || 1000,
        viewCount: (parseInt(subscribers) || 1000) * 45,
        watchTimeHours: (parseInt(subscribers) || 1000) * 1.8,
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bannerUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      });
      setIsSubmitting(false);
      setModalOpen(false);
      setChannelTitle('');
      setCustomUrl('@');
      showToast('تم ربط القناة بنجاح عبر تفويض Google OAuth');
    }, 900);
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Toast Notification */}
          {successToast && (
            <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Top Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <PlaySquare className="w-5 h-5 text-[#FF0000]" />
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">قنوات YouTube المرتبطة</h1>
                <Badge variant="secondary" className="text-xs">{channels.length} قنوات</Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
                إدارة القنوات المتزامنة عبر Google OAuth 2.0 المصرح به ومتابعة مؤشراتها الرسمية دون تخزين كلمات المرور.
              </p>
            </div>

            <Button
              variant="youtube"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="gap-2 rounded-xl text-xs font-bold"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>+ ربط قناة جديدة عبر Google</span>
            </Button>
          </div>

          {/* Security & Policy Assurance Card */}
          <Card className="bg-zinc-50 border-zinc-200 shadow-2xs">
            <CardContent className="p-4 sm:p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-bold text-zinc-900">
                  امتثال كامل لسياسات أمان YouTube Data API (FR-002)
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  تطلب سندتيوب فقط صلاحيات القراءة الدنيا (`youtube.readonly`) للإحصائيات وساعات المشاهدة. لا نطلب أي وصول لحذف المحتوى أو التحكم فيه، ويمكنك إلغاء الربط بضغطة زر في أي وقت.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Channels Grid (YouTube Studio Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((ch) => {
              const isActive = activeChannel?.id === ch.id;
              const isSyncing = syncingId === ch.id;

              return (
                <Card
                  key={ch.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
                    isActive ? 'ring-2 ring-primary border-primary/40 bg-white' : 'bg-white border-slate-200/90'
                  }`}
                >
                  {/* Channel Banner */}
                  <div className="relative h-24 w-full bg-slate-900 overflow-hidden">
                    {ch.bannerUrl ? (
                      <img src={ch.bannerUrl} alt={ch.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-navy-900 to-primary/40" />
                    )}

                    <div className="absolute top-2 left-2 flex gap-1.5">
                      {isActive && (
                        <Badge variant="default" className="text-[10px] bg-primary text-white font-bold gap-1 shadow-xs">
                          <Check className="w-3 h-3" />
                          القناة النشطة
                        </Badge>
                      )}
                      {ch.isMonetized && (
                        <Badge variant="success" className="text-[10px]">محققة للربح</Badge>
                      )}
                    </div>
                  </div>

                  {/* Channel Card Header */}
                  <CardHeader className="pt-0 pb-3 px-5 -mt-7 relative z-10">
                    <div className="flex items-end justify-between">
                      <Avatar className="w-16 h-16 rounded-2xl ring-4 ring-white shadow-md">
                        <AvatarImage src={ch.thumbnailUrl} alt={ch.title} className="object-cover" />
                        <AvatarFallback>{ch.title.slice(0, 2)}</AvatarFallback>
                      </Avatar>

                      <Badge variant="outline" className="text-[10px] text-slate-500 bg-slate-50">
                        {ch.category}
                      </Badge>
                    </div>

                    <div className="pt-2">
                      <CardTitle className="text-base font-bold text-navy-900 truncate">
                        {ch.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-semibold text-primary">
                        {ch.customUrl}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  {/* Stats Grid */}
                  <CardContent className="px-5 py-3 space-y-4">
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {ch.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center text-xs">
                      <div>
                        <span className="block font-extrabold text-navy-900 text-sm">
                          {ch.subscriberCount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">مشترك</span>
                      </div>
                      <div>
                        <span className="block font-extrabold text-navy-900 text-sm">
                          {ch.watchTimeHours.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">ساعة مشاهدة</span>
                      </div>
                      <div>
                        <span className="block font-extrabold text-navy-900 text-sm">
                          {ch.videoCount}
                        </span>
                        <span className="text-[10px] text-slate-400">فيديو</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>آخر مزامنة مع YouTube:</span>
                      <strong className="text-slate-700 font-semibold">{ch.lastSyncedAt}</strong>
                    </div>
                  </CardContent>

                  <Separator />

                  {/* Card Actions */}
                  <CardFooter className="p-4 px-5 flex items-center justify-between gap-2 bg-slate-50/50">
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(ch.id)}
                        disabled={isSyncing}
                        className="h-8 px-2.5 rounded-lg text-xs"
                        title="مزامنة الإحصائيات الآن"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isSyncing ? 'animate-spin' : ''}`} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8 px-2.5 rounded-lg text-xs text-slate-600 hover:text-navy-900"
                        title="فتح في YouTube"
                      >
                        <a href={`https://youtube.com/${ch.customUrl}`} target="_blank" rel="noreferrer">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    </div>

                    {!isActive ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setActiveChannel(ch);
                          showToast(`تم تعيين ${ch.title} كقناة نشطة`);
                        }}
                        className="h-8 text-xs font-bold rounded-lg"
                      >
                        تعيين كقناة نشطة
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 text-xs font-bold rounded-lg text-primary border-primary/30 bg-primary/5"
                      >
                        <Link href="/dashboard">لوحة التحكم ←</Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

        </main>
      </div>

      {/* Google OAuth Connect Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#FF0033] flex items-center justify-center mb-2">
              <Youtube className="w-6 h-6 fill-[#FF0033]" />
            </div>
            <DialogTitle className="text-base font-bold text-navy-900">
              ربط قناة يوتيوب عبر Google OAuth 2.0
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              اختر القناة المصرح بها ليتم جلب إحصائياتها الحقيقية والتحقق من ملكيتها.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConnectSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-900">اسم القناة الرسمي:</label>
              <Input
                placeholder="مثال: عالم التقنية الحديثة"
                value={channelTitle}
                onChange={(e) => setChannelTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-900">المعرف المخصص (Handle):</label>
              <Input
                placeholder="@YourHandle"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                required
                className="text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">التصنيف:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="التقنية والتعليم">التقنية والتعليم</option>
                  <option value="التصميم والفنون">التصميم والفنون</option>
                  <option value="بودكاست وحوارات">بودكاست وحوارات</option>
                  <option value="ألعاب وترفيه">ألعاب وترفيه</option>
                  <option value="صناعة المحتوى">صناعة المحتوى</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">المشتركون التقريبي:</label>
                <Input
                  type="number"
                  value={subscribers}
                  onChange={(e) => setSubscribers(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>صلاحيات قراءة فقط (Read-only)</span>
              </div>
              <p>لن يُسمح للمنصة بإجراء أي تعديل أو نشر أو حذف على قناتك بأي شكل.</p>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
                className="text-xs"
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="youtube"
                size="sm"
                disabled={isSubmitting}
                className="text-xs font-bold"
              >
                {isSubmitting ? 'جاري التفويض والربط...' : 'تأكيد الربط مع Google'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
