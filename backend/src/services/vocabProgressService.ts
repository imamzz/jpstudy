import UserVocabProgress from "../models/UserVocabProgress";
import Review from "../models/Review";
import db from "../config/database"; // ✅ pastikan ini import instance Sequelize

export async function deleteVocabProgress(user_id: number, vocab_id: number) {
  const vocabProgress = await UserVocabProgress.destroy({ where: { user_id, vocab_id } });
  return vocabProgress;
}

export async function saveVocabProgress(
  user_id: number,
  vocab_id: number,
  status: "learned" | "review" | "mastered"
) {
  let progress = await UserVocabProgress.findOne({ where: { user_id, vocab_id } });

  if (progress) {
    progress.status = status;
    progress.last_studied = new Date();

    if (status === "mastered" && !progress.mastered_at) {
      progress.mastered_at = new Date();

      const existingReview = await Review.findOne({
        where: { user_id, item_type: "vocab", item_id: vocab_id },
      });

      if (!existingReview) {
        await Review.create({
          user_id,
          item_type: "vocab",
          item_id: vocab_id,
          review_date: new Date(),
          next_review: new Date(Date.now() + 24 * 60 * 60 * 1000),
          correct: true,
          ease_factor: 2.5,
          interval_days: 1,
          repetition_count: 1,
          attempt_count: 1,
        });
      }
    }

    await progress.save();
    return progress;
  }

  // jika belum ada progress → buat baru
  progress = await UserVocabProgress.create({
    user_id,
    vocab_id,
    status,
    last_studied: new Date(),
    times_reviewed: 1,
    mastered_at: status === "mastered" ? new Date() : null,
  });

  if (status === "mastered") {
    await Review.create({
      user_id,
      item_type: "vocab",
      item_id: vocab_id,
      review_date: new Date(),
      next_review: new Date(Date.now() + 24 * 60 * 60 * 1000),
      correct: true,
      ease_factor: 2.5,
      interval_days: 1,
      repetition_count: 1,
      attempt_count: 1,
    });
  }

  return progress;
}

// ✅ NEW: BULK SAVE FUNCTION
export async function saveBulkVocabProgress(
  user_id: number,
  items: { id: number; status: "learned" | "mastered" }[]
) {
  const transaction = await db.transaction();

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
