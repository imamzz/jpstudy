import { Op } from "sequelize";
import Review from "../models/Review";
import Vocab from "../models/Vocab";
import Kanji from "../models/Kanji";
import Grammar from "../models/Grammar";
import { UserVocabProgress } from "../models";
import UserGrammarProgress from "../models/UserGrammarProgress";
import UserKanjiProgress from "../models/UserKanjiProgress";
import sequelize from "../config/database";

export async function createReview(data: any) {
  const existingReview = await Review.findOne({
    where: { item_id: data.item_id, item_type: data.item_type },
  });
  if (existingReview) {
    throw new Error("Review already exists");
  }
  const review = await Review.create(data);
  return {
    review: {
      id: review.id,
      item_id: review.item_id,
      item_type: review.item_type,
      first_review_date: review.first_review_date,
      last_review_date: review.last_review_date,
      attempt_count: review.attempt_count,
      correct: review.correct,
    },
  };
}

export async function updateReview(id: string, data: any) {
  const review = await Review.findByPk(id);
  if (!review) throw new Error("Review not found");

  await review.update(data);
  return review;
}

export async function getAllReview() {
  const review = await Review.findAll({
    attributes: [
      "id",
      "item_id",
      "item_type",
      "first_review_date",
      "last_review_date",
      "attempt_count",
      "correct",
    ],
    order: [["id", "ASC"]],
  });
  return {
    review: review,
  };
}

export async function getReviewById(id: string) {
  const review = await Review.findByPk(id, {
    attributes: [
      "id",
      "item_id",
      "item_type",
      "first_review_date",
      "last_review_date",
      "attempt_count",
      "correct",
    ],
    order: [["id", "ASC"]],
  });
  return {
    review: review,
  };
}
/**
 * Ambil item untuk direview berdasarkan aturan:
 * - attempt_count < 7 (belum kuat)
 * - terakhir direview minimal 1 hari lalu
 * - opsional filter item_type
 */
export async function reviewStudy(
  user_id: number,
  type?: string,
  limit?: number,
  days: number = 7
) {
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - days);

  // Filter utama
  const where: any = {
    user_id,
    attempt_count: { [Op.lt]: 7 },
    last_review_date: {
      [Op.between]: [startDate, now],
    },
  };

  if (type) where.item_type = type;

  // Tentukan relasi model sesuai tipe
  let includeModel: any;

  if (type === "vocab") {
    includeModel = {
      model: Vocab,
      as: "vocab",
      attributes: ["id", "kanji", "kana", "meaning", "level"],
    };
  } else if (type === "kanji") {
    includeModel = {
      model: Kanji,
      as: "kanji",
      attributes: ["id", "kanji", "meaning", "level"],
    };
  } else if (type === "grammar") {
    includeModel = {
      model: Grammar,
      as: "grammar",
      attributes: ["id", "pattern", "meaning", "level"],
    };
  } else {
    includeModel = [
      {
        model: Vocab,
        as: "vocab",
        attributes: ["id", "kanji", "kana", "meaning", "level"],
        required: false,
      },
      {
        model: Kanji,
        as: "kanji",
        attributes: ["id", "kanji", "meaning", "level"],
        required: false,
      },
      {
        model: Grammar,
        as: "grammar",
        attributes: ["id", "pattern", "meaning", "level"],
        required: false,
      },
    ];
  }

  // Ambil data review
  const reviews = await Review.findAll({
    where,
    include: includeModel,
    order: [
      ["attempt_count", "ASC"], // Prioritaskan item dengan sedikit review
      ["last_review_date", "ASC"], // Yang paling lama direview ditampilkan dulu
    ],
    limit,
  });

  // Hitung progress harian
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const total = reviews.length;
  const reviewedToday = reviews.filter(
    (r: any) =>
      r.last_review_date &&
      new Date(r.last_review_date) >= todayStart &&
      new Date(r.last_review_date) < todayEnd
  ).length;

  const progress = total > 0 ? (reviewedToday / total) * 100 : 0;

  return {
    data: reviews,
    meta: { total, reviewedToday, progress },
  };
}



export async function saveBatchReview(user_id: number, reviews: any[]) {
  const transaction = await sequelize.transaction();
  try {
    const results = [];

    for (const item of reviews) {
      const review = await Review.findOne({
        where: { id: item.id, user_id },
        transaction,
      });

      
      if (!review) {
        console.warn(`⚠️ Review id ${item.id} tidak ditemukan untuk user ${user_id}`);
        continue;
      }

      // 🔁 1️⃣ Update nilai review
      review.attempt_count += 1;
      review.last_review_date = new Date();
      review.correct = item.correct;

      await review.save({ transaction });

      // 🧩 2️⃣ Jika sudah mencapai 7x review → update progress item sesuai tipe
      if (review.attempt_count >= 7) {
        const masteredData = { status: "mastered", mastered_at: new Date() };

        if (review.item_type === "vocab") {
          await UserVocabProgress.update(masteredData, {
            where: { user_id, vocab_id: review.item_id },
            transaction,
          });
        } else if (review.item_type === "grammar") {
          await UserGrammarProgress.update(masteredData, {
            where: { user_id, grammar_id: review.item_id },
            transaction,
          });
        } else if (review.item_type === "kanji") {
          await UserKanjiProgress.update(masteredData, {
            where: { user_id, kanji_id: review.item_id },
            transaction,
          });
        }
      }

      results.push(review);
    }

    await transaction.commit();
    return results;
  } catch (error) {
    await transaction.rollback();
    console.error("❌ saveBatchReview failed:", error);
    throw error;
  }
}
