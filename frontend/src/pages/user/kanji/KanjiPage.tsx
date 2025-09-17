import KanjiList from "@/features/kanji/components/KanjiList";
import KanjiProgress from "@/features/kanji/components/KanjiProgress";
import { useNavigate } from "react-router-dom";

export default function KanjiPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-red-700">🈶 Daftar Kanji</h1>

      {/* Progress */}
      <KanjiProgress />

      {/* Tombol Aksi */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/kanji/study")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          📖 Mulai Belajar Kanji
        </button>
        <button
          onClick={() => navigate("/kanji/exercise")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          📝 Latihan Kanji
        </button>
      </div>

      {/* List Kanji */}
      <KanjiList />
    </div>
  );
}
