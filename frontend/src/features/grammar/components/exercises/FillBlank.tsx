// src/features/grammar/components/exercises/FillBlank.tsx
import { useState } from "react";

interface FillBlankProps {
  sentence: string; // kalimat dengan ___ untuk blank
  answer: string;
  onAnswer: (isCorrect: boolean) => void;
}

export default function FillBlank({
  sentence,
  answer,
  onAnswer,
}: FillBlankProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const isCorrect = input.trim() === answer;
    onAnswer(isCorrect);
    setInput("");
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white space-y-4">
      <p className="font-medium text-gray-800">{sentence}</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Isi jawaban..."
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={!input.trim()}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
      >
        Jawab
      </button>
    </div>
  );
}
