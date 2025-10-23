// src/features/review/components/ReviewConfigForm.tsx
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewConfigForm() {
  const navigate = useNavigate();

  const [itemsPerSet, setItemsPerSet] = useState(5);
  const [totalSets, setTotalSets] = useState(1);
  const [duration, setDuration] = useState(10);
  const [type, setType] = useState<"all" | "vocab" | "grammar" | "kanji">("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = { itemsPerSet, totalSets, duration, type };
    navigate("/review/study", { state: config });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow space-y-4"
    >
      <h2 className="font-bold text-gray-700">⚙️ Pengaturan Review</h2>

      {/* Items per set & total set */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Jumlah Item per Set"
            type="number"
            name="itemsPerSet"
            value={itemsPerSet}
            onChange={(e) => setItemsPerSet(Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <Input
            label="Jumlah Set"
            type="number"
            name="totalSets"
            value={totalSets}
            onChange={(e) => setTotalSets(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Duration & Type */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Durasi per Item (detik)"
            type="number"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Jenis Review</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "all" | "vocab" | "grammar" | "kanji")}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua</option>
            <option value="vocab">Vocabulary</option>
            <option value="grammar">Grammar</option>
            <option value="kanji">Kanji</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="lg">
          Mulai Review
        </Button>
      </div>
    </form>
  );
}
