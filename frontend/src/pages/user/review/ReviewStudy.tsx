import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchReviewStudy,
  submitReviewBatch,
  addResult,
  clearReview,
} from "@/features/user/review/reviewSlice";
import WordDisplay from "@/features/user/vocab/components/WordDisplay";
import Button from "@/components/atoms/Button";
import type { ReviewType } from "@/features/user/review/reviewSlice";
import ReviewStudyProgress from "@/features/user/review/components/ReviewStudyProgress";
import ReviewStudyControls from "../../../features/user/review/components/ReviewStudyControls";

interface ReviewConfig {
  itemsPerSet: number;
  totalSets: number;
  duration: number;
  type: ReviewType;
}

export default function ReviewStudy() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { items, loading, error, results, syncing } = useAppSelector(
    (state) => state.review
  );

  // 🔹 Konfigurasi default jika tidak dikirim lewat navigate()
  const config: ReviewConfig = (location.state as ReviewConfig) || {
    itemsPerSet: 5,
    totalSets: 1,
    duration: 10,
    type: "vocab",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [finished, setFinished] = useState(false);

  const totalItems = items.length;
  const currentItem = items[currentIndex];
  const totalItemsProgress = ((currentIndex + 1) / totalItems) * 100;

  // ====================================================
  // 🔹 Fetch data awal
  // ====================================================
  useEffect(() => {
    dispatch(fetchReviewStudy({ days: 7, type: config.type }));
  }, [dispatch, config.type]);

  // ====================================================
  // 🔹 Kirim jawaban (Tahu / Skip)
  // ====================================================
  const handleAnswer = (isCorrect: boolean) => {
    if (!currentItem) return;

    // Simpan hasil ke Redux
    dispatch(
      addResult({
        id: currentItem.id,
        item_id: currentItem.item_id,
        type: currentItem.type,
        correct: isCorrect,
      })
    );

    // Siapkan hasil baru untuk batch
    const nextIndex = currentIndex + 1;
    const updatedResults = [
      ...results,
      {
        id: currentItem.id,
        item_id: currentItem.item_id,
        type: currentItem.type,
        correct: isCorrect,
        reviewedAt: new Date().toISOString(),
      },
    ];

    // Flip balik dan lanjut ke kartu berikut
    setIsFlipped(false);

    if (nextIndex < totalItems) {
      setCurrentIndex(nextIndex);
    } else {
      // jika kartu terakhir, kirim batch ke backend
      setFinished(true);
      dispatch(submitReviewBatch(updatedResults));
    }
  };

  // ====================================================
  // 🔹 Reset state setelah selesai
  // ====================================================
  useEffect(() => {
    if (finished && !syncing) {
      setTimeout(() => {
        dispatch(clearReview());
        navigate("/review");
      }, 1000);
    }
  }, [finished, syncing, dispatch, navigate]);

  // ====================================================
  // 🔹 Kondisi tampilan
  // ====================================================
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!items.length) return <p>Tidak ada item untuk direview ✨</p>;

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-4">🎉 Review Selesai!</h2>
        <Button onClick={() => navigate("/review")}>Kembali</Button>
      </div>
    );
  }

  // ====================================================
  // 🔹 Tampilan utama (Flashcard)
  // ====================================================
  return (
    <div className="py-12 flex flex-col items-center space-y-6 w-full mx-auto min-h-[calc(100vh)] max-h-[calc(100vh)] justify-between">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium text-gray-700">Review Study</p>
        </div>
        {/* Progress */}
        <ReviewStudyProgress
          currentIndex={currentIndex}
          totalItems={totalItems}
          totalItemsProgress={totalItemsProgress}
        />
      </div>

      {/* Kartu */}
      <div className="w-full max-w-md h-64 [perspective:1000px]">
        <div
          className={`relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] hover:scale-[1.02] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Sisi Depan */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-white shadow-lg rounded-2xl p-6 [backface-visibility:hidden]"
            onClick={() => setIsFlipped(true)}
          >
            <WordDisplay
              kanji={currentItem.content}
              meaning=""
              kana=""
              romaji=""
            />
          </div>

          {/* Sisi Belakang */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <p className="text-xl text-gray-800 mb-4">{currentItem.meaning}</p>
          </div>
        </div>
      </div>

      {!isFlipped && (
        <p className="text-gray-400 mt-4">Klik kartu untuk melihat jawaban</p>
      )}
      <ReviewStudyControls onAnswer={handleAnswer} />
    </div>
  );
}
