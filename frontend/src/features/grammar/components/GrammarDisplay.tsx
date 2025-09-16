// src/features/grammar/components/GrammarDisplay.tsx
import React from "react";

interface GrammarDisplayProps {
  title: string;
  meaning: string;
  examples: string[];
}

const GrammarDisplay: React.FC<GrammarDisplayProps> = ({ title, meaning, examples }) => {
  return (
    <div className="w-full p-6 border rounded-lg shadow bg-white space-y-4 text-center">
      {/* Judul Grammar */}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 italic">({meaning})</p>

      {/* Contoh Kalimat */}
      <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
        <h3 className="font-semibold text-gray-700">Contoh:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {examples.map((ex, i) => (
            <li key={i} className="text-gray-700">{ex}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GrammarDisplay;
