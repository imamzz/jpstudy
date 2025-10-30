import GrammarTable from "@/features/user/grammar/components/GrammarTable";
import GrammarProgressMastered from "@/features/user/grammar/components/GrammarProgressMastered";
import GrammarProgressDuration from "@/features/user/grammar/components/GrammarProgressDuration";

export default function GrammarPage() {
  return (
    <div className="w-full mx-auto ">
      <div className="grid grid-cols-2 gap-4">
        <GrammarProgressMastered />
        <GrammarProgressDuration />
      </div>
      <GrammarTable />
    </div>
  );
}
