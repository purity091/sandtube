import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { SanadTubeProvider } from '@/lib/store';
import YouTubeTopLoader from '@/components/youtube/YouTubeTopLoader';
import YouTubeToast from '@/components/youtube/YouTubeToast';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'سندتيوب — SanadTube | المنصة العربية لمساندة صناع المحتوى',
  description: 'منصة تعاونية رائدة لصناع المحتوى على YouTube: اكتشاف شركاء التعاون، مراجعة الفيديوهات، تحليلات متقدمة، ومتابعة شروط الربح دون أي تفاعل مصطنع.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexArabic.variable}>
      <body className="bg-[#FAFAFA] text-[#0F0F0F] font-arabic antialiased min-h-screen flex flex-col selection:bg-[#FF0000] selection:text-white">
        <SanadTubeProvider>
          {/* YouTube Top Progress Loader */}
          <YouTubeTopLoader />
          
          {children}

          {/* YouTube Floating Toast Manager */}
          <YouTubeToast />
        </SanadTubeProvider>
      </body>
    </html>
  );
}
