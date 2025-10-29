import {
  Vocab,
  Grammar,
  Kanji,
  UserProgressVocab,
  UserProgressGrammar,
  UserProgressKanji,
} from "../models";

export async function getProgressSummary(user_id: number, level: string) {
  // === Hitung total item per kategori ===
  const [totalVocab, totalGrammar, totalKanji] = await Promise.all([
    Vocab.count({ where: { level } }),
    Grammar.count({ where: { level } }),
    Kanji.count({ where: { level } }),
  ]);

  // === Hitung mastered per kategori (dengan join ke model item untuk filter level) ===
  const [totalMasteredVocab, totalMasteredGrammar, totalMasteredKanji] = await Promise.all([
    UserProgressVocab.count({
      where: { user_id, status: "mastered" },
      include: [
        {
          model: Vocab,
          as: "vocab",
          where: { level },
          attributes: [], // tidak perlu ambil kolom
        },
      ],
    }),
    UserProgressGrammar.count({
      where: { user_id, status: "mastered" },
      include: [
        {
          model: Grammar,
          as: "grammar",
          where: { level },
          attributes: [],
        },
      ],
    }),
    UserProgressKanji.count({
      where: { user_id, status: "mastered" },
      include: [
        {
          model: Kanji,
          as: "kanji",
          where: { level },
          attributes: [],
        },
      ],
    }),
  ]);

  // === Format data output ===
  return {
    user_id,
    level,
    vocab: { mastered: totalMasteredVocab, total: totalVocab },
    grammar: { mastered: totalMasteredGrammar, total: totalGrammar },
    kanji: { mastered: totalMasteredKanji, total: totalKanji },
  };
}
