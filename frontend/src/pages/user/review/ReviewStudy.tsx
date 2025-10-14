import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchReviewStudy,
  submitReviewBatch,
  addResult,
  markReviewed,
  clearReview,
} from "@/features/review/reviewSlice";
import StudyTimer from "@/features/grammar/components/StudyTimer";
import WordDisplay from "@/features/vocab/components/WordDisplay";
import Button from "@/components/atoms/Button";
import type { ReviewType } from "@/features/review/reviewSlice";

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

  // ✅ Default config jika tidak ada state dari navigate()
  const config: ReviewConfig = (location.state as ReviewConfig) || {
    itemsPerSet: 5,
    totalSets: 1,
    duration: 10,
    type: "vocab",
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [batchCount, setBatchCount] = useState<number>(0);

  const totalItems = items.length;
  const currentItem = items[currentIndex];

  // 🔹 Ambil data review di awal
  useEffect(() => {
    dispatch(fetchReviewStudy({ days: 7, type: config.type }));
  }, [dispatch, config.type]);

  // =============================
  // 🔹 Handle jawaban benar/salah
  // =============================
  const handleNext = (isCorrect: boolean) => {
    if (!currentItem) return;

    // 1️⃣ Tambahkan hasil ke Redux
    dispatch(
      addResult({
        id: currentItem.id,
        item_id: currentItem.item_id,
        type: currentItem.type,
        correct: isCorrect,
      })
    );

    // 2️⃣ Naikkan indeks dan batch count
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setBatchCount((prev) => prev + 1);

    // 3️⃣ Kirim batch setiap 5 hasil atau di akhir
    if ((batchCount + 1) % 5 === 0 || nextIndex === totalItems) {
      setTimeout(() => {
        dispatch(submitReviewBatch([...results]));
      }, 150);
      setBatchCount(0);
    }

    // 4️⃣ Jika sudah item terakhir → selesai
    if (nextIndex >= totalItems) {
      setFinished(true);
    }
  };

  const handleMarkReviewed = () => {
    if (currentItem) dispatch(markReviewed(currentItem.id));
    handleNext(true);
  };

  // =============================
  // 🔹 Selesai Review
  // =============================
  useEffect(() => {
    if (finished && !syncing) {
      // Setelah batch terakhir terkirim, reset & refetch untuk update dashboard
      setTimeout(() => {
        dispatch(clearReview());
        dispatch(fetchReviewStudy({ days: 7, type: config.type }));
      }, 800);
    }
  }, [finished, syncing, dispatch, config.type]);

  // =============================
  // 🔹 Kondisi tampilan
  // =============================
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!items.length) return <p>Tidak ada item untuk direview ✨</p>;

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-4">🎉 Review Selesai!</h2>
        <Button
          onClick={() => {
            navigate("/review");
          }}
        >
          Kembali
        </Button>
      </div>
    );
  }

  // =============================
  // 🔹 Tampilan utama
  // =============================
  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <StudyTimer
        key={currentIndex}
        paused={paused}
        duration={config.duration}
        onTimeUp={() => handleNext(true)}
      />

      {currentItem && (
        <WordDisplay
          kanji={currentItem.content}
          meaning={currentItem.meaning}
          kana=""
          romaji=""
        />
      )}

      <div className="flex gap-4 mt-4">
        <Button onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </Button>
        <Button onClick={() => handleNext(true)} variant="primary">
          Benar ✅
        </Button>
        <Button onClick={() => handleNext(false)} variant="danger">
          Salah ❌
        </Button>
      </div>
    </div>
  );
}
