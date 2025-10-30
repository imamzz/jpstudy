import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";

interface KanjiStudySummaryProps {
  totalKanji: number;
  totalSets: number;
  learnedCount: number;
  notLearnedCount: number;
  totalTime: number;
} 

export default function KanjiStudySummary({
  totalKanji,
  totalSets,
  learnedCount,
  notLearnedCount,
  totalTime,
}: KanjiStudySummaryProps) {
  const navigate = useNavigate();

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
          Kamu sudah mempelajari <b>{totalKanji}</b> kanji dalam{" "}
          <b>{totalSets}</b> set.
        </p>

        {/* Statistik detail */}
        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
          <p className="text-green-600 font-medium">
            ✅ {learnedCount} kanji ditandai hafal
          </p>
          <p className="text-red-600 font-medium">
            ❌ {notLearnedCount} kanji belum ditandai hafal
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
          <Button
            onClick={() => navigate("/kanji")}
            variant="primary"
            size="md"
          >
            Kembali ke Kanji
          </Button>
        </div>
      </div>
    </div>
  );
}
