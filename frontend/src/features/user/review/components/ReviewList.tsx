// src/features/review/components/ReviewList.tsx
import type { ReviewItem } from "@/features/user/review/reviewSlice";

interface Props {
  items: ReviewItem[];
}

export default function ReviewList({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="p-4 border rounded-lg shadow bg-white text-center text-gray-500">
        📭 Tidak ada item untuk direview dalam 7 hari terakhir
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow bg-white space-y-2">
      <h2 className="text-lg font-semibold mb-2">Daftar Item</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={`${item.type}-${item.id}`}
            className="flex justify-between border-b py-2 text-sm"
          >
            <span>
              <b>{item.type.toUpperCase()}</b>: {item.content} → {item.meaning}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(item.masteredAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
