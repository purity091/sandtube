'use client';

import React from 'react';
import { Play, MoreVertical } from 'lucide-react';

interface ShortsCardProps {
  short: {
    id: string;
    title: string;
    thumbnailUrl: string;
    viewsFormatted: string;
    channelTitle: string;
  };
  onClick?: () => void;
}

export default function ShortsCard({ short, onClick }: ShortsCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col gap-2 cursor-pointer select-none shrink-0 w-[180px] sm:w-[200px] relative active:scale-[0.98] transition-transform"
    >
      {/* 9:16 Thumbnail Container with Ambient Light */}
      <div className="relative aspect-[9/16] w-full rounded-2xl">
        
        {/* Soft Ambient Glow on Hover (GPU optimized) */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md pointer-events-none"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'opacity',
            backgroundImage: `radial-gradient(circle at center, rgba(255, 0, 51, 0.35) 0%, transparent 75%)`,
          }}
        />

        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-xs transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.03] z-10">
          <img
            src={short.thumbnailUrl.includes('unsplash.com') ? `${short.thumbnailUrl}&w=360&q=75&auto=format` : short.thumbnailUrl}
            alt={short.title}
            loading="lazy"
            decoding="async"
            width={200}
            height={355}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient shadow for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

          {/* Top Shorts Badge */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
            <span className="text-[10px] font-black text-white tracking-wider">Shorts</span>
          </div>

          {/* Bottom Title on Thumbnail */}
          <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
            <h4 className="text-xs font-bold line-clamp-2 leading-snug drop-shadow-sm group-hover:text-[#53C5FF] transition-colors">
              {short.title}
            </h4>
            <div className="flex items-center justify-between text-[11px] text-zinc-300 pt-0.5">
              <span className="font-semibold">{short.viewsFormatted}</span>
              <span className="truncate max-w-[85px] text-[10px] text-zinc-400 font-medium">{short.channelTitle}</span>
            </div>
          </div>

          {/* Hover play icon with YouTube Red pulse */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-11 h-11 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-200">
              <Play className="w-5 h-5 fill-white mr-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

