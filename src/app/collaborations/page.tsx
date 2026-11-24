'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  Users2,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  MessageSquare,
  Award,
  ArrowUpRight,
  Check,
  X,
  PlayCircle,
  FileCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { CollabStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function CollaborationsPage() {
  const { collaborations, user, updateCollabStatus } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCollabs = collaborations.filter((collab) => {
    if (activeTab === 'incoming') return collab.targetId === user.id;
    if (activeTab === 'outgoing') return collab.requesterId === user.id;
    return true;
  });

  const getStatusBadge = (status: CollabStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <Badge variant="success" className="text-xs gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مقبولة وجارِ التنفيذ</span>
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="cyan" className="text-xs gap-1 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>مرحلة التصوير والمونتاج</span>
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="default" className="text-xs gap-1 font-bold bg-purple-600 text-white">
            <Award className="w-3.5 h-3.5 text-purple-200" />
            <span>مكتملة وموثقة (+50 نقطة)</span>
          </Badge>
        );
      case 'declined':
        return (
          <Badge variant="destructive" className="text-xs gap-1 font-bold">
            <XCircle className="w-3.5 h-3.5" />
            <span>تم الاعتذار</span>
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge variant="warning" className="text-xs gap-1 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>بانتظار الرد</span>
          </Badge>
        );
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
                <Users2 className="w-5 h-5 text-zinc-900" />
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">فرص وشراكات التعاون المشترك</h1>
                <Badge variant="secondary" className="text-xs">{collaborations.length} طلبات</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                متابعة دعوات التعاون بين القنوات، وتوثيق الفيديوهات المشتركة، والحصول على مكافآت نقاط سند.
              </p>
            </div>

            <Button asChild variant="youtube" size="sm" className="gap-2 rounded-xl text-xs font-bold">
              <Link href="/discover">
                <Sparkles className="w-4 h-4 fill-white" />
                <span>+ اكتشاف قنوات لطلب تعاون جديد</span>
              </Link>
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between gap-3">
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full sm:w-auto">
              <TabsList className="bg-white border border-slate-200/80 p-1 rounded-xl h-10 shadow-2xs">
                <TabsTrigger value="all" className="text-xs font-bold px-4 rounded-lg">
                  الكل ({collaborations.length})
                </TabsTrigger>
                <TabsTrigger value="incoming" className="text-xs font-bold px-4 rounded-lg">
                  الواردة إليك
                </TabsTrigger>
                <TabsTrigger value="outgoing" className="text-xs font-bold px-4 rounded-lg">
                  المرسلة منك
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Collaborations List */}
          {filteredCollabs.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Users2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-navy-900">لا توجد طلبات تعاون في هذا القسم</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                استكشف قنوات المجتمع وأرسل أول دعوة تعاون لإنتاج فيديو مشترك يضاعف وصولك.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2 text-xs">
                <Link href="/discover">استكشاف القنوات الآن</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCollabs.map((collab) => {
                const isIncoming = collab.targetId === user.id;

                return (
                  <Card key={collab.id} className="bg-white border-slate-200/90 shadow-2xs overflow-hidden">
                    <CardHeader className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Channel Connection Banner */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-10 h-10 border border-slate-200">
                            <AvatarImage src={collab.requesterChannelAvatar} alt={collab.requesterName} />
                            <AvatarFallback>{collab.requesterName.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <span className="text-[10px] text-slate-400 font-semibold block">صاحب الاقتراح</span>
                            <span className="text-xs font-bold text-navy-900 truncate block">{collab.requesterChannelTitle}</span>
                          </div>
                        </div>

                        <div className="px-2 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-bold">
                          ⇄
                        </div>

                        <div className="flex items-center gap-2">
                          <Avatar className="w-10 h-10 border border-slate-200">
                            <AvatarImage src={collab.targetChannelAvatar} alt={collab.targetChannelTitle} />
                            <AvatarFallback>{collab.targetChannelTitle.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <span className="text-[10px] text-slate-400 font-semibold block">القناة الشريكة</span>
                            <span className="text-xs font-bold text-navy-900 truncate block">{collab.targetChannelTitle}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="self-start sm:self-auto">
                        {getStatusBadge(collab.status)}
                      </div>
                    </CardHeader>

                    <CardContent className="p-5 space-y-3">
                      <div>
                        <CardTitle className="text-sm sm:text-base font-bold text-navy-900">
                          {collab.title}
                        </CardTitle>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {collab.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span>نوع التعاون: <strong className="text-navy-900">{collab.collabType}</strong></span>
                        <span>•</span>
                        <span>الجمهور المستهدف: <strong className="text-navy-900">{collab.targetAudience}</strong></span>
                        <span>•</span>
                        <span>تاريخ الطلب: <strong className="text-slate-700">{new Date(collab.createdAt).toLocaleDateString('ar-SA')}</strong></span>
                      </div>
                    </CardContent>

                    <Separator />

                    {/* Actions */}
                    <CardFooter className="p-4 px-5 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-[11px] text-slate-400">
                        {isIncoming ? 'أنت مستلم هذا الطلب' : 'تم إرسال هذا الطلب من قناتك'}
                      </div>

                      <div className="flex items-center gap-2">
                        {isIncoming && collab.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                updateCollabStatus(collab.id, 'declined');
                                showToast('تم الاعتذار عن طلب التعاون');
                              }}
                              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <X className="w-3.5 h-3.5 ml-1" />
                              اعتذار
                            </Button>

                            <Button
                              variant="youtube"
                              size="sm"
                              onClick={() => {
                                updateCollabStatus(collab.id, 'accepted');
                                showToast('تهانينا! تم قبول طلب التعاون والبدء في التنفيذ');
                              }}
                              className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <Check className="w-3.5 h-3.5 ml-1" />
                              قبول وبدء التعاون
                            </Button>
                          </>
                        )}

                        {collab.status === 'accepted' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              updateCollabStatus(collab.id, 'completed');
                              showToast('تم توثيق إتمام العمل المشترك بنجاح وكسب +50 نقطة سند');
                            }}
                            className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100"
                          >
                            <FileCheck className="w-3.5 h-3.5 ml-1" />
                            توثيق نشر الفيديو واكتمال التعاون
                          </Button>
                        )}

                        <Button variant="outline" size="sm" asChild className="text-xs">
                          <Link href="/reviews">طلب مراجعة للمحتوى المشترك</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
