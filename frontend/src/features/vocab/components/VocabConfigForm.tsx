import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
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
      className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow space-y-3"
    >
      <h2 className="font-bold text-gray-700">⚙️ Pengaturan Belajar</h2>
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Jumlah Kata per Set"
            type="number"
            name="wordsPerSet"
            value={limit}
            variant="default"
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <Input
            label="Jumlah Set"
            type="number"
            name="totalSets"
            value={totalSets}
            variant="default"
            onChange={(e) => setTotalSets(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Durasi per Kata (detik)"
            type="number"
            name="duration"
            value={duration}
            variant="default"
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <Input
            label="Durasi istirahat (detik)"
            type="number"
            name="breakDuration"
            value={breakDuration}
            variant="default"
            onChange={(e) => setBreakDuration(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-3">
          <Select
            options={[
              { value: "All", label: "Semua Level" },
              { value: "N5", label: "N5" },
              { value: "N4", label: "N4" },
              { value: "N3", label: "N3" },
              { value: "N2", label: "N2" },
              { value: "N1", label: "N1" },
            ]}
            value={level}
            onChange={(value) => setLevel(value as "All" | "N5" | "N4" | "N3" | "N2" | "N1")}
          />
        </div>
        <div className="flex-1 flex justify-end">
          <Button type="submit" variant="primary" size="md" onClick={handleSubmit}>
            Mulai Belajar
          </Button>
        </div>
      </div>
    </form>
  );
}
