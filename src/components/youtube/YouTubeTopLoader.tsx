'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';

function TopLoaderContent() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Listen to custom global loading events (e.g. filter clicked, sync triggered)
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    };

    window.addEventListener('yt-loader-trigger', handleStart);
    return () => window.removeEventListener('yt-loader-trigger', handleStart);
  }, []);

  if (!loading) return null;

  return <div className="yt-top-loader" />;
}

export default function YouTubeTopLoader() {
  return (
    <Suspense fallback={null}>
      <TopLoaderContent />
    </Suspense>
  );
}
