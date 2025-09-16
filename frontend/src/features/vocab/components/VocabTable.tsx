import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { markAsLearned } from "@/features/vocab/vocabSlice";

export default function VocabTable() {
  const words = useAppSelector((state) => state.vocab.words);
  const dispatch = useAppDispatch();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      case "learning":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "mastered":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  if (words.length === 0) {
    return <p className="text-gray-500">📭 Belum ada kosakata.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-xl shadow-md bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left text-gray-600">
            <th className="px-4 py-2">Kanji</th>
            <th className="px-4 py-2">Kana</th>
            <th className="px-4 py-2">Romaji</th>
            <th className="px-4 py-2">Arti</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {words.map((word) => (
            <tr key={word.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 font-medium text-lg">{word.kanji}</td>
              <td className="px-4 py-2">{word.kana}</td>
              <td className="px-4 py-2 italic text-gray-500">{word.romaji}</td>
              <td className="px-4 py-2">{word.arti}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    word.status
                  )}`}
                >
                  {word.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                {word.status !== "mastered" && (
                  <button
                    onClick={() => dispatch(markAsLearned(word.id))}
                    className="px-3 py-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm transition"
                  >
                    ✅ Tandai Hafal
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
