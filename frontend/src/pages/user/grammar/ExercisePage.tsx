// src/pages/user/grammar/ExercisePage.tsx
import { useState } from "react";
import MultipleChoice from "@/features/user/grammar/components/exercises/MultipleChoice";
import FillBlank from "@/features/user/grammar/components/exercises/FillBlank";
import TrueFalse from "@/features/user/grammar/components/exercises/TrueFalse";

interface Exercise {
  type: "multiple" | "fill" | "truefalse";
  question: string;
  options?: string[];     // untuk multiple choice
  answer: string | boolean; // string untuk multiple/fill, boolean untuk truefalse
}

const exercises: Exercise[] = [
  {
    type: "multiple",
    question: "Pilih kalimat yang benar menggunakan ～ている:",
    options: ["私は本を読む。", "私は本を読んでいる。", "私は本を読んだ。"],
    answer: "私は本を読んでいる。",
  },
  {
    type: "fill",
    question: "私は＿＿＿を食べたい。",
    answer: "りんご",
  },
  {
    type: "truefalse",
    question: "日本へ行きたい → artinya 'saya sedang pergi ke Jepang'.",
    answer: false,
  },
];

export default function ExercisePage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = exercises[index];

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);

    if (index < exercises.length - 1) {
      setTimeout(() => setIndex((i) => i + 1), 800);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-2xl font-bold text-green-600">🎉 Latihan Selesai!</h1>
        <p>
          Skor: {score} dari {exercises.length}
        </p>
        <button
          onClick={() => {
            setIndex(0);
            setScore(0);
            setFinished(false);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ulangi Latihan
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Latihan Grammar</h2>
      {current.type === "multiple" && (
        <MultipleChoice
          question={current.question}
          options={current.options || []}
          answer={current.answer as string}
          onAnswer={handleAnswer}
        />
      )}
      {current.type === "fill" && (
        <FillBlank
          sentence={current.question}
          answer={current.answer as string}
          onAnswer={handleAnswer}
        />
      )}
      {current.type === "truefalse" && (
        <TrueFalse
          sentence={current.question}
          isCorrect={current.answer as boolean}
          onAnswer={handleAnswer}
        />
      )}
      <p className="text-sm text-gray-500">
        Soal {index + 1} dari {exercises.length}
      </p>
    </div>
  );
}
