import KanjiTable from "@/features/user/kanji/components/KanjiTable";

export default function KanjiPage() {
  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-red-700 mb-4">🈶 Daftar Kanji</h1>

      {/* List */}
      <KanjiTable />

    </div>
  );
}
