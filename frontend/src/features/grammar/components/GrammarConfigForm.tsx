// src/features/grammar/components/GrammarConfigForm.tsx
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GrammarConfigForm() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(5); // jumlah grammar per set
  const [level, setLevel] = useState<"All" | "N5" | "N4" | "N3" | "N2" | "N1">("N5");
  const [totalSets, setTotalSets] = useState(1);
  const [duration, setDuration] = useState(15);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      grammarPerSet: limit,
      totalSets,
      duration,
      level,
    };
    navigate("/grammar/study", { state: config });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mb-4 bg-gray-50 border border-gray-200 rounded-xl shadow space-y-3"
    >
      <h2 className="font-bold text-gray-700">⚙️ Pengaturan Belajar Grammar</h2>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Jumlah Grammar per Set"
            type="number"
            name="grammarPerSet"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
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

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Durasi per Grammar (detik)"
            type="number"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Level</label>
          <select
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">Semua Level</option>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="lg">
          Mulai Belajar
        </Button>
      </div>
    </form>
  );
}
