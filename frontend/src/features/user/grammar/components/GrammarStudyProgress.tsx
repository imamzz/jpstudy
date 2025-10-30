interface GrammarStudyProgressProps {
  currentSet: number;
  totalSets: number;
  currentIndex: number;
  grammarPerSet: number;
  setProgress: number; // persen progress total set
  totalKataProgress: number; // persen progress kata per set
}

export default function GrammarStudyProgress({
  currentSet,
  totalSets,
  currentIndex,
  grammarPerSet,
  setProgress,
  totalKataProgress,
}: GrammarStudyProgressProps) {
  return (
    <div className="w-full space-y-4 max-w-6xl">
      {/* 🔹 Progress bar total */}
      <div>
        <p className="text-sm text-gray-600 mb-1">
          Set {currentSet}/{totalSets}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
           className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(setProgress, 100))}%` }}
          />
        </div>
      </div>

      {/* 🔹 Progress bar per set */}
      <div >
        <p className="text-sm text-gray-600 mb-1">
          Kata {(currentIndex % grammarPerSet) + 1}/{grammarPerSet}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(totalKataProgress, 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
