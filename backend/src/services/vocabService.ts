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

export async function getAllVocab(search?: string, level?: string) {
    const where: any = {};
  
    // ✅ filter level
    if (level) {
      where.level = level;
    }
  
    // ✅ search word, romaji, meaning, atau kanji
    if (search) {
      where[Op.or] = [
        { kana: { [Op.iLike]: `%${search}%` } },     // postgres iLike → case-insensitive
        { romaji: { [Op.iLike]: `%${search}%` } },
        { meaning: { [Op.iLike]: `%${search}%` } },
        { kanji: { [Op.iLike]: `%${search}%` } },
      ];
    }
  
    const vocab = await Vocab.findAll({
      attributes: ["id", "kana", "meaning", "example", "kanji", "romaji", "level"],
      where,
      order: [["id", "ASC"]],
    });
  
    return { vocab };
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
