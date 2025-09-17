// src/pages/user/review/ReviewPage.tsx
import { useAppSelector } from "@/app/hooks";
import ReviewConfigForm from "@/features/review/components/ReviewConfigForm";
import ReviewProgress from "@/features/review/components/ReviewProgress";
import ReviewList from "@/features/review/components/ReviewList";
import { selectRecentReviews } from "@/features/review/reviewSlice";

export default function ReviewPage() {
  // ✅ Ambil review terbaru dari slice (7 hari terakhir)
  const recentReviews = useAppSelector(selectRecentReviews);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-purple-700">🔄 Review Harian</h1>
      <p className="text-gray-600">
        Review otomatis menampilkan materi (Vocabulary, Grammar, Kanji) yang sudah{" "}
        <b>ditandai hafal</b> dalam 7 hari terakhir. Kamu bisa atur jumlah item
        & kategori yang ingin direview.
      </p>

      {/* Progress */}
      <ReviewProgress items={recentReviews} />

      {/* Config Form */}
      <ReviewConfigForm />

      {/* List item untuk direview */}
      <ReviewList items={recentReviews} />
    </div>
  );
}
