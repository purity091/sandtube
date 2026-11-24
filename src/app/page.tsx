'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import VideoCard from '@/components/youtube/VideoCard';
import ShortsCard from '@/components/youtube/ShortsCard';

const WatchModal = dynamic(() => import('@/components/youtube/WatchModal'), {
  ssr: false,
});
const QuickReviewModal = dynamic(() => import('@/components/youtube/QuickReviewModal'), {
  ssr: false,
});
import { initialYouTubeVideos, initialShorts } from '@/lib/mockData';
import { YouTubeVideo } from '@/lib/types';
import { useSanadTube } from '@/lib/store';
import {
  Flame,
  Sparkles,
  TrendingUp,
  Users2,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Play,
  Film,
  Zap,
  CheckCircle2,
  DollarSign,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CATEGORIES = [
  'الكل',
  '🔥 الأكثر رواجاً',
  'التقنية والتعليم',
  'التصميم والفنون',
  'بودكاست وحوارات',
  'صناعة المحتوى',
  'ألعاب وترفيه',
  'مونتاج وصوت',
  'قنوات محققة للربح',
  'طلبات تعاون مفتوحة',
];

export default function YouTubeHomePage() {
  const { channels, activeChannel, reviews, collaborations } = useSanadTube();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Modals state
  const [activeWatchVideo, setActiveWatchVideo] = useState<YouTubeVideo | null>(null);
  const [activeReviewVideo, setActiveReviewVideo] = useState<YouTubeVideo | null>(null);

  const chipsScrollRef = useRef<HTMLDivElement>(null);
  const shortsScrollRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (cat: string) => {
    if (cat === selectedCategory) return;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('yt-loader-trigger'));
    }
    setIsFiltering(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsFiltering(false);
    }, 280);
  };

  const scrollChips = (direction: 'left' | 'right') => {
    if (!chipsScrollRef.current) return;
    const scrollAmount = direction === 'left' ? -220 : 220;
    chipsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollShorts = (direction: 'left' | 'right') => {
    if (!shortsScrollRef.current) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    shortsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Filtered videos based on category and search query
  const filteredVideos = useMemo(() => {
    return initialYouTubeVideos.filter((v) => {
      const matchSearch =
        searchQuery === '' ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.channelTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (selectedCategory === 'الكل') return true;
      if (selectedCategory === '🔥 الأكثر رواجاً') return v.views > 100000;
      if (selectedCategory === 'قنوات محققة للربح') return v.channelVerified;
      if (selectedCategory === 'طلبات تعاون مفتوحة') return true;
      return v.category === selectedCategory;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-slate-900 selection:bg-red-500 selection:text-white">
      {/* YouTube Top Bar */}
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

      {/* Main Body with Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <YouTubeSidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Mobile Drawer Sidebar */}
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

        {/* Feed & Discovery Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
          
          {/* 1. Category Filter Chips Rail with YouTube-style Chevrons & Smooth Scroll */}
          <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2.5 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 flex items-center gap-1.5">
            <button
              onClick={() => scrollChips('right')}
              className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors hidden sm:flex shrink-0 shadow-2xs"
              title="تمرير لليمين"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div
              ref={chipsScrollRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1 scroll-smooth"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`yt-chip px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollChips('left')}
              className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors hidden sm:flex shrink-0 shadow-2xs"
              title="تمرير لليسار"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* 2. YouTube Hero / Spotlight Card for SanadTube Platform */}
          <div className="relative overflow-hidden rounded-2xl bg-white text-zinc-900 p-6 sm:p-7 border border-zinc-200/90 shadow-2xs">
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug text-zinc-900">
                  استكشف محتوى مبدعاً.. وابنِ شراكات حقيقية تنقل قناتك للمستوى التالي
                </h1>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                  تصفح الفيديوهات، واطلب مراجعات لصورتك المصغرة، واكتشف صناع محتوى في مجالك للتعاون المشترك ومتابعة متطلبات شركاء YouTube (YPP).
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Button asChild variant="youtube" size="sm" className="rounded-xl px-5 gap-2">
                    <Link href="/dashboard">
                      <Zap className="w-4 h-4 fill-white" />
                      <span>فتح استوديو قناتي</span>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="rounded-xl border-zinc-300 text-zinc-800 hover:bg-zinc-100">
                    <Link href="/collaborations">
                      <Users2 className="w-4 h-4 text-zinc-700 ml-1.5" />
                      <span>استعراض فرص التعاون ({collaborations.length})</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Quick Channel Stats Widget */}
              {activeChannel && (
                <div className="w-full lg:w-80 rounded-xl bg-zinc-50 border border-zinc-200 p-4 space-y-3 shrink-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeChannel.thumbnailUrl}
                      alt={activeChannel.title}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-200"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-zinc-500 font-semibold block">قناتك النشطة</span>
                      <h4 className="text-xs font-bold text-zinc-900 truncate">{activeChannel.title}</h4>
                      <span className="text-[11px] text-zinc-500">{activeChannel.subscriberCount.toLocaleString()} مشترك</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] text-zinc-600">
                      <span>ساعات المشاهدة لتحقيق الربح</span>
                      <span className="font-bold text-zinc-900">{activeChannel.watchTimeHours} / 4000 س</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div
                        className="h-full bg-[#FF0000] rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (activeChannel.watchTimeHours / 4000) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Primary Video Grid (YouTube Cards with Skeleton Shimmer) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#FF0000]" />
                <h2 className="text-base sm:text-lg font-bold text-zinc-900">
                  {selectedCategory === 'الكل' ? 'أحدث الفيديوهات ومقترحات المجتمع' : `فيديوهات تصنيف: ${selectedCategory}`}
                </h2>
                <Badge variant="secondary" className="text-xs font-semibold">
                  {filteredVideos.length} فيديو
                </Badge>
              </div>

              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-zinc-500 hover:text-zinc-900"
                >
                  إلغاء البحث عن &quot;{searchQuery}&quot;
                </Button>
              )}
            </div>

            {/* Shimmer Skeleton on Category Switch */}
            {isFiltering ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-7 gap-x-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="flex flex-col gap-3 select-none">
                    <div className="aspect-video w-full rounded-2xl yt-skeleton" />
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full yt-skeleton shrink-0" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 w-5/6 rounded yt-skeleton" />
                        <div className="h-2.5 w-1/2 rounded yt-skeleton" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200/80 p-8">
                <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center mb-3">
                  <Film className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm text-zinc-800">لا توجد نتائج مطابقة لبحثك</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من الشريط العلوي.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('الكل');
                    setSearchQuery('');
                  }}
                  className="mt-4 text-xs"
                >
                  إعادة ضبط التصفية
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-y-7 gap-x-4">
                {filteredVideos.slice(0, 4).map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onSelectVideo={(v) => setActiveWatchVideo(v)}
                    onOpenReview={(v) => setActiveReviewVideo(v)}
                    onOpenCollab={(v) => setActiveWatchVideo(v)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 4. YouTube Shorts Rail with Chevrons and Smooth Carousel */}
          <section className="py-4 space-y-3 bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-[#FF0000]" />
                </div>
                <h3 className="text-base font-bold text-zinc-900">فيديوهات Shorts القصيرة</h3>
                <span className="text-[11px] text-zinc-400 font-medium">أفكار سريعة ونصائح دقيقة</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollShorts('right')}
                  className="p-1 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors hidden sm:flex shadow-2xs"
                  title="السابق"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollShorts('left')}
                  className="p-1 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors hidden sm:flex shadow-2xs"
                  title="التالي"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <Link
                  href="/discover"
                  className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 mr-2"
                >
                  <span>عرض الكل</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div
              ref={shortsScrollRef}
              className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
            >
              {initialShorts.map((short) => (
                <ShortsCard
                  key={short.id}
                  short={short}
                  onClick={() => {
                    const matched = initialYouTubeVideos.find(v => v.id === 'vid-01') || initialYouTubeVideos[0];
                    setActiveWatchVideo(matched);
                  }}
                />
              ))}
            </div>
          </section>

          {/* 5. Remaining Videos in Feed */}
          {filteredVideos.length > 4 && (
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-base font-bold text-zinc-900">المزيد من الفيديوهات المقترحة لك</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-y-7 gap-x-4">
                {filteredVideos.slice(4).map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onSelectVideo={(v) => setActiveWatchVideo(v)}
                    onOpenReview={(v) => setActiveReviewVideo(v)}
                    onOpenCollab={(v) => setActiveWatchVideo(v)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 6. Active Community Review Spotlight Widget */}
          <section className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900">
                  ساعد صانع محتوى في تحسين صورته المصغرة واكسب 25 نقطة سند
                </h3>
              </div>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-xl border-zinc-300 text-xs font-bold hover:bg-zinc-100"
              >
                <Link href="/reviews">
                  <span>كل المراجعات النشطة</span>
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {reviews.slice(0, 2).map((rev) => (
                <Card key={rev.id} className="border-zinc-200 bg-zinc-50/50">
                  <CardContent className="p-4 flex gap-3">
                    {rev.thumbnailPreviewUrl && (
                      <div className="relative w-28 sm:w-36 aspect-video shrink-0 rounded-lg overflow-hidden border border-zinc-200">
                        <img
                          src={rev.thumbnailPreviewUrl.includes('unsplash.com') ? `${rev.thumbnailPreviewUrl}&w=280&q=75&auto=format` : rev.thumbnailPreviewUrl}
                          alt={rev.title}
                          loading="lazy"
                          decoding="async"
                          width={144}
                          height={81}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-zinc-500 truncate">{rev.authorName}</span>
                        <Badge variant="secondary" className="text-[10px] font-bold">+{rev.pointsReward} نقطة</Badge>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug">{rev.title}</h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-2">{rev.notes}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          const mockVideo = initialYouTubeVideos[0];
                          setActiveReviewVideo(mockVideo);
                        }}
                        className="text-[11px] h-7 text-[#FF0000] hover:text-[#CC0000] p-0 font-bold"
                      >
                        تقديم الملاحظات الآن ←
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* Video Watch & Collab Modal */}
      <WatchModal
        video={activeWatchVideo}
        isOpen={Boolean(activeWatchVideo)}
        onClose={() => setActiveWatchVideo(null)}
      />

      {/* Quick Peer Review Modal */}
      <QuickReviewModal
        video={activeReviewVideo}
        isOpen={Boolean(activeReviewVideo)}
        onClose={() => setActiveReviewVideo(null)}
      />
    </div>
  );
}
