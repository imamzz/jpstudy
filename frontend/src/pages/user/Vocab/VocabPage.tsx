// src/pages/user/vocab/VocabPage.tsx
import { useState } from "react";
import { useVocab } from "./store/vocabContext";
import VocabTable from "./components/VocabTable";
import VocabProgress from "./components/VocabProgress";
import VocabConfigForm from "./components/VocabConfigForm";

export default function VocabPage() {
  const { words } = useVocab();
  const [selectedLevel, setSelectedLevel] = useState<
    "All" | "N5" | "N4" | "N3" | "N2" | "N1"
  >("N5");

  // 🔹 Jika "All" → tampilkan semua kosakata
  const filteredWords =
    selectedLevel === "All" ? words : words.filter((w) => w.level === selectedLevel);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Kosakata {selectedLevel === "All" ? "(Semua Level)" : `(${selectedLevel})`}
      </h1>

      {/* Tab Level */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "N5", "N4", "N3", "N2", "N1"].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level as any)}
            className={`px-4 py-2 rounded ${
              selectedLevel === level
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Progress & Table */}
      <VocabProgress words={filteredWords} />
      <VocabTable words={filteredWords} />

      {/* Config Form */}
      <VocabConfigForm selectedLevel={selectedLevel === "All" ? "All" : selectedLevel} />
    </div>
  );
}
