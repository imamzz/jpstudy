import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { markAsLearned, markAsLearning } from "@/features/vocab/vocabSlice";      

export default function VocabPage() {
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.vocab.words);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Kosakata</h1>
      <ul>
        {words.map((w) => (
          <li key={w.id} className="mb-2">
            {w.kanji} ({w.arti}) - <span className="italic">{w.status}</span>
            <button
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
              onClick={() => dispatch(markAsLearning(w.id))}
            >
              Mulai Belajar
            </button>
            <button
              className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
              onClick={() => dispatch(markAsLearned(w.id))}
            >
              Tandai Selesai
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
