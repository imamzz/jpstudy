import VocabTable from "@/features/admin/vocab/components/vocabTable";

export default function VocabPage() {
  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold text-blue-600">📚 Kosakata</h1>

      <VocabTable />
    </div>
  );
}
