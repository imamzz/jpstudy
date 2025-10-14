import UserVocabProgress from "../models/UserVocabProgress";
import Review from "../models/Review";
import sequelize from "../config/database";

export async function deleteVocabProgress(user_id: number, vocab_id: number) {
  const vocabProgress = await UserVocabProgress.destroy({ where: { user_id, vocab_id } });
  return vocabProgress;
}

export async function saveVocabProgress(
  user_id: number,
  vocab_id: number,
  status: "learned" | "review" | "mastered"
) {
  // 🔍 Cari progress existing
  let progress = await UserVocabProgress.findOne({ where: { user_id, vocab_id } });

  if (progress) {
    // update existing progress
    progress.status = status;
    progress.last_studied = new Date();

    if (status === "mastered" && !progress.mastered_at) {
      progress.mastered_at = new Date();
    }

    // pastikan ada entri review
    const existingReview = await Review.findOne({
      where: { user_id, item_type: "vocab", item_id: vocab_id },
    });

    // Jika belum ada review sama sekali → buat baru
    if (!existingReview) {
      await Review.create({
        user_id,
        item_type: "vocab",
        item_id: vocab_id,
        first_review_date: new Date(),
        last_review_date: null, // ⬅️ belum pernah direview
        correct: null,
        attempt_count: 0,       // ⬅️ belum ada review
      });
    }

    await progress.save();
    return progress;
  }

  // 🆕 Belum ada progress → buat baru
  progress = await UserVocabProgress.create({
    user_id,
    vocab_id,
    status,
    last_studied: new Date(),
    mastered_at: status === "mastered" ? new Date() : null,
  });

  // Buat entri di reviews agar siap untuk review berikutnya
  await Review.create({
    user_id,
    item_type: "vocab",
    item_id: vocab_id,
    first_review_date: new Date(),
    last_review_date: null, // ⬅️ belum direview
    correct: null,
    attempt_count: 0,
  });

  return progress;
}

/**
 * Simpan banyak vocab sekaligus (bulk)
 */
export async function saveBulkVocabProgress(
  user_id: number,
  items: { id: number; status: "learned" | "mastered" }[]
) {
  const transaction = await sequelize.transaction();

  try {
    const results = [];
    for (const item of items) {
      const progress = await saveVocabProgress(user_id, item.id, item.status);
      results.push(progress);
    }

    await transaction.commit();
    return results;
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Transaction rolled back:", error);
    throw error;
  }
}