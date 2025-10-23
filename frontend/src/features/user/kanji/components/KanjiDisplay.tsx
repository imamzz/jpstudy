import React from "react";

interface KanjiDisplayProps {
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  examples: string[];
}

export default function KanjiDisplay({
  kanji,
  onyomi,
  kunyomi,
  meaning,
  examples,
}: KanjiDisplayProps) {
  return (
    <div className="w-full p-6 border rounded-lg shadow bg-white space-y-4 text-center">
      {/* Kanji Utama */}
      <h1 className="text-6xl font-bold text-gray-800">{kanji}</h1>

      {/* Informasi */}
      <div className="space-y-2">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Onyomi:</span> {onyomi.join("、 ")}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Kunyomi:</span> {kunyomi.join("、 ")}
        </p>
        <p className="text-gray-600 italic">Arti: {meaning}</p>
      </div>

      {/* Contoh Kalimat */}
      <div className="bg-gray-50 rounded-lg p-4 text-left">
        <h3 className="font-semibold text-gray-700 mb-2">Contoh:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {examples.map((ex, idx) => (
            <li key={idx}>{ex}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
