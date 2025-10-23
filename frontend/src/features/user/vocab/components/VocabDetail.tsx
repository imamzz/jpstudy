import { useAppSelector } from "@/app/hooks";

export default function VocabDetail({ wordId }: { wordId: number }) {
  const word = useAppSelector((state) =>
    state.vocab.words.find((w) => w.id === wordId)
  );

  if (!word) return <p className="text-gray-500">❌ Kosakata tidak ditemukan.</p>;

  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold text-blue-600 mb-2">{word.kanji}</h2>
      <p className="text-lg">{word.kana} ({word.romaji})</p>
      <p className="italic text-gray-600">{word.arti}</p>
      <p className="mt-2 text-sm">
        Status: <span className="font-semibold">{word.status}</span>
      </p>
    </div>
  );
}
