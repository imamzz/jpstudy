// src/pages/user/review/ReviewPage.tsx
import ReviewConfigForm from "@/features/user/review/components/ReviewConfigForm";

export default function ReviewPage() {

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-purple-700">🔄 Review Harian</h1>
      <p className="text-gray-600">
        Review otomatis menampilkan materi (Vocabulary, Grammar, Kanji) yang sudah{" "}
        <b>ditandai hafal</b> dalam 7 hari terakhir. Kamu bisa atur jumlah item
        & kategori yang ingin direview.
      </p>


      {/* Config Form */}
      <ReviewConfigForm />

    </div>
  );
}
