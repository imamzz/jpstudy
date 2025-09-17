import { useState } from "react";
import KanjiMultipleChoice from "@/features/kanji/components/exercises/KanjiMultipleChoice";
import KanjiFillBlank from "@/features/kanji/components/exercises/KanjiFillBlank";
import KanjiTrueFalse from "@/features/kanji/components/exercises/KanjiTrueFalse";

interface Exercise {
  type: "multiple" | "fill" | "truefalse";
  question: string;
  options?: string[];
  answer: string | boolean;
}

const exercises: Exercise[] = [
  // 🔹 Multiple Choice
  {
    type: "multiple",
    question: "Kanji untuk 'air' adalah...",
    options: ["火", "水", "木", "土"],
    answer: "水",
  },
  {
    type: "multiple",
    question: "Kanji '学校' berarti...",
    options: ["Sekolah", "Rumah", "Kantor", "Pohon"],
    answer: "Sekolah",
  },
  {
    type: "multiple",
    question: "Apa arti kanji '憲法' (N1)?",
    options: ["Diskusi", "Konstitusi", "Ekonomi", "Politik"],
    answer: "Konstitusi",
  },

  // 🔹 Fill in the blank
  {
    type: "fill",
    question: "日曜日に私は＿＿＿へ行きます。 (tempat belajar)",
    answer: "学校",
  },
  {
    type: "fill",
    question: "私は＿＿＿を飲みたい。 (minuman, N5)",
    answer: "水",
  },
  {
    type: "fill",
    question: "経済を勉強するのが好きです。 → ＿＿＿ = ekonomi",
    answer: "経済",
  },

  // 🔹 True / False
  {
    type: "truefalse",
    question: "Kanji '猫' berarti kucing.",
    answer: true,
  },
  {
    type: "truefalse",
    question: "Kanji '議論' berarti sekolah.",
    answer: false,
  },
  {
    type: "truefalse",
    question: "Kanji '木' berarti pohon.",
    answer: true,
  },
  {
    type: "truefalse",
    question: "Kanji '水' berarti api.",
    answer: false,
  },
];

export default function KanjiExercise() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = exercises[index];
  const totalExercises = exercises.length;

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
        <h1 className="text-2xl font-bold text-green-600">🎉 Latihan Kanji Selesai!</h1>
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

  // 🔹 Progress
  const progress = ((index + 1) / totalExercises) * 100;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Latihan Kanji</h2>

      {/* Progress bar */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Progres: {index + 1}/{totalExercises}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {current.type === "multiple" && (
        <KanjiMultipleChoice
          question={current.question}
          options={current.options || []}
          answer={current.answer as string}
          onAnswer={handleAnswer}
        />
      )}
      {current.type === "fill" && (
        <KanjiFillBlank
          sentence={current.question}
          answer={current.answer as string}
          onAnswer={handleAnswer}
        />
      )}
      {current.type === "truefalse" && (
        <KanjiTrueFalse
          sentence={current.question}
          isCorrect={current.answer as boolean}
          onAnswer={handleAnswer}
        />
      )}

      <p className="text-sm text-gray-500 text-center">
        Soal {index + 1} dari {exercises.length}
      </p>
    </div>
  );
}
