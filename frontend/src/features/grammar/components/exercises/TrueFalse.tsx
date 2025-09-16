// src/features/grammar/components/exercises/TrueFalse.tsx
import { useState } from "react";

interface TrueFalseProps {
  sentence: string;   // kalimat yang diuji
  isCorrect: boolean; // apakah kalimat ini benar secara grammar
  onAnswer: (isCorrect: boolean) => void;
}

export default function TrueFalse({
  sentence,
  isCorrect,
  onAnswer,
}: TrueFalseProps) {
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (choice: boolean) => {
    if (answered) return; // cegah double klik
    setAnswered(true);
    onAnswer(choice === isCorrect);
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white space-y-4">
      <p className="font-medium text-gray-800">{sentence}</p>

      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer(true)}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
          disabled={answered}
        >
          Benar
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
          disabled={answered}
        >
          Salah
        </button>
      </div>
    </div>
  );
}
