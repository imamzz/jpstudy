interface KanjiTrueFalseProps {
    sentence: string;
    isCorrect: boolean;
    onAnswer: (correct: boolean) => void;
  }
  
  export default function KanjiTrueFalse({
    sentence,
    isCorrect,
    onAnswer,
  }: KanjiTrueFalseProps) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium">{sentence}</p>
        <div className="flex gap-4">
          <button
            onClick={() => onAnswer(true === isCorrect)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Benar
          </button>
          <button
            onClick={() => onAnswer(false === isCorrect)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Salah
          </button>
        </div>
      </div>
    );
  }
  