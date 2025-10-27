import ReviewTable from "@/features/user/review/components/ReviewTable";

export default function ReviewPage() {

  return (
    <div className=" mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-purple-700">🔄 Review Harian</h1>
      <p className="text-gray-600">
        Review otomatis menampilkan materi (Vocabulary, Grammar, Kanji) yang sudah{" "}
        <b>ditandai hafal</b> dalam 7 hari terakhir. Kamu bisa atur jumlah item
        & kategori yang ingin direview.
      </p>

      <ReviewTable />

    </div>
  );
}
