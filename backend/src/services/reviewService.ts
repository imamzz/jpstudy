import { Op } from "sequelize";
import { 
  Vocab,
  Grammar,
  Kanji,
  Review,
  UserProgressVocab,
  UserProgressKanji,
  UserProgressGrammar,
} from "../models";
import sequelize from "../config/database";
import { AuthRequest } from "../middleware/authMiddleware";

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

export async function getAllReview(req: AuthRequest, search?: string, page = 1, pageSize = 10) {
  const userId = req.user.id;
  const where: any = { user_id: userId };

  // 🔍 Filter pencarian
  if (search && search.trim()) {
    const q = `%${search.trim()}%`;
    where[Op.or] = [
      { item_type: { [Op.iLike]: q } },
      { "$vocab.kanji$": { [Op.iLike]: q } },
      { "$vocab.kana$": { [Op.iLike]: q } },
      { "$vocab.meaning$": { [Op.iLike]: q } },
      { "$grammar.pattern$": { [Op.iLike]: q } },
      { "$grammar.meaning$": { [Op.iLike]: q } },
      { "$kanji.kanji$": { [Op.iLike]: q } },
      { "$kanji.meaning$": { [Op.iLike]: q } },
    ];
  }

  const offset = (page - 1) * pageSize;

  // 🧩 Join progress untuk ambil status
  const include = [
    {
      model: Vocab,
      as: "vocab",
      attributes: ["id", "kanji", "kana", "romaji", "meaning", "level"],
      required: false,
      include: [
        {
          model: UserProgressVocab,
          as: "progressList",
          where: { user_id: userId },
          attributes: ["status", "mastered_at"],
          required: false,
        },
      ],
    },
    {
      model: Grammar,
      as: "grammar",
      attributes: ["id", "pattern", "meaning", "level"],
      required: false,
      include: [
        {
          model: UserProgressGrammar,
          as: "progressList",
          where: { user_id: userId },
          attributes: ["status", "mastered_at"],
          required: false,
        },
      ],
    },
    {
      model: Kanji,
      as: "kanji",
      attributes: ["id", "kanji", "meaning", "level"],
      required: false,
      include: [
        {
          model: UserProgressKanji,
          as: "progressList",
          where: { user_id: userId },
          attributes: ["status", "mastered_at"],
          required: false,
        },
      ],
    },
  ];

  // 🧠 Ambil data
  const { rows, count } = await Review.findAndCountAll({
    where,
    include,
    distinct: true,
    limit: pageSize,
    offset,
    order: [["id", "ASC"]],
  });

  // 🧾 Mapping hasil
  const data = rows.map((r: any) => {
    let detail: any = null;
    let status: string | null = null;
    let mastered_at: string | null = null;

    if (r.item_type === "vocab") {
      detail = r.vocab;
      status = r.vocab?.progressList?.[0]?.status ?? null;
      mastered_at = r.vocab?.progressList?.[0]?.mastered_at ?? null;
    } else if (r.item_type === "grammar") {
      detail = r.grammar;
      status = r.grammar?.progressList?.[0]?.status ?? null;
      mastered_at = r.grammar?.progressList?.[0]?.mastered_at ?? null;
    } else if (r.item_type === "kanji") {
      detail = r.kanji;
      status = r.kanji?.progressList?.[0]?.status ?? null;
      mastered_at = r.kanji?.progressList?.[0]?.mastered_at ?? null;
    }

    // Hapus progressList sebelum dikirim ke frontend
    if (detail && detail.dataValues?.progressList) {
      delete detail.dataValues.progressList;
    }

    return {
      id: r.id,
      item_type: r.item_type,
      item_id: r.item_id,
      first_review_date: r.first_review_date,
      last_review_date: r.last_review_date,
      attempt_count: r.attempt_count,
      correct: r.correct,
      status, // ✅ status progress user
      mastered_at,
      item_detail: detail,
    };
  });

  return {
    data,
    meta: {
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
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
  return review;
}
/**
 * Ambil item untuk direview berdasarkan aturan:
 * - attempt_count < 7 (belum kuat)
 * - terakhir direview minimal 1 hari lalu
 * - opsional filter item_type
 */
export async function reviewStudy(user_id: number, type?: string, days: number = 7) {
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
          await UserProgressVocab.update(masteredData, {
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
