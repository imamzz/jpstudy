// src/pages/user/vocab/components/VocabTable.tsx
import { useVocab } from "../store/vocabContext";

export default function VocabTable() {
  const { words, markAsLearned } = useVocab();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-gray-200 text-gray-800";
      case "learning":
        return "bg-yellow-200 text-yellow-800";
      case "mastered":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (words.length === 0) {
    return <p className="text-gray-500">Belum ada kosakata.</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Kanji</th>
            <th className="border px-3 py-2 text-left">Kana</th>
            <th className="border px-3 py-2 text-left">Romaji</th>
            <th className="border px-3 py-2 text-left">Arti</th>
            <th className="border px-3 py-2 text-left">Status</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 font-medium">{word.kanji}</td>
              <td className="border px-3 py-2">{word.kana}</td>
              <td className="border px-3 py-2 italic text-gray-600">
                {word.romaji}
              </td>
              <td className="border px-3 py-2">{word.arti}</td>
              <td className="border px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    word.status
                  )}`}
                >
                  {word.status}
                </span>
              </td>
              <td className="border px-3 py-2 text-center">
                {word.status !== "mastered" && (
                  <button
                    onClick={() => markAsLearned(word.id)}
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Tandai Hafal
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
