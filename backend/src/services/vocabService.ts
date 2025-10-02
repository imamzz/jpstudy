import { Op } from "sequelize";
import Vocab from "../models/Vocab";

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

export async function getAllVocab(search?: string, level?: string, page = 1, pageSize = 10) {
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
    where,
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
