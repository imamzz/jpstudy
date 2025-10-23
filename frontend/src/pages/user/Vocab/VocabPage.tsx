// import VocabList from "@/features/vocab/components/VocabList";
import VocabProgress from "@/features/user/vocab/components/VocabProgress";
import VocabTable from "@/features/user/vocab/components/VocabTable";
// import VocabConfigForm from "@/features/vocab/components/VocabConfigForm";

export default function VocabPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">📚 Kosakata</h1>

      <VocabProgress />
      {/* <VocabConfigForm /> */}
      {/* <VocabList /> */}
      <VocabTable />
    </div>
  );
}
