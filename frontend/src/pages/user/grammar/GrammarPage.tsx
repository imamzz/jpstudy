// import GrammarProgress from "@/features/user/grammar/components/GrammarProgress";
import GrammarTable from "@/features/user/grammar/components/GrammarTable";

export default function GrammarPage() {
  return (
    <div className="w-full mx-auto ">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📘 Daftar Grammar</h1>

      {/* Progress */}
      {/* <GrammarProgress /> */}

      {/* List */}
      <GrammarTable />
    </div>
  );
}
