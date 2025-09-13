// src/pages/user/vocab/components/VocabConfigForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    selectedLevel: "All" | "N5" | "N4" | "N3" | "N2" | "N1";
  }
  

export default function VocabConfigForm({ selectedLevel }: Props) {
  const navigate = useNavigate();

  const [config, setConfig] = useState({
    wordsPerSet: 10,
    totalSets: 2,
    duration: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleStart = () => {
    navigate("/vocab/study", { state: { ...config, level: selectedLevel } });
  };
  

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 border rounded">
      <h2 className="text-xl font-bold">Atur Sesi Belajar ({selectedLevel})</h2>

      <div>
        <label className="block text-sm font-medium">Jumlah Kata per Set</label>
        <input
          type="number"
          name="wordsPerSet"
          value={config.wordsPerSet}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Jumlah Set</label>
        <input
          type="number"
          name="totalSets"
          value={config.totalSets}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Durasi per Kata (detik)</label>
        <input
          type="number"
          name="duration"
          value={config.duration}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={handleStart}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Mulai Belajar
      </button>
    </div>
  );
}
