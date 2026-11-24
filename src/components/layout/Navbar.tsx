'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSanadTube } from '@/lib/store';
import {
  Menu,
  Search,
  Mic,
  Video,
  Bell,
  Coins,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Youtube,
  Users2,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Plus,
  HelpCircle,
  LogOut,
  SlidersHorizontal,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NavbarProps {
  onToggleSidebar?: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function Navbar({ onToggleSidebar, searchQuery = '', setSearchQuery }: NavbarProps) {
  const pathname = usePathname();
  const { user, channels, activeChannel, setActiveChannel } = useSanadTube();
  const [internalSearch, setInternalSearch] = useState(searchQuery);
  const [isVoiceDialogOpen, setIsVoiceDialogOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setSearchQuery) {
      setSearchQuery(internalSearch);
    }
  };

  const handleVoiceSearch = () => {
    setIsVoiceDialogOpen(true);
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInternalSearch('أدوات الذكاء الاصطناعي لليوتيوب');
      if (setSearchQuery) setSearchQuery('أدوات الذكاء الاصطناعي لليوتيوب');
      setTimeout(() => setIsVoiceDialogOpen(false), 800);
    }, 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-2xs">
        <div className="flex items-center justify-between h-14 px-3 sm:px-4 lg:px-6 gap-3">
          
          {/* Right Section (in RTL): Menu Button + YouTube/SanadTube Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="text-zinc-700 hover:bg-zinc-100 rounded-full h-10 w-10"
              aria-label="القائمة الجانبية"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Link href="/" className="flex items-center gap-2 select-none group">
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FF0000] text-white shadow-xs group-hover:bg-[#CC0000] transition-colors">
                <Youtube className="w-5 h-5 fill-white text-white" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-zinc-900 tracking-tight">
                  سند<span className="text-[#FF0000]">تيوب</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                  مجتمع صناع المحتوى
                </span>
              </div>
            </Link>
          </div>

          {/* Center Section: YouTube Search Bar & Voice Search */}
          <div className="flex-1 max-w-2xl mx-auto px-2">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
              <div className="relative flex items-center w-full">
                <Input
                  type="search"
                  placeholder="ابحث عن قنوات، فيديوهات، مراجعات، أو فرص تعاون..."
                  value={internalSearch}
                  onChange={(e) => {
                    setInternalSearch(e.target.value);
                    if (setSearchQuery) setSearchQuery(e.target.value);
                  }}
                  className="w-full h-10 ps-4 pe-3 rounded-s-full rounded-e-none border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400 text-xs sm:text-sm bg-zinc-50/50 hover:bg-white focus:bg-white text-right"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="h-10 px-5 rounded-e-full rounded-s-none border border-s-0 border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 shrink-0"
                title="بحث"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                className="ms-2 h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 shrink-0 hidden sm:flex"
                title="البحث الصوتي"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Left Section (in RTL): Create / Actions / Points / Channel & User Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Create Action / YouTube Studio style */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border-zinc-300 hover:bg-zinc-100 text-xs font-semibold px-3 h-9"
                >
                  <Plus className="w-4 h-4 text-[#FF0000]" />
                  <span>إنشاء</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>إجراءات سريعة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/reviews" className="flex items-center gap-2 cursor-pointer">
                    <Sparkles className="w-4 h-4 text-zinc-600" />
                    <span>طلب مراجعة صورة مصغرة / عنوان</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collaborations" className="flex items-center gap-2 cursor-pointer">
                    <Users2 className="w-4 h-4 text-zinc-600" />
                    <span>إنشاء دعوة تعاون جديدة</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/channel-ideas" className="flex items-center gap-2 cursor-pointer">
                    <Lightbulb className="w-4 h-4 text-[#FF0000]" />
                    <span>استكشاف أفكار قنوات</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="w-4 h-4 text-zinc-600" />
                    <span>فتح يوتيوب ستوديو</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Points pill badge */}
            <Link
              href="/points"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 text-xs font-semibold transition-colors"
              title="رصيد نقاط السند"
            >
              <Coins className="w-3.5 h-3.5 text-zinc-700" />
              <span className="tabular-nums font-bold">{user.pointsBalance}</span>
              <span className="hidden sm:inline text-[10px] text-zinc-600">نقطة</span>
            </Link>

            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full text-slate-700 hover:bg-slate-100 h-9 w-9"
                  title="الإشعارات"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF0033] rounded-full ring-2 ring-white"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-2">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-xs font-bold text-navy-900">الإشعارات</span>
                  <Badge variant="outline" className="text-[10px]">3 جديدة</Badge>
                </div>
                <DropdownMenuSeparator />
                <div className="space-y-1 py-1">
                  <div className="p-2 hover:bg-slate-50 rounded-lg text-xs transition-colors cursor-pointer">
                    <p className="font-semibold text-slate-800">سارة وافقت على طلب التعاون المشترك</p>
                    <span className="text-[10px] text-slate-400">منذ ساعة • بودكاست وفكرة</span>
                  </div>
                  <div className="p-2 hover:bg-slate-50 rounded-lg text-xs transition-colors cursor-pointer">
                    <p className="font-semibold text-slate-800">حصلت على 35 نقطة سند لمراجعتك تصميماً</p>
                    <span className="text-[10px] text-slate-400">منذ 3 ساعات</span>
                  </div>
                  <div className="p-2 hover:bg-slate-50 rounded-lg text-xs transition-colors cursor-pointer">
                    <p className="font-semibold text-slate-800">قناتك على بعد 380 ساعة من تحقيق شروط الربح</p>
                    <span className="text-[10px] text-emerald-600 font-medium">منذ يوم</span>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Channel / User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40">
                  <Avatar className="w-8 h-8 border-2 border-primary/20">
                    <AvatarImage src={activeChannel?.thumbnailUrl || user.avatarUrl} alt={user.fullName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {user.fullName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                {/* Profile Header */}
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="w-10 h-10 border border-slate-200">
                    <AvatarImage src={activeChannel?.thumbnailUrl || user.avatarUrl} alt={user.fullName} />
                    <AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-xs text-navy-900 truncate">{user.fullName}</span>
                    <span className="text-[11px] text-primary truncate">{activeChannel?.customUrl || user.email}</span>
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* Channels switch */}
                <DropdownMenuLabel className="text-[11px] font-semibold text-slate-500">
                  تبديل القناة النشطة
                </DropdownMenuLabel>
                {channels.map((ch) => (
                  <DropdownMenuItem
                    key={ch.id}
                    onClick={() => setActiveChannel(ch)}
                    className="flex items-center justify-between text-xs cursor-pointer py-1.5"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img src={ch.thumbnailUrl} alt={ch.title} className="w-5 h-5 rounded-full object-cover" />
                      <span className="truncate">{ch.title}</span>
                    </div>
                    {activeChannel?.id === ch.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    )}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 text-xs cursor-pointer">
                    <LayoutDashboard className="w-4 h-4 text-slate-600" />
                    <span>لوحة تحكم القناة (Studio)</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/channels" className="flex items-center gap-2 text-xs cursor-pointer">
                    <Youtube className="w-4 h-4 text-[#FF0033]" />
                    <span>إدارة القنوات والربط</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/dashboard?tab=settings" className="flex items-center gap-2 text-xs cursor-pointer">
                    <Settings className="w-4 h-4 text-slate-600" />
                    <span>إعدادات الحساب والقناة</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <a
                    href="https://studio.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs text-slate-500 hover:text-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>فتح YouTube Studio الرسمي</span>
                    </span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </header>

      {/* Voice Search Simulation Dialog */}
      <Dialog open={isVoiceDialogOpen} onOpenChange={setIsVoiceDialogOpen}>
        <DialogContent className="sm:max-w-md text-center py-10">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">البحث الصوتي</DialogTitle>
            <DialogDescription className="text-center">
              {isListening ? 'جاري الاستماع إليك الآن... تحدث بصوت واضح' : 'تم التقاط البحث بنجاح!'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center pt-6 space-y-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40' : 'bg-emerald-500 text-white'
            }`}>
              <Mic className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-navy-800">
              {isListening ? '«تحدث عن أي محتوى أو صانع...»' : '«أدوات الذكاء الاصطناعي لليوتيوب»'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
