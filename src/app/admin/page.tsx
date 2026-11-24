'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import YouTubeSidebar from '@/components/layout/YouTubeSidebar';
import { useSanadTube } from '@/lib/store';
import {
  ShieldCheck,
  Users,
  Youtube,
  AlertTriangle,
  Activity,
  Database,
  Cpu,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Search,
  Filter,
  Radio,
  Server,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  const { channels, user } = useSanadTube();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [reports, setReports] = useState([
    {
      id: 'rep-01',
      reporterName: 'سارة عبد الله',
      targetChannelTitle: 'قناة تجريبية مشبوهة',
      reason: 'اشتباه بمحاولة ترويج خدمات تبادل اشتراكات خارجية مصطنعة (خلافاً لميثاق سندتيوب)',
      status: 'pending',
      date: '2026-11-06',
    },
    {
      id: 'rep-02',
      reporterName: 'عمر القحطاني',
      targetChannelTitle: 'مراجعة غير لائقة',
      reason: 'استخدام عبارات غير مهنية في نقد الصورة المصغرة لزميل',
      status: 'resolved',
      date: '2026-11-05',
    },
  ]);

  const auditLogs = [
    { id: 'log-1', actor: 'Super Admin', action: 'تحديث معايير مطابقة إرشادات المنتدى', target: 'community_rules', time: 'منذ ساعتين', ip: '192.168.1.1' },
    { id: 'log-2', actor: 'System Worker', action: 'مزامنة دورية لـ 142 قناة عبر YouTube Data API v3', target: 'youtube_api_sync', time: 'منذ 3 ساعات', ip: 'internal-cluster' },
    { id: 'log-3', actor: 'Moderator (خالد)', action: 'إغلاق بلاغ مخالفة وتوجيه تنبيه', target: 'report #rep-02', time: 'منذ يوم', ip: '10.0.4.22' },
  ];

  const handleResolveReport = (reportId: string) => {
    setReports(reports.map((r) => (r.id === reportId ? { ...r, status: 'resolved' } : r)));
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
          
          {/* Top Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-zinc-900" />
                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">لوحة الإدارة والرقابة العليا (Admin Center)</h1>
                <Badge variant="secondary" className="text-xs font-bold">Super Admin</Badge>
              </div>
              <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
                مراقبة صحة النظام، إدارة بلاغات المحتوى، متابعة استهلاك حصة YouTube Data API v3، وسجل العمليات الحساسة (Audit Log).
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>جميع الخدمات السحابية تعمل بكفاءة 100%</span>
            </div>
          </div>

          {/* System & KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border-slate-200/80 shadow-2xs">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>إجمالي صناع المحتوى</span>
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-black text-navy-900">1,480 صانع</div>
                <div className="text-[11px] text-emerald-600 font-bold">+38 انضموا هذا الأسبوع</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200/80 shadow-2xs">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>القنوات المربوطة والموثقة</span>
                  <Youtube className="w-4 h-4 text-[#FF0033]" />
                </div>
                <div className="text-2xl font-black text-navy-900">2,110 قناة</div>
                <div className="text-[11px] text-slate-400">معدل نجاح OAuth: 99.4%</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200/80 shadow-2xs">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>حصة YouTube API اليومية</span>
                  <Activity className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-navy-900">2,840 / 10,000</div>
                <Progress value={28.4} className="h-1.5 mt-1" />
                <div className="text-[11px] text-slate-400">28.4% استهلاك آمن ومراقب</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200/80 shadow-2xs">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>البلاغات والمخالفات</span>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-black text-navy-900">1 معلق</div>
                <div className="text-[11px] text-emerald-600 font-bold">زمن الاستجابة: أقل من ساعة</div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Moderation Queue */}
          <Card className="bg-white border-slate-200/90 shadow-2xs overflow-hidden">
            <CardHeader className="p-5 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-navy-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>طابور فحص البلاغات ومخالفات السياسات (Moderation Queue)</span>
                </CardTitle>
                <CardDescription className="text-xs">
                  التحقق من أي محاولات للتفاعل المصطنع أو تبادل الاشتراكات غير المسموح بها
                </CardDescription>
              </div>

              <Badge variant="outline" className="text-xs text-slate-500">
                {reports.filter((r) => r.status === 'pending').length} بلاغات قيد المراجعة
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-navy-900">{rep.targetChannelTitle}</span>
                        <Badge
                          variant={rep.status === 'pending' ? 'destructive' : 'success'}
                          className="text-[10px]"
                        >
                          {rep.status === 'pending' ? 'بانتظار الإجراء' : 'تم الحل والإغلاق'}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        السبب: {rep.reason}
                      </p>
                      <div className="text-[11px] text-slate-400">
                        مقدم البلاغ: <strong>{rep.reporterName}</strong> • التاريخ: {rep.date}
                      </div>
                    </div>

                    {rep.status === 'pending' && (
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <Button
                          variant="youtube"
                          size="sm"
                          onClick={() => handleResolveReport(rep.id)}
                          className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          اعتماد الحل وتوجيه تنبيه
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Audit Log Table */}
          <Card className="bg-white border-slate-200/90 shadow-2xs overflow-hidden">
            <CardHeader className="p-5 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-navy-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>سجل العمليات والتدقيق الأمني (Audit Log)</span>
              </CardTitle>
              <CardDescription className="text-xs">
                تسجيل كل حدث إداري وتقني في المنصة لضمان النزاهة والامتثال
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                        LOG
                      </div>
                      <div>
                        <span className="font-bold text-navy-900 block">{log.action}</span>
                        <span className="text-[11px] text-slate-400">
                          بواسطة: <strong className="text-slate-700">{log.actor}</strong> • الهدف: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">{log.target}</code>
                        </span>
                      </div>
                    </div>

                    <div className="text-left text-[11px] text-slate-400 shrink-0">
                      <span>{log.time}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">{log.ip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
}
