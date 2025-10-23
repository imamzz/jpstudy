// src/features/grammar/components/exercises/MultipleChoice.tsx
import { useState } from "react";

interface MultipleChoiceProps {
  question: string;
  options: string[];
  answer: string;
  onAnswer: (isCorrect: boolean) => void;
}

export default function MultipleChoice({
  question,
  options,
  answer,
  onAnswer,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    onAnswer(selected === answer);
    setSelected(null);
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white space-y-4">
      <p className="font-medium text-gray-800">{question}</p>

      <div className="space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(opt)}
            className={`w-full px-4 py-2 border rounded-lg text-left transition ${
              selected === opt
                ? "bg-blue-500 text-white border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
      >
        Jawab
      </button>
    </div>
  );
}
