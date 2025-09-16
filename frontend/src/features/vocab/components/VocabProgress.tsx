import { useAppSelector } from "@/app/hooks";

export default function VocabProgress() {
  const words = useAppSelector((state) => state.vocab.words);

  const mastered = words.filter((w) => w.status === "mastered").length;
  const learning = words.filter((w) => w.status === "learning").length;

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl shadow">
      <h2 className="font-bold text-blue-600 mb-2">📈 Progress Belajar</h2>
      <p className="text-gray-700">Kosakata dikuasai: {mastered}</p>
      <p className="text-gray-700">Sedang dipelajari: {learning}</p>
    </div>
  );
}
