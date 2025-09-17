import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { markKanjiMastered } from "@/features/kanji/kanjiSlice";
import KanjiDisplay from "@/features/kanji/components/KanjiDisplay";
import StudyTimer from "@/features/kanji/components/StudyTimer";

interface Config {
  kanjiPerSet: number;
  totalSets: number;
  duration: number;
  level: "All" | "N5" | "N4" | "N3" | "N2" | "N1";
}

export default function KanjiStudy() {
  const dispatch = useAppDispatch();
  const kanjiPoints = useAppSelector((state) => state.kanji.items);

  const location = useLocation();
  const navigate = useNavigate();

  const config = (location.state as Config) || {
    kanjiPerSet: 5,
    totalSets: 1,
    duration: 15,
    level: "N5",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  // 🔹 Filter kanji sesuai level
  const levelKanji =
    config.level === "All"
      ? kanjiPoints
      : kanjiPoints.filter((k) => k.level === config.level);

  const sessionKanji = levelKanji.slice(
    0,
    config.kanjiPerSet * config.totalSets
  );

  const totalKanji = sessionKanji.length;
  const currentSet = Math.floor(currentIndex / config.kanjiPerSet) + 1;
  const currentKanji = sessionKanji[currentIndex];

  // progress
  const totalProgress = ((currentIndex + 1) / totalKanji) * 100;
  const setProgress =
    (((currentIndex % config.kanjiPerSet) + 1) / config.kanjiPerSet) * 100;

  // 🔹 Timer global untuk total waktu belajar
  useEffect(() => {
    if (finished || paused) return;

    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [finished, paused]);

  const handleTimeUp = () => {
    if (currentIndex < totalKanji - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalKanji - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleMarkMastered = () => {
    if (currentKanji) dispatch(markKanjiMastered(currentKanji.id));
    handleNext();
  };

  // 🔹 Helper format detik → mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 🔹 Statistik
  const masteredCount = sessionKanji.filter((k) => k.status === "mastered").length;
  const notMasteredCount = totalKanji - masteredCount;

  // 🔹 Ringkasan selesai
  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Sesi Kanji Selesai!
          </h2>
          <p className="text-gray-600">
            Kamu sudah mempelajari <b>{totalKanji}</b> kanji dalam{" "}
            <b>{config.totalSets}</b> set.
          </p>

          {/* Statistik detail */}
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
            <p className="text-green-600 font-medium">
              ✅ {masteredCount} kanji ditandai hafal
            </p>
            <p className="text-red-600 font-medium">
              ❌ {notMasteredCount} kanji belum ditandai hafal
            </p>
            <p className="text-blue-600 font-medium">
              ⏰ Total waktu belajar: {formatTime(totalTime)}
            </p>
          </div>

          {/* Progress bar full */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>

          <div className="flex space-x-4 justify-center mt-6">
            <button
              onClick={() => navigate("/kanji/study", { state: config })}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              🔁 Ulangi Sesi
            </button>
            <button
              onClick={() => navigate("/kanji")}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              ✅ Kembali ke Kanji
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Tampilan belajar kanji
  return (
    <div className="p-6 flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      {/* Progress bar total */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Progres Total: {currentIndex + 1}/{totalKanji}
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
          Set {currentSet}/{config.totalSets} • Kanji{" "}
          {(currentIndex % config.kanjiPerSet) + 1}/{config.kanjiPerSet}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${setProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Timer per kanji */}
      <StudyTimer
        key={currentIndex}
        paused={paused}
        duration={config.duration}
        onTimeUp={handleTimeUp}
      />

      {/* Kanji Display */}
      {currentKanji && (
        <KanjiDisplay
          kanji={currentKanji.kanji}
          onyomi={currentKanji.onyomi}
          kunyomi={currentKanji.kunyomi}
          meaning={currentKanji.meaning}
          examples={currentKanji.examples}
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
          onClick={handleMarkMastered}
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
