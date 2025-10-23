// src/features/review/components/ReviewProgress.tsx
import type { ReviewItem } from "@/features/user/review/reviewSlice";

interface Props {
  items: ReviewItem[];
}

export default function ReviewProgress({ items }: Props) {
  const total = items.length;
  const reviewed = 0; // nanti bisa hitung berapa yg sudah direview
  const percent = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  return (
    <div className="w-full p-4 border rounded-lg shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Progres Review</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 bg-purple-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {reviewed} dari {total} item ({percent}%)
      </p>
    </div>
  );
}
