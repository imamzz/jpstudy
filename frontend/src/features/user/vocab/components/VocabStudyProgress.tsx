interface VocabStudyProgressProps {
  currentSet: number;
  totalSets: number;
  currentIndex: number;
  wordsPerSet: number;
  setProgress: number; // persen progress total set
  totalKataProgress: number; // persen progress kata per set
}

export default function VocabStudyProgress({
  currentSet,
  totalSets,
  currentIndex,
  wordsPerSet,
  setProgress,
  totalKataProgress,
}: VocabStudyProgressProps) {
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
            style={{ width: `${setProgress}%` }}
          />
        </div>
      </div>

      {/* 🔹 Progress bar per set */}
      <div>
        <p className="text-sm text-gray-600 mb-1">
          Kata {(currentIndex % wordsPerSet) + 1}/{wordsPerSet}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${totalKataProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
