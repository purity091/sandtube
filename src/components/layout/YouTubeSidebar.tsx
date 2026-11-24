'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSanadTube } from '@/lib/store';
import {
  Home,
  Flame,
  Film,
  Users2,
  Compass,
  LayoutDashboard,
  DollarSign,
  MessageSquare,
  Coins,
  Settings,
  HelpCircle,
  ShieldCheck,
  PlaySquare,
  Sparkles,
  ChevronLeft,
  ExternalLink,
  Award,
  Clock,
  Lightbulb,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface YouTubeSidebarProps {
  collapsed?: boolean;
  onCloseMobile?: () => void;
}

export default function YouTubeSidebar({ collapsed = false, onCloseMobile }: YouTubeSidebarProps) {
  const pathname = usePathname();
  const { channels, activeChannel } = useSanadTube();

  const mainLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/discover', label: 'استكشاف', icon: Compass },
    { href: '/channel-ideas', label: 'أفكار قنوات', icon: Lightbulb, badge: 'مُلهم' },
    { href: '/channels', label: 'الاشتراكات والقنوات', icon: PlaySquare },
  ];

  const creatorStudioLinks = [
    { href: '/dashboard', label: 'لوحة التحكم (Studio)', icon: LayoutDashboard, badge: 'جديد' },
    { href: '/monetization', label: 'مسار الأرباح YPP', icon: DollarSign },
    { href: '/collaborations', label: 'فرص التعاون المشترك', icon: Users2 },
    { href: '/reviews', label: 'مراجعة الصور والعناوين', icon: MessageSquare },
    { href: '/points', label: 'النقاط والمكافآت', icon: Coins },
    { href: '/admin', label: 'لوحة إدارة المنصة', icon: ShieldCheck },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  if (collapsed) {
    return (
      <aside className="hidden md:flex flex-col items-center w-18 shrink-0 bg-white border-l border-zinc-200/80 py-3 gap-1 select-none z-30">
        {[...mainLinks, ...creatorStudioLinks.slice(0, 3)].map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-14 h-14 rounded-xl text-[10px] font-medium transition-colors gap-1",
                active
                  ? "bg-zinc-100 text-zinc-900 font-bold"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
              title={item.label}
            >
              <Icon className={cn("w-5 h-5", active ? "text-[#FF0000]" : "text-zinc-600")} />
              <span className="truncate max-w-[50px]">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </aside>
    );
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-l border-zinc-200/80 flex flex-col justify-between py-2 overflow-y-auto select-none z-30 h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="px-3 space-y-4">
        {/* Main section */}
        <div className="space-y-0.5">
          {mainLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-4 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors",
                  active
                    ? "bg-zinc-100 text-zinc-900 font-bold"
                    : "text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-[#FF0000]" : "text-zinc-600")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Separator className="bg-zinc-100" />

        {/* Studio / Creator Tools Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            <span>استوديو صانع المحتوى</span>
          </div>
          <div className="space-y-0.5">
            {creatorStudioLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                    active
                      ? "bg-zinc-100 text-zinc-900 font-bold"
                      : "text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", active ? "text-[#FF0000]" : "text-zinc-600")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-red-50 text-[#FF0000] border border-red-200/60 px-1.5 py-0.2 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <Separator className="bg-zinc-100" />

        {/* Subscribed Community Channels */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            قنوات المجتمع
          </div>
          <div className="space-y-1">
            {channels.map((ch) => (
              <Link
                key={ch.id}
                href="/channels"
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center justify-between px-3 py-1.5 rounded-xl text-xs hover:bg-zinc-100/80 transition-colors group",
                  activeChannel?.id === ch.id ? "bg-zinc-100 font-semibold text-zinc-900" : "text-zinc-700"
                )}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="relative">
                    <img
                      src={ch.thumbnailUrl}
                      alt={ch.title}
                      className="w-6 h-6 rounded-full object-cover border border-zinc-200"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
                  </div>
                  <span className="text-slate-700 group-hover:text-navy-900 truncate text-[11px]">
                    {ch.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tabular-nums">
                  {(ch.subscriberCount / 1000).toFixed(1)}k
                </span>
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-100" />

        {/* Settings & Help */}
        <div className="space-y-0.5">
          <Link
            href="/dashboard?tab=settings"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100/70 hover:text-navy-900 font-medium"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>الإعدادات المتقدمة</span>
          </Link>
          <a
            href="https://support.google.com/youtube"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-500 hover:bg-slate-100/70 hover:text-slate-700"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>مساعدة YouTube الرسمية</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="p-3 text-[10px] text-slate-400 border-t border-slate-100 space-y-1">
        <p className="font-semibold text-slate-500">سندتيوب — SanadTube 2026</p>
        <p className="leading-tight text-slate-400">
          منصة دعم ونمو صناع المحتوى الملتزمة بإرشادات منتدى YouTube.
        </p>
      </div>
    </aside>
  );
}
