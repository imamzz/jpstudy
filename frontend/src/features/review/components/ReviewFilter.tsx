// src/features/review/components/ReviewFilter.tsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilter } from "@/features/review/reviewSlice";

export default function ReviewFilter() {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.review);
  const [days, setDays] = useState(filter.days);

  return (
    <div className="flex gap-4 items-center">
      <select
        value={filter.type}
        onChange={(e) =>
          dispatch(setFilter({ type: e.target.value as any }))
        }
        className="border rounded px-3 py-1"
      >
        <option value="all">Semua</option>
        <option value="vocab">Vocab</option>
        <option value="grammar">Grammar</option>
        <option value="kanji">Kanji</option>
      </select>

      <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-20 border rounded px-2 py-1"
      />
      <button
        onClick={() => dispatch(setFilter({ days }))}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Terapkan
      </button>
    </div>
  );
}
