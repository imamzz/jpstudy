import { useNavigate } from "react-router-dom";
import type { StudyConfig } from "@/types/study";

interface VocabStudySummaryProps {
  totalWords: number;
  totalSets: number;
  learnedCount: number;
  notLearnedCount: number;
  totalTime: number;
  config: StudyConfig;
}

export default function VocabStudySummary({
  totalWords,
  totalSets,
  learnedCount,
  notLearnedCount,
  totalTime,
  config,
}: VocabStudySummaryProps) {
  const navigate = useNavigate();

  const studyConfig = {
    wordsPerSet: config.wordsPerSet,
    totalSets: config.totalSets,
    duration: config.duration,
    level: config.level,
    breakDuration: config.breakDuration,
  };

  // Helper: format waktu jadi mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          🎉 Sesi Belajar Selesai!
        </h2>

        <p className="text-gray-600">
          Kamu sudah mempelajari <b>{totalWords}</b> kata dalam{" "}
          <b>{totalSets}</b> set.
        </p>

        {/* Statistik detail */}
        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
          <p className="text-green-600 font-medium">
            ✅ {learnedCount} kata ditandai hafal
          </p>
          <p className="text-red-600 font-medium">
            ❌ {notLearnedCount} kata belum ditandai hafal
          </p>
          <p className="text-blue-600 font-medium">
            ⏰ Total waktu belajar: {formatTime(totalTime)}
          </p>
        </div>

        {/* Progress bar full */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-blue-500 h-3 rounded-full" style={{ width: "100%" }} />
        </div>

        {/* Tombol aksi */}
        <div className="flex space-x-4 justify-center mt-6">
          <button
            onClick={() => navigate("/vocab/study"  , { state: studyConfig })}
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
