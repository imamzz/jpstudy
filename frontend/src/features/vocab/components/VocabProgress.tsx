import { useVocab } from "../../../pages/user/vocab/store/vocabProvider";

export default function VocabProgress() {
  const { words } = useVocab();

  const total = words.length;
  const learned = words.filter((w) => w.status === "mastered").length;
  const percent = total > 0 ? Math.round((learned / total) * 100) : 0;

  return (
    <div className="w-full p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">Progres Kosakata</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 bg-green-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {learned} dari {total} kata ({percent}%)
      </p>
    </div>
  );
}
