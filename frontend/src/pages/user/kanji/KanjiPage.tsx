import KanjiTable from "@/features/user/kanji/components/KanjiTable";
import KanjiProgressMastered from "@/features/user/kanji/components/KanjiProgressMastered";
import KanjiProgressDuration from "@/features/user/kanji/components/KanjiProgressDuration";

export default function KanjiPage() {
  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-red-700 mb-4">🈶 Daftar Kanji</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KanjiProgressMastered />
        <KanjiProgressDuration />
      </div>
      {/* List */}
      <KanjiTable />

    </div>
  );
}
