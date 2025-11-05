interface StudyProgressProps {
  currentSet: number;
  totalSets: number;
  currentIndex: number;
  itemsPerSet: number;
  setProgress: number; // persen progress total set
  totalItemsProgress: number; // persen progress kata per set
}

export default function StudyProgress({
  currentSet,
  totalSets,
  currentIndex,
  itemsPerSet,
  setProgress,
  totalItemsProgress,
}: StudyProgressProps) {
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
          Kata {(currentIndex % itemsPerSet) + 1}/{itemsPerSet}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(totalItemsProgress, 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
