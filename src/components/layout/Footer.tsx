import React from 'react';
import Link from 'next/link';
import { PlaySquare, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 mt-auto border-t border-navy-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                <PlaySquare className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">سندتيوب</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-brandCyan">SanadTube</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المنصة العربية الأولى المخصصة لمساندة صناع المحتوى على يوتيوب عبر مجتمع تفاعلي حقيقي، أدوات تحليل أداء ذكية، وفرص تعاون مثمرة.
            </p>
            <div className="text-[11px] text-slate-400">
              الإصدار 1.0 (MVP) — 2026
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">أقسام المنصة</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">لوحة تحكم القناة</Link></li>
              <li><Link href="/discover" className="hover:text-primary transition-colors">اكتشاف صناع المحتوى</Link></li>
              <li><Link href="/collaborations" className="hover:text-primary transition-colors">إدارة طلبات التعاون</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition-colors">مراجعات الصور والعناوين</Link></li>
              <li><Link href="/monetization" className="hover:text-primary transition-colors">متابعة أهلية شركاء YouTube</Link></li>
              <li><Link href="/points" className="hover:text-primary transition-colors">نظام النقاط والإنجازات</Link></li>
            </ul>
          </div>

          {/* Guidelines & Safety */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">الامتثال والسياسات</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>خالٍ تماماً من التفاعل المصطنع</span>
              </li>
              <li>
                <a 
                  href="https://support.google.com/youtube/answer/3399767" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>سياسة YouTube للتفاعل المزيف</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://support.google.com/youtube/answer/72851" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>برنامج شركاء YouTube (YPP)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://developers.google.com/youtube/terms/api-services-terms-of-service" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>شروط خدمات YouTube API</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance Disclaimer */}
          <div className="bg-navy-800/80 p-4 rounded-2xl border border-navy-700 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>إخلاء مسؤولية وضمان النزاهة</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              سندتيوب لا تقدم خدمات شراء المشاهدات أو المشتركين، ولا تعتمد على تبادل الاشتراكات (Sub4Sub). جميع النقاط تُمنح فقط لقاء الملاحظات الإرشادية والمساهمات المعرفية داخل المجتمع.
            </p>
          </div>

        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            جميع الحقوق محفوظة © 2026 منصة سندتيوب — SanadTube
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>صُنع بشغف لمساندة صناع المحتوى في العالم العربي</span>
            <Heart className="w-3.5 h-3.5 text-ytRed inline fill-ytRed" />
          </div>
        </div>
      </div>
    </footer>
  );
}
