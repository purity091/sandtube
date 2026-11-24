'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import { initialYouTubeVideos } from '@/lib/mockData';
import { YouTubeVideo } from '@/lib/types';
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  RefreshCw,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Users2,
  DollarSign,
  PlusCircle,
  Play,
  Flame,
  Award,
  Settings,
  SlidersHorizontal,
  Bell,
  CheckCircle2,
  ExternalLink,
  Save,
  Radio,
  FileVideo,
  Lock,
  AlertTriangle,
  Coins,
  Share2,
  Search,
  Filter,
  Calendar,
  Check,
  X,
  Star,
  ThumbsUp,
  Lightbulb,
  ChevronLeft,
  Copy,
  BarChart2,
  PieChart,
  Target,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

// Time Period Chart & Metric Data
type TimePeriod = '7d' | '28d' | '90d' | '365d';

interface ChartPoint {
  label: string;
  views: number;
  subs: number;
}

const PERIOD_DATA: Record<TimePeriod, {
  label: string;
  views: number;
  viewsChange: string;
  subs: number;
  subsChange: string;
  watchHours: number;
  watchHoursChange: string;
  avgDuration: string;
  retention: string;
  points: ChartPoint[];
}> = {
  '7d': {
    label: 'آخر 7 أيام',
    views: 19840,
    viewsChange: '+18.4%',
    subs: 74,
    subsChange: '+12.5%',
    watchHours: 432,
    watchHoursChange: '+21.0%',
    avgDuration: '05:48',
    retention: '48.9%',
    points: [
      { label: 'السبت', views: 2450, subs: 9 },
      { label: 'الأحد', views: 2890, subs: 11 },
      { label: 'الإثنين', views: 2650, subs: 8 },
      { label: 'الثلاثاء', views: 3120, subs: 14 },
      { label: 'الأربعاء', views: 2780, subs: 10 },
      { label: 'الخميس', views: 3450, subs: 16 },
      { label: 'الجمعة', views: 2500, subs: 6 },
    ],
  },
  '28d': {
    label: 'آخر 28 يوماً (الافتراضي)',
    views: 76240,
    viewsChange: '+14.2%',
    subs: 215,
    subsChange: '+9.8%',
    watchHours: 1640,
    watchHoursChange: '+16.5%',
    avgDuration: '05:12',
    retention: '46.2%',
    points: [
      { label: '1 نوف', views: 2100, subs: 6 },
      { label: '3 نوف', views: 2450, subs: 8 },
      { label: '6 نوف', views: 3200, subs: 12 },
      { label: '9 نوف', views: 2900, subs: 9 },
      { label: '12 نوف', views: 3600, subs: 14 },
      { label: '15 نوف', views: 2750, subs: 7 },
      { label: '18 نوف', views: 3400, subs: 11 },
      { label: '21 نوف', views: 3900, subs: 15 },
      { label: '24 نوف', views: 2800, subs: 8 },
      { label: '27 نوف', views: 3500, subs: 13 },
      { label: '30 نوف', views: 4200, subs: 18 },
    ],
  },
  '90d': {
    label: 'آخر 90 يوماً',
    views: 245600,
    viewsChange: '+23.5%',
    subs: 840,
    subsChange: '+18.1%',
    watchHours: 5280,
    watchHoursChange: '+27.4%',
    avgDuration: '05:05',
    retention: '45.8%',
    points: [
      { label: 'سبتمبر أ1', views: 18500, subs: 62 },
      { label: 'سبتمبر أ2', views: 21200, subs: 74 },
      { label: 'أكتوبر أ1', views: 24600, subs: 89 },
      { label: 'أكتوبر أ2', views: 27800, subs: 98 },
      { label: 'نوفمبر أ1', views: 31400, subs: 115 },
      { label: 'نوفمبر أ2', views: 36200, subs: 142 },
    ],
  },
  '365d': {
    label: 'سنة كاملة',
    views: 982000,
    viewsChange: '+38.6%',
    subs: 3420,
    subsChange: '+31.2%',
    watchHours: 21400,
    watchHoursChange: '+42.0%',
    avgDuration: '04:58',
    retention: '44.9%',
    points: [
      { label: 'يناير', views: 62000, subs: 210 },
      { label: 'مارس', views: 74000, subs: 260 },
      { label: 'مايو', views: 88000, subs: 310 },
      { label: 'يوليو', views: 95000, subs: 340 },
      { label: 'سبتمبر', views: 112000, subs: 420 },
      { label: 'نوفمبر', views: 134000, subs: 510 },
    ],
  },
};

