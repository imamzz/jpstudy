// src/pages/user/grammar/GrammarStudy.tsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { markGrammarMastered } from "@/features/user/grammar/grammarSlice";
import GrammarDisplay from "@/features/user/grammar/components/GrammarDisplay";
import StudyTimer from "@/features/user/grammar/components/StudyTimer";

interface Config {
  grammarPerSet: number;
  totalSets: number;
  duration: number;
  level: "All" | "N5" | "N4" | "N3" | "N2" | "N1";
}

export default function GrammarStudy() {
  const dispatch = useAppDispatch();
  const grammarPoints = useAppSelector((state) => state.grammar.points);

  const location = useLocation();
  const navigate = useNavigate();

  const config = (location.state as Config) || {
    grammarPerSet: 5,
    totalSets: 1,
    duration: 15,
    level: "N5",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  // 🔹 Filter grammar sesuai level
  const levelGrammar =
    config.level === "All"
      ? grammarPoints
      : grammarPoints.filter((g) => g.level === config.level);

  const sessionGrammar = levelGrammar.slice(
    0,
    config.grammarPerSet * config.totalSets
  );

  const totalGrammar = sessionGrammar.length;
  const currentSet = Math.floor(currentIndex / config.grammarPerSet) + 1;
  const currentGrammar = sessionGrammar[currentIndex];

  // progress
  const totalProgress = ((currentIndex + 1) / totalGrammar) * 100;
  const setProgress =
    (((currentIndex % config.grammarPerSet) + 1) / config.grammarPerSet) * 100;

  // 🔹 Timer habis → auto next
  const handleTimeUp = () => {
    if (currentIndex < totalGrammar - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalGrammar - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleMarkMastered = () => {
    if (currentGrammar) dispatch(markGrammarMastered(currentGrammar.id));
    handleNext();
  };
  
  // 🔹 Hitung statistik hafalan
  const masteredCount = sessionGrammar.filter((g) => g.status === "mastered").length;
  const notMasteredCount = totalGrammar - masteredCount;

  const [totalTime, setTotalTime] = useState(0);

  // 🔹 Timer global untuk total waktu belajar
  useEffect(() => {
    if (finished || paused) return;

    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [finished, paused]);

  // 🔹 Helper format detik → mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 🔹 Ringkasan akhir
  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Sesi Grammar Selesai!
          </h2>
          <p className="text-gray-600">
            Kamu sudah mempelajari <b>{totalGrammar}</b> grammar point dalam{" "}
            <b>{config.totalSets}</b> set.
          </p>

          {/* Statistik detail */}
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
            <p className="text-green-600 font-medium">
              ✅ {masteredCount} grammar ditandai hafal
            </p>
            <p className="text-red-600 font-medium">
              ❌ {notMasteredCount} grammar belum ditandai hafal
            </p>
          </div>

          {/* Progress bar full */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>

          <p className="text-blue-600 font-medium">
            ⏰ Total waktu belajar: {formatTime(totalTime)}
          </p>

          <div className="flex space-x-4 justify-center mt-6">
            <button
              onClick={() => navigate("/grammar/study", { state: config })}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              🔁 Ulangi Sesi
            </button>
            <button
              onClick={() => navigate("/grammar")}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              ✅ Kembali ke Grammar
            </button>
            <button
              onClick={() => navigate("/grammar/exercise", { state: { sessionGrammar } })}
              className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
            >
              📝 Lanjut ke Latihan
            </button>
          </div>
        </div>
      </div>
    );
  }


  // 🔹 Tampilan belajar grammar
  return (
    <div className="p-6 flex flex-col items-center space-y-6 w-full max-w-2xl mx-auto">
      {/* Progress bar total */}
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-1">
          Progres Total: {currentIndex + 1}/{totalGrammar}
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
          Set {currentSet}/{config.totalSets} • Grammar{" "}
          {(currentIndex % config.grammarPerSet) + 1}/{config.grammarPerSet}
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

      {/* Grammar Point */}
      {currentGrammar && (
        <GrammarDisplay
          title={currentGrammar.title}
          meaning={currentGrammar.meaning}
          examples={currentGrammar.examples}
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
