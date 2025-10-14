interface ReviewStudyProgressProps {
  currentIndex: number;
  totalItems: number;
  totalItemsProgress: number;   
}

export default function ReviewStudyProgress({
  currentIndex,
  totalItems,
  totalItemsProgress,
}: ReviewStudyProgressProps) {
  return (
    <div className="w-full space-y-4 max-w-6xl">
      <div>
        <p className="text-sm text-gray-600 mb-1">
          Kata {(currentIndex + 1)}/{totalItems}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${totalItemsProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
