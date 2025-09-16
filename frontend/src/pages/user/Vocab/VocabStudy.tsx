// src/pages/user/vocab/VocabStudy.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { markAsLearned } from "@/features/vocab/vocabSlice";
import WordDisplay from "@/features/vocab/components/WordDisplay";
import StudyTimer from "@/features/vocab/components/StudyTimer";

interface Config {
  wordsPerSet: number;
  totalSets: number;
  duration: number;
  level: "All" | "N5" | "N4" | "N3" | "N2" | "N1";
  breakDuration: number;
}

export default function VocabStudy() {
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.vocab.words); // ✅ ambil dari redux

  const location = useLocation();
  const navigate = useNavigate();

  const config = (location.state as Config) || {
    wordsPerSet: 10,
    totalSets: 2,
    duration: 10,
    level: "N5",
    breakDuration: 5,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // 🔹 Fungsi shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 🔹 Filter kata sesuai level
  const levelWords =
    config.level === "All"
      ? shuffleArray(words)
      : words.filter((w) => w.level === config.level);

  const sessionWords = levelWords.slice(0, config.wordsPerSet * config.totalSets);

  const totalWords = sessionWords.length;
  const currentSet = Math.floor(currentIndex / config.wordsPerSet) + 1;
  const currentWord = sessionWords[currentIndex];

  // progress
  const totalProgress = ((currentIndex + 1) / totalWords) * 100;
  const setProgress =
    (((currentIndex % config.wordsPerSet) + 1) / config.wordsPerSet) * 100;

  // 🔹 Timer global untuk total waktu belajar
  useEffect(() => {
    if (finished || paused) return;

    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [finished, paused]);

  const handleTimeUp = () => {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleMarkLearned = () => {
    if (currentWord) dispatch(markAsLearned(currentWord.id)); // ✅ redux action
    handleNext();
  };

  // 🔹 Helper format detik → mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 🔹 Hitung statistik hafalan
  const learnedCount = sessionWords.filter((w) => w.status === "mastered").length;
  const notLearnedCount = totalWords - learnedCount;

  // 🔹 Ringkasan selesai
  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">🎉 Sesi Belajar Selesai!</h2>
          <p className="text-gray-600">
            Kamu sudah mempelajari <b>{totalWords}</b> kata dalam{" "}
            <b>{config.totalSets}</b> set.
          </p>

          {/* Statistik detail */}
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
            <p className="text-green-600 font-medium">✅ {learnedCount} kata ditandai hafal</p>
            <p className="text-red-600 font-medium">❌ {notLearnedCount} kata belum ditandai hafal</p>
            <p className="text-blue-600 font-medium">⏰ Total waktu belajar: {formatTime(totalTime)}</p>
          </div>

          {/* Progress bar full */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: "100%" }}></div>
          </div>

          <div className="flex space-x-4 justify-center mt-6">
            <button
              onClick={() => navigate("/vocab/study", { state: config })}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              🔁 Ulangi Sesi
            </button>
            <button
              onClick={() => navigate("/vocab")}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              ✅ Kembali ke Vocab
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Tampilan belajar
  return (
    <div className="p-6 flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      {/* Progress bar total */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Progres Total: {currentIndex + 1}/{totalWords}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Progress bar per set */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Set {currentSet}/{config.totalSets} • Kata {(currentIndex % config.wordsPerSet) + 1}/{config.wordsPerSet}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${setProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Indikator total waktu belajar */}
      <p className="text-blue-600 font-medium">⏱ Total waktu belajar: {formatTime(totalTime)}</p>

      {/* Timer per kata */}
      <StudyTimer
        key={currentIndex}
        paused={paused}
        duration={config.duration}
        onTimeUp={handleTimeUp}
      />

      {/* Kata */}
      {currentWord && (
        <WordDisplay
          kanji={currentWord.kanji}
          kana={currentWord.kana}
          romaji={currentWord.romaji}
          arti={currentWord.arti}
        />
      )}

      {/* Kontrol */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setPaused(!paused)}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={handleMarkLearned}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
        >
          Tandai Hafal
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
