// src/pages/user/review/ReviewStudy.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { markReviewed, selectRecentReviews } from "@/features/review/reviewSlice";
import StudyTimer from "@/features/grammar/components/StudyTimer"; // reuse timer
import GrammarDisplay from "@/features/grammar/components/GrammarDisplay";
import WordDisplay from "@/features/vocab/components/WordDisplay";
import KanjiDisplay from "@/features/kanji/components/KanjiDisplay";

interface Config {
  itemsPerSet: number;
  totalSets: number;
  duration: number; // detik per item
  type: "all" | "vocab" | "grammar" | "kanji";
}

export default function ReviewStudy() {
  const dispatch = useAppDispatch();
  const recentReviews = useAppSelector(selectRecentReviews);

  const location = useLocation();
  const navigate = useNavigate();

  const config = (location.state as Config) || {
    itemsPerSet: 5,
    totalSets: 1,
    duration: 10,
    type: "all",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // 🔹 filter items sesuai config
  const filtered =
    config.type === "all"
      ? recentReviews
      : recentReviews.filter((i) => i.type === config.type);

  const sessionItems = filtered.slice(0, config.itemsPerSet * config.totalSets);

  const totalItems = sessionItems.length;
  const currentSet = Math.floor(currentIndex / config.itemsPerSet) + 1;
  const currentItem = sessionItems[currentIndex];

  // progress
  const totalProgress = ((currentIndex + 1) / totalItems) * 100;
  const setProgress =
    (((currentIndex % config.itemsPerSet) + 1) / config.itemsPerSet) * 100;

  // global timer
  useEffect(() => {
    if (finished || paused) return;
    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [finished, paused]);

  // helper format waktu
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleTimeUp = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleMarkReviewed = () => {
    if (currentItem) dispatch(markReviewed(currentItem.id));
    handleNext();
  };

  // ✅ Ringkasan akhir
  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Sesi Review Selesai!
          </h2>
          <p className="text-gray-600">
            Kamu sudah mereview <b>{totalItems}</b> item dari{" "}
            <b>{config.totalSets}</b> set.
          </p>

          <p className="text-blue-600 font-medium">
            ⏰ Total waktu belajar: {formatTime(totalTime)}
          </p>

          <div className="flex space-x-4 justify-center mt-6">
            <button
              onClick={() => navigate("/review/study", { state: config })}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              🔁 Ulangi Sesi
            </button>
            <button
              onClick={() => navigate("/review")}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              ✅ Kembali ke Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Tampilan belajar
  return (
    <div className="p-6 flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      {/* Progress total */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Progres Total: {currentIndex + 1}/{totalItems}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Progress per set */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Set {currentSet}/{config.totalSets} • Item{" "}
          {(currentIndex % config.itemsPerSet) + 1}/{config.itemsPerSet}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${setProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Timer */}
      <StudyTimer
        key={currentIndex}
        paused={paused}
        duration={config.duration}
        onTimeUp={handleTimeUp}
      />

      {/* Konten Item */}
      {currentItem && (
        <>
          {currentItem.type === "vocab" && (
            <WordDisplay
              kanji={currentItem.kanji}
              kana={currentItem.kana}
              romaji={currentItem.romaji}
              arti={currentItem.meaning}
            />
          )}
          {currentItem.type === "grammar" && (
            <GrammarDisplay
              title={currentItem.content}
              meaning={currentItem.meaning}
              examples={currentItem.examples || []}
            />
          )}
          {currentItem.type === "kanji" && (
            <KanjiDisplay
              kanji={currentItem.kanji}
              onyomi={currentItem.onyomi}
              kunyomi={currentItem.kunyomi}
              meaning={currentItem.meaning}
              examples={currentItem.examples || []}
            />
          )}
        </>
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
          onClick={handleMarkReviewed}
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
        >
          Tandai Direview
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
