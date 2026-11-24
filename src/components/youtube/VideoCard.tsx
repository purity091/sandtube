'use client';

import React, { useState } from 'react';
import { YouTubeVideo } from '@/lib/types';
import {
  Play,
  Clock,
  MoreVertical,
  CheckCircle2,
  Share2,
  Bookmark,
  MessageSquare,
  Users2,
  Eye,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VideoCardProps {
  video: YouTubeVideo;
  onSelectVideo?: (video: YouTubeVideo) => void;
  onOpenCollab?: (video: YouTubeVideo) => void;
  onOpenReview?: (video: YouTubeVideo) => void;
}

export default function VideoCard({
  video,
  onSelectVideo,
  onOpenCollab,
  onOpenReview,
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSaveWatchLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('yt-toast', {
          detail: {
            message: `تمت إضافة "${video.title.slice(0, 30)}..." إلى قائمة المشاهدة لاحقاً`,
            actionLabel: 'تراجع',
          },
        })
      );
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col gap-3 cursor-pointer select-none relative transition-all duration-200 active:scale-[0.985]"
    >
      {/* Thumbnail Container with Ambient Glow */}
      <div className="relative aspect-video w-full rounded-2xl">
        
        {/* YouTube Ambient Light behind thumbnail (GPU optimized) */}
        <div
          className="absolute inset-0 -m-0.5 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md pointer-events-none"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'opacity',
            backgroundImage: `radial-gradient(circle at center, rgba(255, 0, 0, 0.35) 0%, rgba(38, 140, 235, 0.2) 60%, transparent 80%)`,
          }}
        />

        {/* Thumbnail Inner */}
        <div
          onClick={() => onSelectVideo?.(video)}
          className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-xs transition-all duration-300 group-hover:shadow-xl group-hover:rounded-xl z-10"
        >
          <img
            src={video.thumbnailUrl.includes('unsplash.com') ? `${video.thumbnailUrl}&w=480&q=75&auto=format` : video.thumbnailUrl}
            alt={video.title}
            loading="lazy"
            decoding="async"
            width={480}
            height={270}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Video Duration Badge */}
          <div className="absolute bottom-2 left-2 rounded-md bg-black/85 px-1.5 py-0.5 text-[11px] font-bold text-white tracking-wide backdrop-blur-xs flex items-center gap-1 shadow-sm">
            {video.duration}
          </div>

          {/* Category Pill Tag */}
          <div className="absolute top-2 right-2">
            <span className="rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white/95 border border-white/10">
              {video.category}
            </span>
          </div>

          {/* Hover Quick Action Overlay with YouTube Play Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xl transform scale-80 group-hover:scale-100 transition-transform duration-200">
              <Play className="w-5 h-5 fill-white mr-0.5" />
            </div>

            {/* Quick Watch Later button on top left */}
            <button
              onClick={handleSaveWatchLater}
              className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/80 hover:bg-black text-white hover:text-[#53C5FF] transition-all transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 shadow-md"
              title="مشاهدة لاحقاً"
            >
              <Clock className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulated YouTube Watch Progress Red Bar (on select videos) */}
          {video.views > 80000 && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30">
              <div className="h-full bg-[#FF0000] rounded-r-full" style={{ width: '42%' }} />
            </div>
          )}
        </div>
      </div>

      {/* Video Details */}
      <div className="flex items-start gap-3 px-0.5">
        {/* Channel Avatar with subtle ring */}
        <Avatar className="w-9 h-9 shrink-0 ring-1 ring-zinc-200 mt-0.5 transition-transform group-hover:scale-105">
          <AvatarImage src={video.channelAvatar} alt={video.channelTitle} />
          <AvatarFallback>{video.channelTitle.slice(0, 2)}</AvatarFallback>
        </Avatar>

        {/* Titles & Meta */}
        <div className="flex-1 min-w-0">
          <h3
            onClick={() => onSelectVideo?.(video)}
            className="text-sm font-bold text-zinc-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug"
            title={video.title}
          >
            {video.title}
          </h3>

          {/* Channel Name & Verified check */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-600 hover:text-zinc-900 transition-colors">
            <span className="truncate">{video.channelTitle}</span>
            {video.channelVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 fill-zinc-100 shrink-0" />
            )}
          </div>

          {/* Views & Date */}
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
            <span>{video.viewsFormatted}</span>
            <span>•</span>
            <span>{video.publishedAt}</span>
          </div>
        </div>

        {/* Dropdown Options Menu */}
        <div className="shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-1.5 rounded-2xl bg-white shadow-xl border border-zinc-200">
              <DropdownMenuItem
                onClick={() => onSelectVideo?.(video)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium"
              >
                <Play className="w-4 h-4 text-zinc-600" />
                <span>مشاهدة الفيديو وملاحظات الأداء</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleSaveWatchLater}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium"
              >
                <Clock className="w-4 h-4 text-zinc-600" />
                <span>حفظ في قائمة المشاهدة لاحقاً</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onOpenReview?.(video)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium"
              >
                <MessageSquare className="w-4 h-4 text-[#FF0000]" />
                <span>تقييم الصورة المصغرة والعنوان (+25 نقطة)</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onOpenCollab?.(video)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium"
              >
                <Users2 className="w-4 h-4 text-emerald-600" />
                <span>طلب تعاون مع صانع المحتوى</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 border-zinc-100" />

              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('yt-toast', {
                        detail: { message: 'تم نسخ رابط المقطع للمشاركة' },
                      })
                    );
                  }
                }}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer hover:bg-zinc-100 font-medium text-zinc-600"
              >
                <Share2 className="w-4 h-4 text-zinc-500" />
                <span>مشاركة الرابط</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

