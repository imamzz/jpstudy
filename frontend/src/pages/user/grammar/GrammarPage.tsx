// import GrammarProgress from "@/features/user/grammar/components/GrammarProgress";
import GrammarTable from "@/features/user/grammar/components/GrammarTable";
import GrammarProgressMastered from "@/features/user/grammar/components/GrammarProgressMastered";
import GrammarProgressDuration from "@/features/user/grammar/components/GrammarProgressDuration";

export default function GrammarPage() {
  return (
    <div className="w-full mx-auto ">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📘 Daftar Grammar</h1>

      <div className="grid grid-cols-2 gap-4">
        <GrammarProgressMastered />
        <GrammarProgressDuration />
      </div>
      {/* List */}
      <GrammarTable />
    </div>
  );
}
