'use client';

import React, { useState, useRef } from 'react';
import { YouTubeVideo } from '@/lib/types';
import { useSanadTube } from '@/lib/store';
import {
  X,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Share2,
  Bookmark,
  Users2,
  Sparkles,
  CheckCircle2,
  Send,
  MessageSquare,
  Award,
  ShieldCheck,
  Sun,
  Tv,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import LikeBurstButton from '@/components/youtube/LikeBurstButton';
import SubscribeButton from '@/components/youtube/SubscribeButton';

interface WatchModalProps {
  video: YouTubeVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchModal({ video, isOpen, onClose }: WatchModalProps) {
  const { user, addCollaboration, addReview } = useSanadTube();
  const [isPlaying, setIsPlaying] = useState(true);
  const [ambientMode, setAmbientMode] = useState(true);
  const [collabSent, setCollabSent] = useState(false);
  const [collabTitle, setCollabTitle] = useState('');
  const [showCollabInput, setShowCollabInput] = useState(false);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState(38);
  const seekbarRef = useRef<HTMLDivElement>(null);

  if (!video) return null;

  const handleSeekbarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekbarRef.current) return;
    const rect = seekbarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (rect.right - e.clientX) / rect.width));
    setHoverPosition(pos * 100);

    // Calculate approximate time string
    const totalSeconds = 640; // ~10:40
    const currentSeconds = Math.floor(pos * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    setHoverTime(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
  };

  const handleSeekbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekbarRef.current) return;
    const rect = seekbarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (rect.right - e.clientX) / rect.width));
    setProgressPercent(pos * 100);
  };

  const handleSendCollab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collabTitle.trim()) return;

    addCollaboration({
      requesterId: user.id,
      requesterName: user.fullName,
      requesterChannelTitle: 'قناتي في سندتيوب',
      requesterChannelAvatar: user.avatarUrl,
      targetId: video.channelId,
      targetChannelTitle: video.channelTitle,
      targetChannelAvatar: video.channelAvatar,
      collabType: 'joint_video',
      title: collabTitle,
      description: `اقتراح تعاون نابع من مشاهدة فيديو: ${video.title}`,
      targetAudience: 'المتابعون المهتمون بمجال ' + video.category,
    });

    setCollabSent(true);
    setCollabTitle('');
    setTimeout(() => {
      setShowCollabInput(false);
      setCollabSent(false);
    }, 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-2xl max-h-[92vh] flex flex-col border border-zinc-200 shadow-2xl relative">
        
        {/* Ambient Backlight Glow (الوضع المحيطي) */}
        {ambientMode && (
          <div
            className="yt-ambient-glow"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255, 0, 0, 0.45) 0%, rgba(38, 140, 235, 0.3) 50%, transparent 80%)`,
            }}
          />
        )}

        {/* Video Player Header / Visual */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden z-10 select-none">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-contain opacity-95 transition-opacity"
          />

          {/* Animated Equalizer Wave Overlay (When playing) */}
          {isPlaying && (
            <div className="absolute top-4 left-4 flex items-end gap-1 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md z-20 border border-white/10">
              <span className="w-1 bg-[#FF0000] rounded-full yt-eq-1" />
              <span className="w-1 bg-[#FF0000] rounded-full yt-eq-2" />
              <span className="w-1 bg-[#FF0000] rounded-full yt-eq-3" />
              <span className="w-1 bg-[#FF0000] rounded-full yt-eq-4" />
              <span className="text-[10px] text-white/90 font-bold mr-1.5">تشغيل حي</span>
            </div>
          )}

          {/* Player Controls Bar */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col gap-2.5 z-20">
            
            {/* YouTube Interactive Scrubber Bar with Scrub Head and Live Hover Time Bubble */}
            <div
              ref={seekbarRef}
              onMouseMove={handleSeekbarMouseMove}
              onMouseLeave={() => setHoverTime(null)}
              onClick={handleSeekbarClick}
              className="relative w-full h-1 bg-white/25 rounded-full cursor-pointer yt-scrubber-track group/bar py-1"
            >
              {/* Buffered Progress */}
              <div
                className="absolute top-0 right-0 h-full bg-white/40 rounded-full"
                style={{ width: `${Math.min(100, progressPercent + 25)}%` }}
              />

              {/* Played Red Progress */}
              <div
                className="absolute top-0 right-0 h-full bg-[#FF0000] rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Red Circular Scrub Thumb (appears on hover) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FF0000] shadow-md yt-scrubber-thumb border border-white" />
              </div>

              {/* Time Preview Tooltip */}
              {hoverTime && (
                <div
                  className="absolute -top-7 translate-x-1/2 px-2 py-0.5 rounded-md bg-black/90 text-white text-[10px] font-bold shadow-md pointer-events-none backdrop-blur-xs border border-white/20 tabular-nums z-30"
                  style={{ right: `${hoverPosition}%` }}
                >
                  {hoverTime}
                </div>
              )}
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-all active:scale-90"
                  title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>
                <button className="p-1.5 rounded-full hover:bg-white/20 transition-all">
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="tabular-nums font-mono text-[11px] text-white/90">04:12 / {video.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Ambient Mode Toggle */}
                <button
                  onClick={() => setAmbientMode(!ambientMode)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                    ambientMode ? 'bg-white/20 text-[#53C5FF]' : 'text-white/60 hover:text-white'
                  }`}
                  title="تبديل الوضع المحيطي (الإضاءة المحيطية)"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">الوضع المحيطي</span>
                </button>

                <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-bold">1080p HD</span>
                <button className="p-1.5 rounded-full hover:bg-white/20 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Content & Studio Insights */}
        <div className="p-5 overflow-y-auto space-y-4 relative z-10">
          {/* Title */}
          <h2 className="text-lg sm:text-xl font-extrabold text-navy-900 leading-snug">
            {video.title}
          </h2>

          {/* Channel Row & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11 border border-slate-200">
                <AvatarImage src={video.channelAvatar} alt={video.channelTitle} />
                <AvatarFallback>{video.channelTitle.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-navy-900">
                  <span>{video.channelTitle}</span>
                  {video.channelVerified && (
                    <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10" />
                  )}
                </div>
                <span className="text-xs text-slate-500">14.2 ألف مشترك • مجتمع سندتيوب</span>
              </div>
              
              {/* YouTube Interactive Subscribe Button */}
              <SubscribeButton channelTitle={video.channelTitle} />
            </div>

            {/* Like, Share, Collab Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Dynamic Particle Burst Like Button */}
              <LikeBurstButton
                initialLikes={video.likesCount ? parseInt(video.likesCount.replace(/[^0-9]/g, '')) || 1420 : 1420}
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCollabInput(!showCollabInput)}
                className="rounded-full gap-1.5 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold"
              >
                <Users2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>طلب تعاون مشترك</span>
              </Button>

              <Button
                variant="outline"
                size="iconSm"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(
                      new CustomEvent('yt-toast', {
                        detail: { message: 'تم نسخ رابط الفيديو إلى الحافظة' },
                      })
                    );
                  }
                }}
                className="rounded-full"
                title="مشاركة"
              >
                <Share2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Quick Collaboration Form Drawer */}
          {showCollabInput && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3 animate-in fade-in-50">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-emerald-600" />
                  <span>اقتراح فكرة تعاون مباشر مع {video.channelTitle}</span>
                </div>
                <button onClick={() => setShowCollabInput(false)} className="text-emerald-700 hover:text-emerald-950 font-bold">✕</button>
              </div>

              {collabSent ? (
                <div className="p-3 bg-white rounded-lg border border-emerald-300 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تم إرسال طلب التعاون بنجاح، وستتلقى إشعاراً فور الرد!</span>
                </div>
              ) : (
                <form onSubmit={handleSendCollab} className="space-y-2">
                  <Input
                    placeholder="مثال: تسجيل فيديو مشترك أو استضافة بودكاست حول موضوع هذا المقطع..."
                    value={collabTitle}
                    onChange={(e) => setCollabTitle(e.target.value)}
                    className="text-xs bg-white"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowCollabInput(false)} className="text-xs">
                      إلغاء
                    </Button>
                    <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5">
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال الطلب</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Video Studio Metadata Bento Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
            <div>
              <div className="text-[10px] text-slate-400 font-medium">المشاهدات الحقيقية</div>
              <div className="text-sm font-extrabold text-navy-900 mt-0.5">{video.views.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">معدل الاحتفاظ (Retention)</div>
              <div className="text-sm font-extrabold text-emerald-600 mt-0.5">54.2%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">ساعات المشاهدة</div>
              <div className="text-sm font-extrabold text-primary mt-0.5">840 ساعة</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">أهلية تحقيق الربح</div>
              <div className="text-sm font-extrabold text-emerald-700 mt-0.5 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>مستوفٍ</span>
              </div>
            </div>
          </div>

          {/* Video Description Box */}
          <div className="bg-slate-100/70 p-4 rounded-xl text-xs text-slate-700 leading-relaxed space-y-2 border border-slate-200/60">
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-800">
              <span>تم النشر: {video.publishedAt}</span>
              <span>•</span>
              <span>التصنيف: {video.category}</span>
            </div>
            <p className="line-clamp-3">
              {video.title} — مقطع مقدم بالكامل من مجتمع صناع المحتوى في سندتيوب، بهدف تبادل المعرفة والارتقاء بجودة الإنتاج وصناعة الفيديو في العالم العربي.
            </p>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}