// Pure Lightweight SVG Growth Chart Component (Zero bloat, 60fps)
function StudioGrowthChart({
  points,
  metricType,
}: {
  points: ChartPoint[];
  metricType: 'views' | 'subs';
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = useMemo(() => {
    return points.map((p) => (metricType === 'views' ? p.views : p.subs));
  }, [points, metricType]);

  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;

  const width = 800;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  // Calculate coordinates
  const coords = useMemo(() => {
    return points.map((p, i) => {
      const x = paddingX + (i / (points.length - 1)) * chartW;
      const val = metricType === 'views' ? p.views : p.subs;
      const y = paddingY + chartH - ((val - minVal) / range) * chartH;
      return { x, y, point: p, val };
    });
  }, [points, metricType, minVal, range, chartW, chartH]);

  // Construct SVG Path
  const linePath = useMemo(() => {
    if (coords.length === 0) return '';
    return coords.reduce((acc, c, i) => {
      return i === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`;
    }, '');
  }, [coords]);

  const areaPath = useMemo(() => {
    if (coords.length === 0) return '';
    const firstX = coords[0].x;
    const lastX = coords[coords.length - 1].x;
    const bottomY = paddingY + chartH;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, coords, chartH]);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-48 sm:h-60 overflow-visible"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.25" />
            <stop offset="90%" stopColor="#FF0000" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = paddingY + chartH * pct;
          const gridVal = Math.round(maxVal - pct * range);
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={width - paddingX + 8}
                y={y + 3}
                fill="#94A3B8"
                fontSize="9"
                textAnchor="start"
                className="font-mono"
              >
                {gridVal >= 1000 ? `${(gridVal / 1000).toFixed(1)}k` : gridVal}
              </text>
            </g>
          );
        })}

        {/* Gradient Area Fill */}
        <path d={areaPath} fill="url(#chartGradient)" />

        {/* Smooth Trend Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#FF0000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points & Interactive Hover Zones */}
        {coords.map((c, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <g
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {/* Vertical Guide Line on Hover */}
              {isHovered && (
                <line
                  x1={c.x}
                  y1={paddingY}
                  x2={c.x}
                  y2={paddingY + chartH}
                  stroke="#FF0000"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />
              )}

              {/* Data Dot */}
              <circle
                cx={c.x}
                cy={c.y}
                r={isHovered ? 5.5 : 3.5}
                fill="#FFFFFF"
                stroke="#FF0000"
                strokeWidth={isHovered ? 2.5 : 2}
                className="transition-all duration-150"
              />

              {/* Invisible Hitbox */}
              <rect
                x={c.x - 20}
                y={paddingY}
                width={40}
                height={chartH}
                fill="transparent"
              />

              {/* Bottom Label */}
              <text
                x={c.x}
                y={height - 8}
                fill={isHovered ? '#0F172A' : '#94A3B8'}
                fontSize="10"
                fontWeight={isHovered ? 'bold' : 'normal'}
                textAnchor="middle"
              >
                {c.point.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {hoveredIndex !== null && coords[hoveredIndex] && (
        <div
          className="absolute z-20 pointer-events-none bg-zinc-950 text-white px-3 py-1.5 rounded-xl shadow-xl text-xs border border-zinc-800 -translate-x-1/2 -translate-y-full transition-transform"
          style={{
            left: `${(coords[hoveredIndex].x / width) * 100}%`,
            top: `${(coords[hoveredIndex].y / height) * 100}%`,
            marginTop: '-12px',
          }}
        >
          <div className="font-semibold text-zinc-300 text-[10px] mb-0.5">
            {coords[hoveredIndex].point.label}
          </div>
          <div className="font-extrabold text-white flex items-center gap-1.5 tabular-nums">
            <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
            <span>
              {metricType === 'views'
                ? `${coords[hoveredIndex].val.toLocaleString()} مشاهدة`
                : `${coords[hoveredIndex].val.toLocaleString()} مشترك جديد`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const {
    activeChannel,
    channels,
    refreshChannelSync,
    user,
    updateUserProfile,
    updateChannel,
    collaborations,
    updateCollabStatus,
    reviews,
    transactions,
  } = useSanadTube();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('28d');
  const [chartMetric, setChartMetric] = useState<'views' | 'subs'>('views');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Video Management Table State
  const [videoSearchQuery, setVideoSearchQuery] = useState('');
  const [videoFilterCategory, setVideoFilterCategory] = useState('all');

  // Form states for Channel Settings
  const [channelTitle, setChannelTitle] = useState(activeChannel?.title || '');
  const [channelDescription, setChannelDescription] = useState(activeChannel?.description || '');
  const [channelCategory, setChannelCategory] = useState(activeChannel?.category || 'التقنية والتعليم');
  const [isPublicChannel, setIsPublicChannel] = useState(activeChannel?.isPublic ?? true);

  // Form states for Creator Profile
  const [fullName, setFullName] = useState(user.fullName || '');
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [userBio, setUserBio] = useState(user.bio || '');
  const [acceptCollabs, setAcceptCollabs] = useState(true);

  // Notification toggles
  const [notifyCollabs, setNotifyCollabs] = useState(true);
  const [notifyReviews, setNotifyReviews] = useState(true);
  const [notifyMilestones, setNotifyMilestones] = useState(true);
  const [publicSubCount, setPublicSubCount] = useState(true);

  // Disconnect Dialog
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);

  // Quick Review Modal Dialog for Videos
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedVideoForReview, setSelectedVideoForReview] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    if (activeChannel) {
      setChannelTitle(activeChannel.title);
      setChannelDescription(activeChannel.description);
      setChannelCategory(activeChannel.category);
      setIsPublicChannel(activeChannel.isPublic);
    }
  }, [activeChannel]);

  const showTemporaryToast = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  const handleSync = () => {
    if (!activeChannel) return;
    setIsSyncing(true);
    setTimeout(() => {
      refreshChannelSync(activeChannel.id);
      setIsSyncing(false);
      showTemporaryToast('تمت مزامنة مؤشرات القناة بنجاح مع YouTube Data API');
    }, 850);
  };

  const handleSaveChannelSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChannel) return;
    updateChannel(activeChannel.id, {
      title: channelTitle,
      description: channelDescription,
      category: channelCategory,
      isPublic: isPublicChannel,
    });
    showTemporaryToast('تم حفظ إعدادات القناة بنجاح');
  };

  const handleSaveProfileSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName,
      displayName,
      bio: userBio,
    });
    showTemporaryToast('تم تحديث الملف الشخصي لصانع المحتوى');
  };

  const currentPeriodData = PERIOD_DATA[timePeriod];

  // Filtered channel videos list
  const filteredVideos = useMemo(() => {
    return initialYouTubeVideos.filter((v) => {
      const matchSearch =
        videoSearchQuery === '' ||
        v.title.toLowerCase().includes(videoSearchQuery.toLowerCase());
      const matchCategory =
        videoFilterCategory === 'all' || v.category === videoFilterCategory;
      return matchSearch && matchCategory;
    });
  }, [videoSearchQuery, videoFilterCategory]);

  if (!activeChannel) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9FAFC]">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#FF0000] mx-auto flex items-center justify-center">
            <Radio className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">لا توجد قناة مرتبطة حالياً</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            قم بربط قناتك عبر Google OAuth للاستفادة من تحليلات استوديو ومجتمع سندتيوب.
          </p>
          <Button asChild variant="youtube">
            <Link href="/channels">ربط قناة الآن</Link>
          </Button>
        </main>
      </div>
    );
  }

  // Calculate percentages toward YouTube Partner Program (YPP)
  const subProgress = Math.min(100, Math.round((activeChannel.subscriberCount / 1000) * 100));
  const watchProgress = Math.min(100, Math.round((activeChannel.watchTimeHours / 4000) * 100));
  const remainingHours = Math.max(0, 4000 - activeChannel.watchTimeHours);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-slate-900">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => {
          if (window.innerWidth < 768) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
      />

      {/* Main Layout: Sidebar + Dashboard Content */}
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

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Temporary Notification Toast */}
          {saveSuccessMessage && (
            <div className="fixed top-18 start-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-zinc-700 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {/* Header Card: Studio Identity & Channel Health */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={activeChannel.thumbnailUrl}
                  alt={activeChannel.title}
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-zinc-200 shadow-sm"
                />
                <span
                  className="absolute -bottom-1 -start-1 w-6 h-6 bg-zinc-900 rounded-full border-2 border-white flex items-center justify-center text-white shadow-xs"
                  title="متصل عبر Google OAuth"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                    {activeChannel.title}
                  </h1>
                  <span className="text-xs font-bold text-zinc-600">{activeChannel.customUrl}</span>
                  {activeChannel.isMonetized ? (
                    <Badge variant="secondary" className="text-[10px] text-zinc-800 font-bold">
                      محققة للربح ✓
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px] text-zinc-600">
                      قيد استيفاء شروط الربح
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 font-bold">
                    صحة القناة 94% ممتاز
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 max-w-xl line-clamp-1">
                  {activeChannel.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-1">
                  <span>
                    التصنيف: <strong className="text-zinc-800">{activeChannel.category}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    آخر مزامنة: <strong className="text-zinc-800">{activeChannel.lastSyncedAt}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                disabled={isSyncing}
                className="rounded-xl gap-2 text-xs font-semibold border-zinc-300 hover:bg-zinc-100"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-zinc-700 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'جاري المزامنة...' : 'مزامنة مع YouTube'}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(`https://youtube.com/${activeChannel.customUrl}`);
                  showTemporaryToast('تم نسخ رابط القناة بنجاح');
                }}
                className="rounded-xl gap-1.5 text-xs font-semibold border-zinc-300 hover:bg-zinc-100"
                title="نسخ رابط القناة"
              >
                <Copy className="w-3.5 h-3.5 text-zinc-700" />
                <span className="hidden sm:inline">نسخ الرابط</span>
              </Button>

              <Button asChild variant="youtube" size="sm" className="rounded-xl gap-2 text-xs font-bold">
                <a href={`https://youtube.com/${activeChannel.customUrl}`} target="_blank" rel="noreferrer">
                  <span>فتح في YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Unified Shadcn Tabs: Overview, Content, Collaborations, Reviews, Monetization, Settings */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <div className="overflow-x-auto no-scrollbar">
              <TabsList className="bg-white border border-zinc-200/90 p-1.5 rounded-xl h-11 shadow-2xs">
                <TabsTrigger
                  value="overview"
                  className="gap-2 text-xs font-semibold px-4 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>لوحة البيانات والتحليلات</span>
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="gap-2 text-xs font-semibold px-4 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <FileVideo className="w-4 h-4" />
                  <span>المحتوى والفيديوهات</span>
                </TabsTrigger>
                <TabsTrigger
                  value="collaborations"
                  className="gap-2 text-xs font-semibold px-4 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <Users2 className="w-4 h-4" />
                  <span>التعاونات النشطة</span>
                  {collaborations.length > 0 && (
                    <span className="ms-1 px-1.5 py-0.2 rounded-full bg-red-100 text-[#FF0000] text-[10px] font-bold">
                      {collaborations.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="gap-2 text-xs font-semibold px-4 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>مراجعات الصور والعناوين</span>
                </TabsTrigger>
                <TabsTrigger
                  value="monetization"
                  className="gap-2 text-xs font-semibold px-4 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>أهلية الأرباح YPP</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="gap-2 text-xs font-semibold px-4 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>إعدادات القناة والربط</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* TAB 1: OVERVIEW & ANALYTICS */}
            <TabsContent value="overview" className="space-y-6 mt-0">
              {/* Filter Rail: Time Period Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs font-bold text-zinc-800">المدى الزمني للتحليلات:</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
                  {(['7d', '28d', '90d', '365d'] as TimePeriod[]).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimePeriod(period)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                        timePeriod === period
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {period === '7d' && '7 أيام'}
                      {period === '28d' && '28 يوماً'}
                      {period === '90d' && '90 يوماً'}
                      {period === '365d' && 'سنة'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Studio 4 Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <Card className="bg-white shadow-2xs border-slate-200/80">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>إجمالي المشتركين</span>
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-navy-900 tracking-tight tabular-nums">
                        {activeChannel.subscriberCount.toLocaleString()}
                      </span>
                      <Badge variant="success" className="text-[10px] tabular-nums">
                        {currentPeriodData.subsChange} (+{currentPeriodData.subs})
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400">نمو أصيل مستمر من التوصيات</p>
                  </CardContent>
                </Card>

                {/* Metric 2 */}
                <Card className="bg-white shadow-2xs border-slate-200/80">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>إجمالي المشاهدات</span>
                      <Eye className="w-4 h-4 text-[#FF0000]" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-navy-900 tracking-tight tabular-nums">
                        {currentPeriodData.views.toLocaleString()}
                      </span>
                      <Badge variant="success" className="text-[10px] tabular-nums">
                        {currentPeriodData.viewsChange}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400">خلال {currentPeriodData.label}</p>
                  </CardContent>
                </Card>

                {/* Metric 3 */}
                <Card className="bg-white shadow-2xs border-slate-200/80">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>ساعات المشاهدة (Watch Time)</span>
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-navy-900 tracking-tight tabular-nums">
                        {currentPeriodData.watchHours.toLocaleString()} س
                      </span>
                      <Badge variant="cyan" className="text-[10px] tabular-nums">
                        {currentPeriodData.watchHoursChange}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400">المطلوب 4,000 ساعة رسمية</p>
                  </CardContent>
                </Card>

                {/* Metric 4 */}
                <Card className="bg-white shadow-2xs border-slate-200/80">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>الاحتفاظ بالجمهور (Retention)</span>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-navy-900 tracking-tight tabular-nums">
                        {currentPeriodData.retention}
                      </span>
                      <span className="text-xs font-bold text-slate-600 tabular-nums">
                        {currentPeriodData.avgDuration} دقيقة
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">أعلى من متوسط تصنيف قناتك</p>
                  </CardContent>
                </Card>
              </div>

              {/* Interactive Visual Growth Chart Card */}
              <Card className="bg-white border-zinc-200/90 shadow-2xs overflow-hidden">
                <CardHeader className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-[#FF0000]" />
                      <span>مسار نمو المشاهدات والمشتركين اليومي</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      بيانات حية مباشرة تعكس تفاعل المشاهدين مع مقاطعك خلال {currentPeriodData.label}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl self-start sm:self-auto">
                    <button
                      onClick={() => setChartMetric('views')}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all ${
                        chartMetric === 'views'
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      المشاهدات
                    </button>
                    <button
                      onClick={() => setChartMetric('subs')}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition-all ${
                        chartMetric === 'subs'
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      المشتركون
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <StudioGrowthChart
                    points={currentPeriodData.points}
                    metricType={chartMetric}
                  />
                </CardContent>
              </Card>

              {/* Two Column Layout: Traffic Sources & Smart Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources Breakdown */}
                <Card className="bg-white border-zinc-200/90 shadow-2xs">
                  <CardHeader className="p-5 border-b border-zinc-100">
                    <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-primary" />
                      <span>مصادر الزيارات (Traffic Sources)</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      كيف يعثر المشاهدون على فيديوهات قناتك
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-zinc-800">بحث YouTube</span>
                        <span className="tabular-nums text-zinc-900">42% (32,020 مشاهدة)</span>
                      </div>
                      <Progress value={42} className="h-2 bg-zinc-100" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-zinc-800">الفيديوهات المقترحة (Suggested Videos)</span>
                        <span className="tabular-nums text-zinc-900">31% (23,630 مشاهدة)</span>
                      </div>
                      <Progress value={31} className="h-2 bg-zinc-100" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-zinc-800">ميزات التصفح والاشتراكات (Browse Features)</span>
                        <span className="tabular-nums text-zinc-900">18% (13,720 مشاهدة)</span>
                      </div>
                      <Progress value={18} className="h-2 bg-zinc-100" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-zinc-800">مصادر خارجية ومجتمع سندتيوب</span>
                        <span className="tabular-nums text-zinc-900">9% (6,870 مشاهدة)</span>
                      </div>
                      <Progress value={9} className="h-2 bg-zinc-100" />
                    </div>
                  </CardContent>
                </Card>

                {/* Smart Insights & Growth Tips */}
                <Card className="bg-white border-zinc-200/90 shadow-2xs">
                  <CardHeader className="p-5 border-b border-zinc-100">
                    <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>توجيهات ذكية لتسريع نمو القناة</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      ملاحظات تحليلية مستخرجة آلياً من أداء فيديوهاتك الأخيرة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-amber-900 mb-0.5">
                          معدل النقر (CTR) مرتفع في أول 48 ساعة
                        </strong>
                        <p className="text-amber-800/90 leading-relaxed text-[11px]">
                          حققت صورك المصغرة الأخيرة معدل نقر 8.4%، وهو أعلى من المتوسط العام (5%). استمر على نفس النمط البصري مع ألوان واضحة.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-blue-900 mb-0.5">
                          أفضل توقيت للنشر في تصنيفك
                        </strong>
                        <p className="text-blue-800/90 leading-relaxed text-[11px]">
                          يتواجد جمهور قناتك بكثافة بين الساعة 6:00 مساءً و 9:30 مساءً بتوقيت مكة المكرمة. يُنصح بجدولة نشر الفيديوهات في هذه النافذة.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                      <Users2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-emerald-900 mb-0.5">
                          فرصة تعاون واعدة في تصنيف {activeChannel.category}
                        </strong>
                        <p className="text-emerald-800/90 leading-relaxed text-[11px]">
                          توجد 3 قنوات متقاربة في حجم الجمهور تبحث عن فيديو مشترك أو بودكاست صوتي. يمكنك استكشافها في تبويب التعاونات.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* YPP Progress Card */}
              <Card className="bg-white border-zinc-200/90 shadow-2xs overflow-hidden">
                <CardHeader className="bg-zinc-50 border-b border-zinc-100 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-zinc-700" />
                        <span>مسار الانضمام لبرنامج شركاء YouTube (YPP)</span>
                      </CardTitle>
                      <CardDescription className="text-xs text-zinc-500">
                        تتبع تقدم قناتك نحو شروط الأهلية لتحقيق الربح بدون أي تفاعل مصطنع
                      </CardDescription>
                    </div>
                    <Badge
                      variant={activeChannel.isMonetized ? 'secondary' : 'youtube'}
                      className="text-xs px-3 py-1 self-start sm:self-auto font-bold"
                    >
                      {activeChannel.isMonetized
                        ? 'مفعل ومحقق للربح ✓'
                        : `${remainingHours} ساعة متبقية فقط`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Metric Progress 1: Subscribers */}
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-900">المشتركون (الحد الأدنى 1,000)</span>
                      <span className="font-extrabold text-zinc-900 tabular-nums">
                        {activeChannel.subscriberCount.toLocaleString()} / 1,000
                      </span>
                    </div>
                    <Progress value={subProgress} className="h-2.5 bg-zinc-200" />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        تم تحقيق الشرط بنجاح (100%)
                      </span>
                      <span className="text-zinc-400">شرط YouTube</span>
                    </div>
                  </div>

                  {/* Metric Progress 2: Watch Hours */}
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-900">ساعات المشاهدة العلنية (الحد الأدنى 4,000)</span>
                      <span className="font-extrabold text-zinc-900 tabular-nums">
                        {activeChannel.watchTimeHours.toLocaleString()} / 4,000
                      </span>
                    </div>
                    <Progress value={watchProgress} className="h-2.5 bg-zinc-200" />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#FF0000] font-bold">
                        تم إنجاز {watchProgress}% من المتطلب
                      </span>
                      <span className="text-zinc-500 font-semibold tabular-nums">
                        باقي {remainingHours} ساعة
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: VIDEOS & CONTENT MANAGER */}
            <TabsContent value="content" className="space-y-6 mt-0">
              <Card className="bg-white border-zinc-200/90 shadow-2xs">
                <CardHeader className="p-5 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <FileVideo className="w-4 h-4 text-primary" />
                      <span>محتوى وفيديوهات القناة (Content Studio)</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      إدارة المقاطع المنشورة ومراقبة نسب النقر والاحتفاظ وطلب المراجعة الفورية
                    </CardDescription>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative w-48 sm:w-64">
                      <Input
                        type="text"
                        placeholder="ابحث في فيديوهاتك..."
                        value={videoSearchQuery}
                        onChange={(e) => setVideoSearchQuery(e.target.value)}
                        className="text-xs h-9 ps-8 pe-3 rounded-xl border-zinc-300"
                      />
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute start-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <select
                      value={videoFilterCategory}
                      onChange={(e) => setVideoFilterCategory(e.target.value)}
                      className="text-xs h-9 rounded-xl border border-zinc-300 bg-white px-2.5 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    >
                      <option value="all">كل التصنيفات</option>
                      <option value="التقنية والتعليم">التقنية والتعليم</option>
                      <option value="صناعة المحتوى">صناعة المحتوى</option>
                      <option value="التصميم والفنون">التصميم والفنون</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-50/70 border-b border-zinc-200/80 text-zinc-500 font-bold">
                        <th className="p-4 text-start min-w-[280px]">الفيديو</th>
                        <th className="p-4 text-start">الظهور</th>
                        <th className="p-4 text-start">تاريخ النشر</th>
                        <th className="p-4 text-start">المشاهدات</th>
                        <th className="p-4 text-start">معدل CTR</th>
                        <th className="p-4 text-start">الإعجابات</th>
                        <th className="p-4 text-end">إجراءات التحسين</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredVideos.map((vid) => (
                        <tr key={vid.id} className="hover:bg-zinc-50/60 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-24 aspect-video rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-200">
                                <img
                                  src={
                                    vid.thumbnailUrl.includes('unsplash.com')
                                      ? `${vid.thumbnailUrl}&w=200&q=75&auto=format`
                                      : vid.thumbnailUrl
                                  }
                                  alt={vid.title}
                                  loading="lazy"
                                  decoding="async"
                                  width={96}
                                  height={54}
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-1 start-1 bg-black/80 text-white text-[9px] px-1 rounded font-bold">
                                  {vid.duration}
                                </span>
                              </div>
                              <div className="min-w-0 space-y-0.5">
                                <h4 className="font-bold text-zinc-900 line-clamp-1 hover:text-[#FF0000] cursor-pointer">
                                  {vid.title}
                                </h4>
                                <span className="text-[10px] text-zinc-400 block">{vid.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="text-[10px] text-emerald-700 bg-emerald-50 border-emerald-200">
                              علني
                            </Badge>
                          </td>
                          <td className="p-4 text-zinc-600">{vid.publishedAt}</td>
                          <td className="p-4 font-bold text-zinc-900 tabular-nums">{vid.viewsFormatted}</td>
                          <td className="p-4 font-bold text-emerald-600 tabular-nums">8.4%</td>
                          <td className="p-4 text-zinc-700 tabular-nums">{vid.likesCount || '1.2K'}</td>
                          <td className="p-4 text-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedVideoForReview(vid);
                                setReviewModalOpen(true);
                              }}
                              className="text-xs text-[#FF0000] border-red-200 hover:bg-red-50 hover:text-red-700 font-bold rounded-lg h-8"
                            >
                              <Sparkles className="w-3.5 h-3.5 me-1" />
                              طلب مراجعة
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: COLLABORATIONS HUB */}
            <TabsContent value="collaborations" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-zinc-200/80 shadow-2xs p-4 space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold">طلبات التعاون الواردة</span>
                  <div className="text-2xl font-black text-zinc-900 tabular-nums">{collaborations.length}</div>
                  <span className="text-[10px] text-zinc-400">بانتظار موافقتك</span>
                </Card>
                <Card className="bg-white border-zinc-200/80 shadow-2xs p-4 space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold">تعاونات قيد التنفيذ</span>
                  <div className="text-2xl font-black text-emerald-600 tabular-nums">2</div>
                  <span className="text-[10px] text-zinc-400">فيديو وبودكاست مشترك</span>
                </Card>
                <Card className="bg-white border-zinc-200/80 shadow-2xs p-4 space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold">تعاونات مكتملة موثقة</span>
                  <div className="text-2xl font-black text-zinc-900 tabular-nums">5</div>
                  <span className="text-[10px] text-zinc-400">حازت على تقييم 5 نجوم</span>
                </Card>
                <Card className="bg-white border-zinc-200/80 shadow-2xs p-4 space-y-1">
                  <span className="text-xs text-zinc-500 font-semibold">تقييم شركاء التعاون</span>
                  <div className="text-2xl font-black text-amber-500 tabular-nums">4.9 / 5.0</div>
                  <span className="text-[10px] text-zinc-400">بناءً على 8 تقييمات</span>
                </Card>
              </div>

              {/* Collabs List */}
              <Card className="bg-white border-zinc-200/90 shadow-2xs">
                <CardHeader className="p-5 border-b border-zinc-100 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-primary" />
                      <span>الطلبات والفرص المشتركة</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-500">
                      دعوات التعاون الموجهة لقناتك من صناع محتوى متخصصين
                    </CardDescription>
                  </div>
                  <Button asChild size="sm" variant="outline" className="text-xs">
                    <Link href="/collaborations">تصفح سوق التعاونات</Link>
                  </Button>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {collaborations.map((collab) => (
                    <div
                      key={collab.id}
                      className="p-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 hover:bg-white transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 border border-zinc-200">
                          <AvatarImage src={collab.requesterChannelAvatar} alt={collab.requesterName} />
                          <AvatarFallback>{collab.requesterName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-zinc-900 text-xs sm:text-sm">{collab.title}</h4>
                            <Badge variant="secondary" className="text-[10px]">
                              {collab.collabType === 'joint_video'
                                ? 'فيديو مشترك'
                                : collab.collabType === 'guest_appearance'
                                ? 'ظهور كضيف'
                                : 'تبادل إنتاجي'}
                            </Badge>
                          </div>
                          <p className="text-xs text-zinc-500 line-clamp-1">{collab.description}</p>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                            <span>صانع المحتوى: <strong className="text-zinc-700">{collab.requesterName}</strong></span>
                            <span>•</span>
                            <span>الجمهور المستهدف: {collab.targetAudience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                        {collab.status === 'pending' ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                updateCollabStatus(collab.id, 'accepted');
                                showTemporaryToast('تم قبول طلب التعاون بنجاح');
                              }}
                              className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-8 gap-1 font-bold"
                            >
                              <Check className="w-3.5 h-3.5" />
                              قبول التعاون
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                updateCollabStatus(collab.id, 'declined');
                                showTemporaryToast('تم رفض طلب التعاون');
                              }}
                              className="text-xs text-zinc-600 rounded-lg h-8"
                            >
                              اعتذار
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant={collab.status === 'accepted' ? 'success' : 'secondary'}
                            className="text-xs px-3 py-1 font-bold"
                          >
                            {collab.status === 'accepted' ? 'مقبول وقيد التنسيق ✓' : 'مكتمل'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: REVIEWS & POINTS STUDIO */}
            <TabsContent value="reviews" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Points Wallet Card */}
                <Card className="bg-gradient-to-br from-zinc-900 to-black text-white shadow-md rounded-2xl border border-zinc-800">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-400">محفظة نقاط السند</span>
                      <Coins className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>

                    <div>
                      <span className="text-4xl font-black tabular-nums">{user.pointsBalance}</span>
                      <span className="text-xs text-zinc-400 ms-2">نقطة نشطة</span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      تكتسب النقاط من تقييم صور زملائك وإتمام التعاونات الناجحة، وتستخدمها لطلب تحليلات احترافية.
                    </p>

                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                      className="w-full text-zinc-900 font-bold text-xs bg-white hover:bg-zinc-100"
                    >
                      <Link href="/points">سجل المكافآت والأوسمة</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Reviews Summary */}
                <Card className="bg-white border-zinc-200/90 shadow-2xs md:col-span-2">
                  <CardHeader className="p-5 border-b border-zinc-100 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span>مراجعات الصور والعناوين الخاصة بقناتك</span>
                      </CardTitle>
                      <CardDescription className="text-xs text-zinc-500">
                        ملاحظات الزملاء المباشرة لتحسين نسبة النقر للظهور (CTR)
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" variant="outline" className="text-xs font-semibold">
                      <Link href="/reviews">طلب مراجعة جديدة</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    {reviews.slice(0, 2).map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-zinc-900">{rev.title}</span>
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>4.8 / 5</span>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-600 line-clamp-2">{rev.notes}</p>
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-200/60">
                          <span>{rev.commentsCount} صانع محتوى قدّم ملاحظات</span>
                          <Link href="/reviews" className="text-[#FF0000] font-bold hover:underline">
                            عرض الملاحظات التفصيلية ←
                          </Link>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 5: MONETIZATION & YPP TRACKER */}
            <TabsContent value="monetization" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border-zinc-200/90 shadow-2xs md:col-span-2">
                  <CardHeader className="p-6 border-b border-zinc-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-bold text-zinc-900">
                          الباقة والاشتراك الحالي في سندتيوب
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500">
                          تفاصيل باقتك ومميزات حساب صانع المحتوى الموثق
                        </CardDescription>
                      </div>
                      <Badge variant="cyan" className="text-xs px-3 py-1 font-bold">
                        باقة Pro Creator
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 text-xs">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>مزامنة يومية تلقائية مع YouTube Data API</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>طلب مراجعات غير محدودة للصور المصغرة والعناوين</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>إرسال دعوات تعاون غير محدودة للقنوات الشريكة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>أولوية ظهور القناة في شريط اكتشاف صناع المحتوى</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-zinc-200/90 shadow-2xs p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-zinc-500">توقع موعد الأهلية الكاملة</span>
                    <div className="text-3xl font-black text-zinc-900 tabular-nums">~64 يوم</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      بناءً على وتيرة نمو المشاهدات الحالية ({currentPeriodData.watchHoursChange})، من المتوقع استيفاء شرط الـ 4,000 ساعة خلال شهرين تقريباً.
                    </p>
                  </div>
                  <Button asChild variant="youtube" size="sm" className="w-full mt-4 font-bold text-xs">
                    <Link href="/monetization">استكشاف شروط وتفاصيل YPP</Link>
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 6: SETTINGS & SECURITY */}
            <TabsContent value="settings" className="space-y-6 mt-0">
              <form onSubmit={handleSaveChannelSettings} className="space-y-6">
                <Card className="bg-white border-slate-200/90 shadow-2xs">
                  <CardHeader className="p-6 border-b border-slate-100">
                    <CardTitle className="text-base font-bold text-navy-900 flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-primary" />
                      <span>إعدادات تكامل القناة مع YouTube API</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      التحكم في بيانات القناة المعروضة بمجتمع سندتيوب وحالة الربط الأمني.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    {/* Readonly Integration details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-1">
                          معرف القناة في YouTube (Channel ID):
                        </span>
                        <code className="text-[11px] bg-white px-2.5 py-1 rounded-md border border-slate-200 text-slate-800 font-mono block select-all">
                          {activeChannel.youtubeChannelId}
                        </code>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">المعرف المخصص (Handle):</span>
                        <code className="text-[11px] bg-white px-2.5 py-1 rounded-md border border-slate-200 text-primary font-bold block select-all">
                          {activeChannel.customUrl}
                        </code>
                      </div>
                    </div>

                    {/* Channel Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">
                        اسم القناة في مجتمع سندتيوب:
                      </label>
                      <Input
                        value={channelTitle}
                        onChange={(e) => setChannelTitle(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">
                        التصنيف الأساسي للقناة:
                      </label>
                      <select
                        value={channelCategory}
                        onChange={(e) => setChannelCategory(e.target.value)}
                        className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="التقنية والتعليم">التقنية والتعليم</option>
                        <option value="التصميم والفنون">التصميم والفنون</option>
                        <option value="بودكاست وحوارات">بودكاست وحوارات</option>
                        <option value="صناعة المحتوى">صناعة المحتوى والمونتاج</option>
                        <option value="ألعاب وترفيه">ألعاب وترفيه</option>
                        <option value="المال والاستثمار">المال والاستثمار</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">
                        نبذة عن القناة واهتماماتها:
                      </label>
                      <textarea
                        value={channelDescription}
                        onChange={(e) => setChannelDescription(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    {/* Public Visibility Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-navy-900 block">
                          إظهار القناة في قائمة الاستكشاف العامة
                        </span>
                        <p className="text-[11px] text-slate-500">
                          تمكين صناع المحتوى الآخرين من العثور على قناتك واقتراح تعاونات مشتركة.
                        </p>
                      </div>
                      <Switch checked={isPublicChannel} onCheckedChange={setIsPublicChannel} />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 border-t border-slate-100 flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDisconnectDialogOpen(true)}
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      فصل القناة عن سندتيوب
                    </Button>

                    <Button type="submit" size="sm" className="gap-2 text-xs font-bold">
                      <Save className="w-3.5 h-3.5" />
                      <span>حفظ التعديلات</span>
                    </Button>
                  </CardFooter>
                </Card>
              </form>

              {/* Profile Card */}
              <form onSubmit={handleSaveProfileSettings} className="space-y-6">
                <Card className="bg-white border-slate-200/90 shadow-2xs">
                  <CardHeader className="p-6 border-b border-slate-100">
                    <CardTitle className="text-base font-bold text-navy-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>الملف الشخصي لصانع المحتوى</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      بياناتك الشخصية المعروضة للشريك أثناء المحادثات ومراجعة العناوين.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/30">
                        <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                        <AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-navy-900 block">{user.fullName}</span>
                        <Badge variant="cyan" className="text-[10px]">
                          {user.tier} صانع محتوى موثق
                        </Badge>
                        <p className="text-[11px] text-slate-400">الصورة متزامنة مع حساب Google</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-900">الاسم الكامل:</label>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy-900">
                          الاسم المستعار (Display Name):
                        </label>
                        <Input
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">
                        البريد الإلكتروني المعتمد:
                      </label>
                      <Input
                        value={user.email}
                        disabled
                        className="text-xs bg-slate-50 text-slate-500 cursor-not-allowed"
                      />
                      <span className="text-[10px] text-slate-400">مرتبط وموثق بواسطة Google OAuth</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">السيرة الذاتية (Bio):</label>
                      <textarea
                        value={userBio}
                        onChange={(e) => setUserBio(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 border-t border-slate-100 flex justify-end">
                    <Button type="submit" size="sm" className="gap-2 text-xs font-bold">
                      <Save className="w-3.5 h-3.5" />
                      <span>حفظ الملف الشخصي</span>
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Disconnect Channel Confirmation Dialog */}
      <Dialog open={disconnectDialogOpen} onOpenChange={setDisconnectDialogOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <DialogTitle className="text-base font-bold text-navy-900">
              تأكيد فصل قناة YouTube عن المنصة
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              هل أنت متأكد من رغبتك في فصل القناة؟ ستتوقف المزامنة الفورية لمؤشرات الأداء ولن تظهر القناة لشركاء التعاون حتى تعيد ربطها عبر Google OAuth.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDisconnectDialogOpen(false)}
              className="text-xs"
            >
              إلغاء التراجع
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDisconnectDialogOpen(false);
                showTemporaryToast('تم إيقاف المزامنة وفصل القناة مؤقتاً');
              }}
              className="text-xs font-bold"
            >
              تأكيد الفصل الآن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Review Modal Dialog */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF0000]" />
              <span>طلب مراجعة احترافية للصورة والعنوان</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500">
              إرسال الفيديو إلى مجتمع سندتيوب للحصول على تقييمات موضوعية من صناع المحتوى
            </DialogDescription>
          </DialogHeader>

          {selectedVideoForReview && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <img
                  src={selectedVideoForReview.thumbnailUrl}
                  alt={selectedVideoForReview.title}
                  className="w-20 aspect-video rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">
                    {selectedVideoForReview.title}
                  </h4>
                  <span className="text-[10px] text-zinc-500">
                    {selectedVideoForReview.category} • {selectedVideoForReview.viewsFormatted}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-zinc-800">
                  ما الذي ترغب في التركيز عليه أثناء المراجعة؟
                </label>
                <select className="w-full h-9 rounded-xl border border-zinc-300 text-xs px-2.5 bg-white">
                  <option>وضوح العنوان وجاذبية الصورة المصغرة (CTR)</option>
                  <option>الألوان والتباين والخطوط المستخدمة في الصورة</option>
                  <option>صياغة العنوان للظهور في بحث YouTube</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                <span>تكلفة طلب المراجعة: <strong>15 نقطة</strong> (رصيدك الحالي: {user.pointsBalance})</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReviewModalOpen(false)}
              className="text-xs"
            >
              إلغاء
            </Button>
            <Button
              variant="youtube"
              size="sm"
              onClick={() => {
                setReviewModalOpen(false);
                showTemporaryToast('تم نشر طلب مراجعة الفيديو في مجتمع سندتيوب بنجاح');
              }}
              className="text-xs font-bold"
            >
              تأكيد وإرسال للمجتمع
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function DashboardAndSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFC] text-slate-500 text-sm">
          جاري تحميل استوديو وإعدادات القناة...
        </div>
      }
    >
      <DashboardInner />
    </Suspense>
  );
}
