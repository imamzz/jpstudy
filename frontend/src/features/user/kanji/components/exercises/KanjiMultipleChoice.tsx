interface KanjiMultipleChoiceProps {
    question: string;
    options: string[];
    answer: string;
    onAnswer: (correct: boolean) => void;
  }
  
  export default function KanjiMultipleChoice({
    question,
    options,
    answer,
    onAnswer,
  }: KanjiMultipleChoiceProps) {
    const handleClick = (opt: string) => {
      onAnswer(opt === answer);
    };
  
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium">{question}</p>
        <div className="grid grid-cols-1 gap-2">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(opt)}
              className="px-4 py-2 border rounded-lg hover:bg-blue-50"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }
  