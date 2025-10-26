import { AuthRequest } from "../middleware/authMiddleware";
import Kanji from "../models/Kanji";
import { Op } from "sequelize";
import sequelize from "../config/database";

export async function createKanji(data: any) {
  const existingKanji = await Kanji.findOne({ where: { kanji: data.kanji } });
  if (existingKanji) {
    throw new Error("Kanji already exists");    
  }
  const kanji = await Kanji.create(data);
  return kanji;
}

export async function updateKanji(id: string, data: any) {
  const kanji = await Kanji.findByPk(id);
  if (!kanji) throw new Error("Kanji tidak ditemukan");

  await kanji.update(data);
  return kanji;
}

export async function getAllKanji(req: AuthRequest, search?: string, level?: string, page = 1, pageSize = 10) {
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

  const { rows, count } = await Kanji.findAndCountAll({
    attributes: ["id", "kanji", "meaning", "level", "example_words", "kana", "romaji", "onyomi", "kunyomi"],
    where: {
      ...where,
      id: {
        // ❌ Exclude kanji_id yang sudah ada di user_kanji_progress user ini
        [Op.notIn]: sequelize.literal(`(
          SELECT kanji_id FROM user_kanji_progress WHERE user_id = ${req.user.id}
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

export async function getKanjiById(id: string) {
  const kanji = await Kanji.findByPk(id, { attributes: ["id", "kanji", "meaning", "level", "example_words", "kana", "romaji"], order: [["id", "ASC"]] });
  return kanji;
}

export async function getKanjiByLevel(level: string) {
  const kanji = await Kanji.findAll({ where: { level }, attributes: ["id", "kanji", "meaning", "level", "example_words", "kana", "romaji"], order: [["id", "ASC"]] });
  return kanji;
}

export async function deleteKanji(id: string) {
  const kanji = await Kanji.findByPk(id);
  if (!kanji) throw new Error("Kanji not found");

  await kanji.destroy();
  return kanji;
}