import { useState } from "react";

interface KanjiFillBlankProps {
  sentence: string;
  answer: string;
  onAnswer: (correct: boolean) => void;
}

export default function KanjiFillBlank({
  sentence,
  answer,
  onAnswer,
}: KanjiFillBlankProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(input.trim() === answer);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-lg font-medium">{sentence}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-3 py-2 rounded w-full"
        placeholder="Isi jawaban..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Jawab
      </button>
    </form>
  );
}
