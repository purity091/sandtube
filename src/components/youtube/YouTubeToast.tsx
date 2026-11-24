'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface ToastData {
  id: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function YouTubeToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        actionLabel?: string;
        onAction?: () => void;
      }>;
      if (!customEvent.detail?.message) return;

      const newToast: ToastData = {
        id: Date.now(),
        message: customEvent.detail.message,
        actionLabel: customEvent.detail.actionLabel,
        onAction: customEvent.detail.onAction,
      };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    };

    window.addEventListener('yt-toast', handleToastEvent);
    return () => window.removeEventListener('yt-toast', handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#0F0F0F] text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800/80 flex items-center justify-between gap-3 text-xs select-none animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-2 h-2 rounded-full bg-[#FF0000] shrink-0" />
            <span className="truncate font-medium">{toast.message}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {toast.actionLabel && (
              <button
                onClick={() => {
                  toast.onAction?.();
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                }}
                className="text-[#3EA6FF] hover:text-[#65B8FF] font-bold uppercase text-[11px] px-1 py-0.5 rounded hover:bg-white/10 transition-colors"
              >
                {toast.actionLabel}
              </button>
            )}
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
