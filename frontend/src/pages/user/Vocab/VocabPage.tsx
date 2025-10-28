import VocabProgressDuration from "@/features/user/vocab/components/VocabProgressDuration";
import VocabProgressMastered from "@/features/user/vocab/components/VocabProgressMastered";
import VocabTable from "@/features/user/vocab/components/VocabTable";

export default function VocabPage() {
  return (
    <div className="space-y-6">
      <div className="grid-cols-2 grid gap-8">
        <VocabProgressDuration />
        <VocabProgressMastered />
      </div>
      <VocabTable />
    </div>
  );
}
