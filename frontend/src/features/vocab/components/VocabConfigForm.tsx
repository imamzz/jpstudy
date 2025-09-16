import Button from "@/components/atoms/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VocabConfigForm() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [level, setLevel] = useState<"All" | "N5" | "N4" | "N3" | "N2" | "N1">(
    "N5"
  );
  const [totalSets, setTotalSets] = useState(2);
  const [duration, setDuration] = useState(10);
  const [breakDuration, setBreakDuration] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      wordsPerSet: limit,
      totalSets: totalSets,
      duration,
      level,
      breakDuration,
    };
    navigate("/vocab/study", { state: config });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 border rounded-xl shadow space-y-3"
    >
      <h2 className="font-bold text-gray-700">⚙️ Pengaturan Belajar</h2>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-600">
            Jumlah Kata per Set
          </label>
          <input
            type="number"
            name="wordsPerSet"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-600">
            Jumlah Set
          </label>
          <input
            type="number"
            name="totalSets"
            value={totalSets}
            onChange={(e) => setTotalSets(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-600">
            Durasi per Kata (detik)
          </label>
          <input
            type="number"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-600">
            Durasi istirahat (detik)
          </label>
          <input
            type="number"
            name="breakDuration"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
            className="w-full px-2 py-1 border rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-3">
          <label className="block text-sm font-semibold text-gray-600">
            Level
          </label>
          <select
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="px-2 py-1 border rounded-lg"
          >
            <option value="All">Semua Level</option>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select>
        </div>
        <div className="flex-1 flex justify-end">
          <Button type="submit" variant="primary" size="lg" onClick={handleSubmit}>
            Mulai Belajar
          </Button>
        </div>
      </div>
    </form>
  );
}
