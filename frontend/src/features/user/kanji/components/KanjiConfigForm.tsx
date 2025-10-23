import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KanjiConfigForm() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(10); // jumlah kanji per set
  const [level, setLevel] = useState<"All" | "N5" | "N4" | "N3" | "N2" | "N1">("N5");
  const [totalSets, setTotalSets] = useState(1);
  const [duration, setDuration] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      kanjiPerSet: limit,
      totalSets,
      duration,
      level,
    };
    navigate("/kanji/study", { state: config });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow space-y-3"
    >
      <h2 className="font-bold text-gray-700">⚙️ Pengaturan Belajar Kanji</h2>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Jumlah Kanji per Set"
            type="number"
            name="kanjiPerSet"
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
            label="Durasi per Kanji (detik)"
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
            onChange={(e) => setLevel(e.target.value as "All" | "N5" | "N4" | "N3" | "N2" | "N1")}
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
