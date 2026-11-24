'use client';

import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LikeBurstButtonProps {
  initialLikes?: number;
  onLikeChanged?: (liked: boolean) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

interface Particle {
  id: number;
  tx: string;
  ty: string;
  color: string;
}

export default function LikeBurstButton({
  initialLikes = 1420,
  onLikeChanged,
  className = '',
  size = 'sm',
}: LikeBurstButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerParticles = () => {
    const colors = ['#FF0000', '#268CEB', '#53C5FF', '#FFB800', '#FF4D6D', '#10B981'];
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * (360 / 8) * Math.PI) / 180;
      const distance = 25 + Math.random() * 20;
      const tx = `${Math.cos(angle) * distance}px`;
      const ty = `${Math.sin(angle) * distance}px`;
      return {
        id: Date.now() + i,
        tx,
        ty,
        color: colors[i % colors.length],
      };
    });

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      setIsPopping(true);
      triggerParticles();
      onLikeChanged?.(true);
      setTimeout(() => setIsPopping(false), 500);
    } else {
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
      onLikeChanged?.(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Sparkle Particles on Like */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle-particle"
          style={
            {
              '--tx': p.tx,
              '--ty': p.ty,
              backgroundColor: p.color,
              top: '50%',
              left: '50%',
            } as React.CSSProperties
          }
        />
      ))}

      <Button
        variant={hasLiked ? 'secondary' : 'outline'}
        size={size}
        onClick={handleToggleLike}
        className={`relative rounded-full gap-2 transition-all duration-200 select-none ${
          hasLiked
            ? 'bg-zinc-100 dark:bg-zinc-800 text-[#FF0000] font-bold border-zinc-300 shadow-2xs hover:bg-zinc-200'
            : 'hover:bg-zinc-100 text-zinc-700'
        } ${className}`}
      >
        <ThumbsUp
          className={`w-4 h-4 transition-transform ${
            hasLiked ? 'fill-[#FF0000] text-[#FF0000]' : 'text-zinc-600'
          } ${isPopping ? 'animate-like-pop' : ''}`}
        />
        <span className="tabular-nums text-xs font-semibold">{likes.toLocaleString()}</span>
      </Button>
    </div>
  );
}
