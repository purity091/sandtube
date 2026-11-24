'use client';

import React from 'react';
import { DetailedChannelIdea } from '@/lib/channelIdeasData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Layers,
  X,
  TrendingUp,
  DollarSign,
  Clock,
  Video,
  Camera,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface ComparisonModalProps {
  ideas: DetailedChannelIdea[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveIdea: (id: string) => void;
  onSelectIdea: (idea: DetailedChannelIdea) => void;
}

export default function ComparisonModal({
  ideas,
  isOpen,
  onClose,
  onRemoveIdea,
  onSelectIdea,
}: ComparisonModalProps) {
  if (ideas.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-white rounded-2xl p-6 max-h-[92vh] overflow-y-auto border border-zinc-200 shadow-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-zinc-700 text-xs font-bold mb-1">
            <Layers className="w-4 h-4 text-[#FF0000]" />
            <span>مصفوفة المقارنة المرجعية لأفكار القنوات</span>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-bold text-zinc-900">
            مقارنة مباشرة بين {ideas.length} أفكار قنوات مختارة
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            تحليل الفروقات المالية، والجهد الإنتاجي، وسرعة النمو، ومستوى المنافسة لاختيار الأنسب لك.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-x-auto pt-3">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="p-3 text-right text-zinc-400 font-semibold w-40">معيار المقارنة</th>
                {ideas.map((idea) => (
                  <th key={idea.id} className="p-3 text-right min-w-[200px]">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-[10px]">{idea.category}</Badge>
                        <button
                          onClick={() => onRemoveIdea(idea.id)}
                          className="text-zinc-400 hover:text-zinc-800 p-1"
                          title="إزالة من المقارنة"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={idea.coverImage} alt={idea.title} className="w-9 h-9 rounded-lg object-cover border border-zinc-200" />
                        <h4 className="font-bold text-zinc-900 line-clamp-1">{idea.title}</h4>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {/* Row: Long-form RPM */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">وسيط RPM (الفيديوهات الطويلة)</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 font-extrabold text-zinc-900 text-sm">
                    ${idea.longFormRpmMedian}
                    <span className="text-[10px] text-zinc-400 font-normal block">نطاق: ${idea.longFormRpmP25} – ${idea.longFormRpmP75}</span>
                  </td>
                ))}
              </tr>

              {/* Row: Shorts RPM */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">وسيط RPM (الشورتس Shorts)</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 font-bold text-[#FF0000]">
                    ${idea.shortsRpmMedian}
                    <span className="text-[10px] text-zinc-400 font-normal block">نطاق: ${idea.shortsRpmMin} – ${idea.shortsRpmMax}</span>
                  </td>
                ))}
              </tr>

              {/* Row: 100k views estimated */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">أرباح 100 ألف مشاهدة طويلة مقدرة</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 font-extrabold text-zinc-900 text-sm">
                    ~${Math.round((100000 * idea.longFormRpmMedian) / 1000).toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Row: Demand & Competition */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">الطلب مقابل المنافسة</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">الطلب:</span>
                      <strong className="text-zinc-900">{idea.demandVolume}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">المنافسة:</span>
                      <strong className="text-zinc-700">{idea.competitionLevel}</strong>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Growth Speed */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">سرعة نمو القناة المحتملة</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 font-semibold text-zinc-800">
                    {idea.growthSpeed}
                  </td>
                ))}
              </tr>

              {/* Row: Camera appearance */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">الظهور أمام الكاميرا</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3">
                    <Badge variant="secondary" className="text-[10px]">
                      {idea.cameraAppearance}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Row: Production Time & Cost */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">وقت وتكلفة الإنتاج</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 space-y-0.5">
                    <span className="block text-zinc-700">{idea.productionTime}</span>
                    <span className="text-[10px] text-zinc-400">التكلفة: {idea.productionCost}</span>
                  </td>
                ))}
              </tr>

              {/* Row: Equipment */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">المعدات المطلوبة</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 text-zinc-700 font-medium">
                    {idea.equipmentRequired}
                  </td>
                ))}
              </tr>

              {/* Row: AI Suitability */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">ملاءمة الذكاء الاصطناعي</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3 text-zinc-700">
                    {idea.aiAssistanceSuitability}
                  </td>
                ))}
              </tr>

              {/* Row: Actions */}
              <tr>
                <td className="p-3 font-bold text-zinc-700 bg-zinc-50/50">الخطوة القادمة</td>
                {ideas.map((idea) => (
                  <td key={idea.id} className="p-3">
                    <Button
                      variant="youtube"
                      size="sm"
                      onClick={() => {
                        onClose();
                        onSelectIdea(idea);
                      }}
                      className="w-full text-xs font-bold"
                    >
                      استكشف الفكرة
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <DialogFooter className="pt-4 border-t border-zinc-100 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose} className="text-xs">
            إغلاق المقارنة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
