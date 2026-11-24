'use client';

import React, { useState } from 'react';
import { YouTubeVideo } from '@/lib/types';
import { useSanadTube } from '@/lib/store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, CheckCircle2, Coins } from 'lucide-react';

interface QuickReviewModalProps {
  video: YouTubeVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickReviewModal({ video, isOpen, onClose }: QuickReviewModalProps) {
  const { user, addReview } = useSanadTube();
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!video) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-6 bg-white rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>نظام سندتيوب لمراجعة الصور والعناوين</span>
          </div>
          <DialogTitle className="text-base font-bold text-navy-900">
            مراجعة وتقييم الصورة المصغرة
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            قدم ملاحظات بناءة لصانع المحتوى واحصل على مكافأة نقاط سند.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-navy-900 text-sm">شكراً لمساهمتك البنّاءة!</h4>
            <p className="text-xs text-slate-600">
              تم تسجيل تقييمك وحصلت على <span className="font-bold text-amber-600">+25 نقطة سند</span> في رصيدك.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Thumbnail Preview */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200">
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs font-semibold text-navy-900 line-clamp-1">{video.title}</p>

            {/* Star Rating */}
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1.5">
                تقييم قوة الصورة المصغرة والجاذبية:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 mr-2">{rating} من 5</span>
              </div>
            </div>

            {/* Note text */}
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                نصيحة سريعة للتحسين (الخطوط، الألوان، تعبير الوجه):
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="مثلاً: الخط العربي ممتاز، ولكن زيادة التباين مع الخلفية سترفع نسبة النقر..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold">
                <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>+25 نقطة سند</span>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                  إلغاء
                </Button>
                <Button type="submit" size="sm" className="bg-primary text-white text-xs font-bold">
                  إرسال التقييم
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
