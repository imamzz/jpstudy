import {
  Vocab,
  Grammar,
  Kanji,
  UserProgressVocab,
  UserProgressGrammar,
  UserProgressKanji,
} from "../models";

export async function getProgressSummary(user_id: number) {
  const totalVocab = await Vocab.count({ where: { level: "N5" } });
  const totalMasteredVocab = await UserProgressVocab.count({
    where: { user_id, status: "mastered" },
  });

  const totalGrammar = await Grammar.count({ where: { level: "N5" } });
  const totalMasteredGrammar = await UserProgressGrammar.count({
    where: { user_id, status: "mastered" },
  });
  
  const totalKanji = await Kanji.count({ where: { level: "N5" } });
  const totalMasteredKanji = await UserProgressKanji.count({
    where: { user_id, status: "mastered" },
  });

  let data = {
    vocab: {
      mastered: totalMasteredVocab,
      total: totalVocab,
    },
    grammar: {
      mastered: totalMasteredGrammar,
      total: totalGrammar,
    },
    kanji: {
      mastered: totalMasteredKanji,
      total: totalKanji,
    },
  };
  return data;
}
