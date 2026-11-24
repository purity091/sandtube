'use client';

import React, { useState } from 'react';
import { Bell, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SubscribeButtonProps {
  channelTitle?: string;
  initialSubscribed?: boolean;
  onSubscribeChange?: (subscribed: boolean) => void;
  className?: string;
  size?: 'sm' | 'default';
}

export default function SubscribeButton({
  channelTitle = 'صانع المحتوى',
  initialSubscribed = false,
  onSubscribeChange,
  className = '',
  size = 'sm',
}: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [bellMode, setBellMode] = useState<'all' | 'custom' | 'none'>('all');
  const [isBellRinging, setIsBellRinging] = useState(false);

  const handleSubscribeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isSubscribed;
    setIsSubscribed(nextState);
    onSubscribeChange?.(nextState);

    if (nextState) {
      // Ring the bell
      setIsBellRinging(true);
      setTimeout(() => setIsBellRinging(false), 900);

      // Trigger custom toast event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('yt-toast', {
            detail: {
              message: `تمت إضافة ${channelTitle} إلى قائمة اشتراكاتك.`,
              actionLabel: 'تراجع',
            },
          })
        );
      }
    }
  };

  if (!isSubscribed) {
    return (
      <Button
        onClick={handleSubscribeToggle}
        size={size}
        className={`rounded-full bg-[#0F0F0F] hover:bg-[#272727] text-white font-bold text-xs px-4 py-2 transition-transform active:scale-95 shadow-2xs select-none ${className}`}
      >
        <span>اشتراك</span>
      </Button>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 select-none ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold transition-all active:scale-95 border border-zinc-200/80 shadow-2xs"
          >
            <Bell
              className={`w-3.5 h-3.5 text-zinc-700 ${
                isBellRinging ? 'animate-yt-bell text-[#FF0000]' : ''
              }`}
            />
            <span>مشترك</span>
            <ChevronDown className="w-3 h-3 text-zinc-500 mr-0.5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-2xl bg-white shadow-xl border border-zinc-200 text-right">
          <DropdownMenuItem
            onClick={() => {
              setBellMode('all');
              setIsBellRinging(true);
              setTimeout(() => setIsBellRinging(false), 850);
            }}
            className="flex items-center justify-between px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 fill-zinc-900 text-zinc-900" />
              <span>الكل (كافة الإشعارات)</span>
            </div>
            {bellMode === 'all' && <Check className="w-3.5 h-3.5 text-[#FF0000]" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setBellMode('custom')}
            className="flex items-center justify-between px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-zinc-600" />
              <span>مخصصة</span>
            </div>
            {bellMode === 'custom' && <Check className="w-3.5 h-3.5 text-[#FF0000]" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setBellMode('none')}
            className="flex items-center justify-between px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 line-through" />
              <span>عدم تلقي إشعارات</span>
            </div>
            {bellMode === 'none' && <Check className="w-3.5 h-3.5 text-zinc-500" />}
          </DropdownMenuItem>

          <div className="my-1 border-t border-zinc-100" />

          <DropdownMenuItem
            onClick={() => {
              setIsSubscribed(false);
              onSubscribeChange?.(false);
            }}
            className="px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-rose-50 text-rose-600 font-semibold"
          >
            إلغاء الاشتراك
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
