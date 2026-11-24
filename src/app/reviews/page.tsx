'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
  Type,
  Video,
  Send,
  Star,
  CheckCircle2,
  PlusCircle,
  Coins,
  ShieldCheck,
  Eye,
  Plus,
} from 'lucide-react';
import { ContentReview, ReviewType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export default function ReviewsPage() {
  const { reviews, user, activeChannel, addReview, submitReviewFeedback } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Create Review Request Modal
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ReviewType>('thumbnail');
  const [newNotes, setNewNotes] = useState('');
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');

  // Give Feedback Modal
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [activeReview, setActiveReview] = useState<ContentReview | null>(null);
  const [rating, setRating] = useState(5);
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedType === 'all') return true;
    return r.reviewType === selectedType;
  });

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChannel) return;

    addReview({
      userId: user.id,
      authorName: user.fullName,
      authorAvatar: user.avatarUrl,
      channelTitle: activeChannel.title,
      title: newTitle,
      reviewType: newType,
      thumbnailPreviewUrl:
        newThumbnailUrl ||
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      notes: newNotes,
      pointsReward: 30,
    });

    setRequestModalOpen(false);
    setNewTitle('');
    setNewNotes('');
    setNewThumbnailUrl('');
    showToast('تم طرح طلب المراجعة بنجاح في مجتمع سندتيوب');
  };

  const handleOpenFeedback = (review: ContentReview) => {
    setActiveReview(review);
    setRating(5);
    setStrengths('وضوح الفكرة والتباين اللوني وتناسق الخط العربي ممتاز ومحفز للنقر.');
    setImprovements('يمكن تقليل حجم النص قليلاً لمنح مساحة تنفس للصورة أو العنصر البشري.');
    setFeedbackSuccess(false);
    setFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReview) return;

    submitReviewFeedback(activeReview.id, {
      rating,
      strengths,
      improvements,
    });

    setFeedbackSuccess(true);
    showToast('شكراً لمساهمتك البنّاءة! تم إضافة +25 نقطة سند إلى رصيدك');
    setTimeout(() => {
      setFeedbackModalOpen(false);
      setFeedbackSuccess(false);
    }, 1200);
  };

  const getTypeLabel = (type: ReviewType) => {
    switch (type) {
      case 'thumbnail':
        return { label: 'صورة مصغرة', icon: ImageIcon, variant: 'cyan' as const };
      case 'title_hook':
        return { label: 'عنوان وهوك', icon: Type, variant: 'success' as const };
      case 'video_intro':
        return { label: 'أول 30 ثانية', icon: Video, variant: 'secondary' as const };
      case 'description_seo':
      default:
        return { label: 'وصف وكلمات مفتاحية', icon: MessageSquare, variant: 'default' as const };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC] text-slate-900">
      <Navbar
        onToggleSidebar={() => {
          if (window.innerWidth < 768) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <YouTubeSidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Mobile Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FF0000]" />
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">مختبر مراجعة الصور والعناوين (A/B Test)</h1>
                <Badge variant="secondary" className="text-xs">{reviews.length} مراجعات</Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
                احصل على آراء صادقة من صناع محتوى متخصصين لرفع نسبة النقر للظهور (CTR) قبل نشر المقطع أو بعده.
              </p>
            </div>

            <Button
              variant="youtube"
              size="sm"
              onClick={() => setRequestModalOpen(true)}
              className="gap-2 rounded-xl text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>+ طلب مراجعة صورة / عنوان</span>
            </Button>
          </div>

          {/* Type Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'كل المراجعات' },
              { id: 'thumbnail', label: 'الصور المصغرة (Thumbnails)' },
              { id: 'title_hook', label: 'صياغة العناوين والهوك' },
              { id: 'video_intro', label: 'مقدمات الفيديوهات' },
            ].map((item) => {
              const isActive = selectedType === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'chipActive' : 'chip'}
                  size="sm"
                  onClick={() => setSelectedType(item.id)}
                  className="shrink-0 text-xs"
                >
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => {
              const typeInfo = getTypeLabel(rev.reviewType);
              const TypeIcon = typeInfo.icon;

              return (
                <Card key={rev.id} className="bg-white border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <CardHeader className="p-5 pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-slate-200">
                        <AvatarImage src={rev.authorAvatar} alt={rev.authorName} />
                        <AvatarFallback>{rev.authorName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-xs font-bold text-navy-900 block">{rev.authorName}</span>
                        <span className="text-[11px] text-slate-400">{rev.channelTitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={typeInfo.variant} className="text-[10px] gap-1">
                        <TypeIcon className="w-3 h-3" />
                        <span>{typeInfo.label}</span>
                      </Badge>
                      <Badge variant="cyan" className="text-[10px] font-bold">
                        +{rev.pointsReward} نقطة
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    {rev.thumbnailPreviewUrl && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xs">
                        <img
                          src={rev.thumbnailPreviewUrl}
                          alt={rev.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <CardTitle className="text-sm sm:text-base font-bold text-navy-900">
                        {rev.title}
                      </CardTitle>
                      <p className="text-xs text-slate-600 mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70 leading-relaxed">
                        &quot;{rev.notes}&quot;
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 px-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {rev.commentsCount || 0} ملاحظات مقدمة حتى الآن
                    </span>

                    <Button
                      variant="youtube"
                      size="sm"
                      onClick={() => handleOpenFeedback(rev)}
                      className="text-xs font-bold gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>تقديم تقييم ونقد بناء</span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

        </main>
      </div>

      {/* Create Review Request Dialog */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-2">
              <PlusCircle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-base font-bold text-navy-900">
              طلب مراجعة من مجتمع سندتيوب
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              اعرض تصميم صورتك أو عنوان مقطعك القادم لتحصل على توجيهات واقعية لرفع نسبة النقر.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateRequest} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-900">نوع المراجعة المطلوبة:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as ReviewType)}
                className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="thumbnail">صورة مصغرة (Thumbnail)</option>
                <option value="title_hook">عنوان المقطع وهوك البداية</option>
                <option value="video_intro">أول 30 ثانية من المقطع</option>
                <option value="description_seo">الوصف وسيو YouTube</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-900">عنوان الطلب أو عنوان المقطع:</label>
              <Input
                placeholder="مثال: مراجعة الصورة المصغرة لفيديو أدوات الذكاء الاصطناعي 2026"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-900">رابط معاينة الصورة المصغرة (اختياري):</label>
              <Input
                placeholder="https://..."
                value={newThumbnailUrl}
                onChange={(e) => setNewThumbnailUrl(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy-900">ما الذي تود التركيز عليه بالتحديد؟</label>
              <textarea
                placeholder="أشعر أن الخط العربي غير واضح في شاشات الجوال الصغيرة، ما رأيكم في توزيع الألوان؟"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                rows={3}
                required
                className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-center justify-between">
              <span>مكافأة المقيم (تخصم من رصيد نقاطك):</span>
              <strong className="font-bold flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                30 نقطة سند
              </strong>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRequestModalOpen(false)}
                className="text-xs"
              >
                إلغاء
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-white text-xs font-bold">
                نشر طلب المراجعة الآن
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Give Feedback Modal */}
      <Dialog open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
              <Star className="w-6 h-6 fill-amber-500" />
            </div>
            <DialogTitle className="text-base font-bold text-navy-900">
              تقديم تقييم وملاحظات لـ {activeReview?.authorName}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              ساعد صانع المحتوى بنصائح عملية تعزز جاذبية المحتوى واكسب +25 نقطة سند.
            </DialogDescription>
          </DialogHeader>

          {feedbackSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-navy-900 text-sm">تم تسجيل تقييمك بنجاح!</h4>
              <p className="text-xs text-slate-500">
                أضيفت <span className="font-bold text-amber-600">+25 نقطة سند</span> إلى محفظتك تقديراً لمساهمتك.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-navy-900 block mb-1">التقييم العام (من 5 نجوم):</label>
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
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 mr-2">{rating} نجوم</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">أبرز نقاط القوة:</label>
                <textarea
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  rows={2}
                  required
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy-900">نصائح ومقترحات التحسين:</label>
                <textarea
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  rows={2}
                  required
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <DialogFooter className="gap-2 sm:gap-0 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackModalOpen(false)}
                  className="text-xs"
                >
                  إلغاء
                </Button>
                <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">
                  إرسال التقييم وكسب النقاط
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
