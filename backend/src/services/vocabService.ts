import { Op } from "sequelize";
import { UserVocabProgress, Vocab } from "../models";
import { AuthRequest } from "../middleware/authMiddleware";
import sequelize from "../config/database";

export async function createVocab(data: any) {
    const existingVocab = await Vocab.findOne({ where: { kana: data.kana } });
    if (existingVocab) {
        throw new Error("Vocab already exists");
    }
    const vocab = await Vocab.create(data);
    return {
        vocab: { id: vocab.id, word: vocab.kana, meaning: vocab.meaning, example: vocab.example, kanji: vocab.kanji, romaji: vocab.romaji, level: vocab.level },
    };
}

export async function updateVocab(id: string, data: any) {
    const vocab = await Vocab.findByPk(id);
    if (!vocab) throw new Error("Vocab not found");

    await vocab.update(data);
    return vocab;
}

export async function getAllVocab(req: AuthRequest, search?: string, level?: string, page = 1, pageSize = 10) {
  const where: any = {};

  if (level) where.level = level;
  if (search) {
    where[Op.or] = [
      { kana: { [Op.iLike]: `%${search}%` } },
      { romaji: { [Op.iLike]: `%${search}%` } },
      { meaning: { [Op.iLike]: `%${search}%` } },
      { kanji: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const offset = (page - 1) * pageSize;

  const { rows, count } = await Vocab.findAndCountAll({
    attributes: ["id", "kana", "meaning", "example", "kanji", "romaji", "level"],
    where: {
      ...where,
      id: {
        // ❌ Exclude vocab_id yang sudah ada di user_vocab_progress user ini
        [Op.notIn]: sequelize.literal(`(
          SELECT vocab_id FROM user_vocab_progress WHERE user_id = ${req.user.id}
        )`),
      },
    },
    limit: pageSize,
    offset,
    order: [["id", "ASC"]],
  });

  return {
    data: rows,
    meta: {
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
  };
}

export async function getVocabById(id: string) {
    const vocab = await Vocab.findByPk(id, { attributes: ["id", "kana", "meaning", "example", "kanji", "romaji", "level"], order: [["id", "ASC"]] });
    return {
        vocab: vocab,
    };
}

export async function getVocabByLevel(level: string) {
    const vocab = await Vocab.findAll({ where: { level }, attributes: ["id", "kana", "meaning", "example", "kanji", "romaji", "level"], order: [["id", "ASC"]] });
    return {
        vocab: vocab,
    };
}

export async function deleteVocab(id: string) {
    const vocab = await Vocab.findByPk(id);
    if (!vocab) throw new Error("Vocab not found");

    await vocab.destroy();
    return vocab;
}

export async function getVocabForLearning(user_id: number, limit = 10, level?: string) {
  // 1️⃣ Ambil semua vocab yang sedang dipelajari (status = learned)
  const learned = await UserVocabProgress.findAll({
    where: { user_id, status: "learned" },
    include: [{ model: Vocab, as: "progressVocab" }],
    order: [["last_studied", "ASC"]],
  });

  const learnedIds = learned.map((p) => p.vocab_id);

  // 2️⃣ Ambil semua vocab yang sudah mastered → akan dikecualikan
  const mastered = await UserVocabProgress.findAll({
    where: { user_id, status: "mastered" },
    attributes: ["vocab_id"],
  });

  const masteredIds = mastered.map((m) => m.vocab_id);

  // 3️⃣ Ambil vocab baru dari tabel vocab
  const newVocab = await Vocab.findAll({
    where: {
      ...(level && { level }),
      id: {
        [Op.notIn]: [...learnedIds, ...masteredIds], // ❌ exclude mastered + learned
      },
    },
    order: [["id", "ASC"]],
    limit: Math.max(limit - learned.length, 0),
  });

  // 4️⃣ Gabungkan hasil
  const result = [
    ...learned.map((p) => ({
      ...p.progressVocab.get(),
      status: p.status,
    })),
    ...newVocab.map((v) => ({
      ...v.get(),
      status: null,
    })),
  ];

  return result;
}
