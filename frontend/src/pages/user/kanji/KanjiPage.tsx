import KanjiTable from "@/features/user/kanji/components/KanjiTable";
import KanjiProgressMastered from "@/features/user/kanji/components/KanjiProgressMastered";
import KanjiProgressDuration from "@/features/user/kanji/components/KanjiProgressDuration";

export default function KanjiPage() {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <KanjiProgressMastered />
        <KanjiProgressDuration />
      </div>
      <KanjiTable />

    </div>
  );
}
