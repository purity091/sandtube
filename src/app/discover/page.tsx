'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  Compass,
  Search,
  Users2,
  Filter,
  CheckCircle2,
  Send,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Layers,
  Youtube,
  TrendingUp,
  Award,
  Video,
  Clock,
} from 'lucide-react';
import { YouTubeChannel, CollabType } from '@/lib/types';
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

const CATEGORIES = ['الكل', 'التقنية والتعليم', 'التصميم والفنون', 'بودكاست وحوارات', 'ألعاب وترفيه'];

export default function DiscoverPage() {
  const { channels, user, activeChannel, addCollaboration } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // Collab Modal State
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [targetChannel, setTargetChannel] = useState<YouTubeChannel | null>(null);
  const [collabType, setCollabType] = useState<CollabType>('joint_video');
  const [collabTitle, setCollabTitle] = useState('');
  const [collabDescription, setCollabDescription] = useState('');
  const [collabAudience, setCollabAudience] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter channels
  const filteredChannels = channels.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.customUrl && ch.customUrl.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'الكل' || ch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCollabModal = (channel: YouTubeChannel) => {
    setTargetChannel(channel);
    setCollabTitle(`اقتراح تعاون مشترك مع ${channel.title}`);
    setCollabDescription(`مرحباً، أود اقتراح فكرة تعاون بين قناتينا لإنتاج حلقة مميزة يستفيد منها جمهورنا المشترك.`);
    setCollabAudience(`المهتمون بـ ${channel.category}`);
    setCollabModalOpen(true);
    setIsSuccess(false);
  };

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetChannel || !activeChannel) return;

    addCollaboration({
      requesterId: user.id,
      requesterName: user.fullName,
      requesterChannelTitle: activeChannel.title,
      requesterChannelAvatar: activeChannel.thumbnailUrl,
      targetId: targetChannel.userId,
      targetChannelTitle: targetChannel.title,
      targetChannelAvatar: targetChannel.thumbnailUrl,
      collabType,
      title: collabTitle,
      description: collabDescription,
      targetAudience: collabAudience,
    });

    setIsSuccess(true);
    showToast(`تم إرسال طلب التعاون إلى ${targetChannel.title} بنجاح`);
    setTimeout(() => {
      setCollabModalOpen(false);
      setIsSuccess(false);
    }, 1200);
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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* YouTube Explore Hero Header */}
          <div className="relative overflow-hidden rounded-2xl bg-white text-zinc-900 p-6 sm:p-7 border border-zinc-200/90 shadow-2xs">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900">
                  اكتشف صناع المحتوى المؤثرين وابدأ شراكات حقيقية
                </h1>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  تواصل مع قنوات تتطابق في الاهتمام والتخصص لإنتاج محتوى مشترك، تسجيل بودكاست، أو تبادل الخبرات.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5 shrink-0">
                <span className="text-zinc-900 font-bold block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-zinc-700" />
                  شراكات موثوقة 100%
                </span>
                <p className="text-[11px] text-zinc-500 max-w-[220px]">
                  التعاونات خالية تماماً من تبادل الاشتراكات الوهمي (Sub4Sub) وتركز على قيمة المحتوى المشترك.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filter Chips (YouTube Style) */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <Button
                    key={cat}
                    variant={isActive ? 'chipActive' : 'chip'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="shrink-0 text-xs"
                  >
                    {cat}
                  </Button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500 font-semibold">
              عرض {filteredChannels.length} قناة متخصصة
            </div>
          </div>

          {/* Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredChannels.map((channel) => (
              <Card
                key={channel.id}
                className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Channel Header Banner */}
                  <div className="relative h-24 w-full bg-slate-900 rounded-t-2xl overflow-hidden">
                    {channel.bannerUrl ? (
                      <img src={channel.bannerUrl} alt={channel.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-navy-800 to-primary/30" />
                    )}

                    <div className="absolute top-2 left-2">
                      <Badge variant="cyan" className="text-[10px] font-bold">
                        {channel.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pt-0 pb-3 px-5 -mt-7 relative z-10">
                    <div className="flex items-end justify-between">
                      <Avatar className="w-16 h-16 rounded-2xl ring-4 ring-white shadow-md">
                        <AvatarImage src={channel.thumbnailUrl} alt={channel.title} className="object-cover" />
                        <AvatarFallback>{channel.title.slice(0, 2)}</AvatarFallback>
                      </Avatar>

                      {channel.isMonetized && (
                        <Badge variant="success" className="text-[10px]">محققة للربح YPP</Badge>
                      )}
                    </div>

                    <div className="pt-2">
                      <CardTitle className="text-base font-bold text-navy-900 flex items-center gap-1.5">
                        <span className="truncate">{channel.title}</span>
                        <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10 shrink-0" />
                      </CardTitle>
                      <CardDescription className="text-xs font-semibold text-primary">
                        {channel.customUrl}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="px-5 py-2 space-y-3">
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {channel.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center text-xs">
                      <div>
                        <span className="block font-extrabold text-navy-900 text-sm">
                          {channel.subscriberCount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">مشترك</span>
                      </div>
                      <div>
                        <span className="block font-extrabold text-navy-900 text-sm">
                          {channel.watchTimeHours.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">ساعة مشاهدة</span>
                      </div>
                      <div>
                        <span className="block font-extrabold text-navy-900 text-sm">
                          {channel.videoCount}
                        </span>
                        <span className="text-[10px] text-slate-400">فيديو</span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Footer Buttons */}
                <CardFooter className="p-4 px-5 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-8 text-xs text-slate-600 hover:text-navy-900 gap-1.5"
                  >
                    <a href={`https://youtube.com/${channel.customUrl}`} target="_blank" rel="noreferrer">
                      <span>YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Button>

                  <Button
                    variant="youtube"
                    size="sm"
                    onClick={() => handleOpenCollabModal(channel)}
                    className="h-8 text-xs font-bold gap-1.5 rounded-lg"
                  >
                    <Users2 className="w-3.5 h-3.5" />
                    <span>طلب تعاون مشترك</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </main>
      </div>

      {/* Collaboration Proposal Dialog */}
      <Dialog open={collabModalOpen} onOpenChange={setCollabModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Users2 className="w-6 h-6" />
            </div>
            <DialogTitle className="text-base font-bold text-navy-900">
              إرسال دعوة تعاون إلى {targetChannel?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              وضح فكرة المحتوى المشترك والجمهور المستهدف لتعزيز فرص قبول الدعوة.
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-navy-900 text-sm">تم إرسال طلب التعاون بنجاح!</h4>
              <p className="text-xs text-slate-500">
                سيصل إشعار فوري لصاحب القناة ويمكنك متابعة حالة الطلب في صفحة &quot;التعاون&quot;.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCollabSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">نوع الشراكة المقترحة:</label>
                <select
                  value={collabType}
                  onChange={(e) => setCollabType(e.target.value as CollabType)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="joint_video">فيديو مشترك (Joint Video)</option>
                  <option value="guest_appearance">ظهور كضيف (Guest Appearance)</option>
                  <option value="podcast_interview">حلقة بودكاست حوارية</option>
                  <option value="cross_promotion">إشارة متبادلة وتوصية بالمحتوى</option>
                  <option value="skill_exchange">تبادل خبرات ومراجعات فنية</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">عنوان مقترح للتعاون:</label>
                <Input
                  value={collabTitle}
                  onChange={(e) => setCollabTitle(e.target.value)}
                  required
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">تفاصيل الفكرة والسيناريو:</label>
                <textarea
                  value={collabDescription}
                  onChange={(e) => setCollabDescription(e.target.value)}
                  rows={3}
                  required
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">الجمهور المستهدف:</label>
                <Input
                  value={collabAudience}
                  onChange={(e) => setCollabAudience(e.target.value)}
                  required
                  className="text-xs"
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCollabModalOpen(false)}
                  className="text-xs"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5 ml-1.5" />
                  <span>إرسال دعوة التعاون</span>
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
