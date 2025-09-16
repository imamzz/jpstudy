import { useAppSelector } from "@/app/hooks";

export default function VocabList() {
  const words = useAppSelector((state) => state.vocab.words);

  if (!words.length) {
    return <p className="text-gray-500">📭 Belum ada kosakata.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {words.map((w) => (
        <li
          key={w.id}
          className="p-3 border rounded-xl shadow hover:shadow-md transition bg-white"
        >
          <p className="font-bold text-lg">{w.kanji}</p>
          <p className="text-gray-600">{w.kana} ({w.romaji})</p>
          <p className="text-sm text-gray-500 italic">{w.arti}</p>
          <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
            {w.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
