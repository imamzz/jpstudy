import Kanji from "../models/Kanji";

export async function createKanji(data: any) {
  const existingKanji = await Kanji.findOne({ where: { kanji: data.kanji } });
  if (existingKanji) {
    throw new Error("Kanji already exists");    
  }
  const kanji = await Kanji.create(data);
  return {
    kanji: { id: kanji.id, kanji: kanji.kanji, meaning: kanji.meaning, level: kanji.level, example_words: kanji.example_words, word: kanji.word, romaji: kanji.romaji },
  };
}

export async function updateKanji(id: string, data: any) {
  const kanji = await Kanji.findByPk(id);
  if (!kanji) throw new Error("Kanji tidak ditemukan");

  await kanji.update(data);
  return kanji;
}

export async function getAllKanji() {
  const kanji = await Kanji.findAll({ attributes: ["id", "kanji", "meaning", "level", "example_words", "word", "romaji"], order: [["id", "ASC"]] });
  return {
    kanji: kanji,
  };
}

export async function getKanjiById(id: string) {
  const kanji = await Kanji.findByPk(id, { attributes: ["id", "kanji", "meaning", "level", "example_words", "word", "romaji"], order: [["id", "ASC"]] });
  return {
    kanji: kanji,
  };
}

export async function getKanjiByLevel(level: string) {
  const kanji = await Kanji.findAll({ where: { level }, attributes: ["id", "kanji", "meaning", "level", "example_words", "word", "romaji"], order: [["id", "ASC"]] });
  return {
    kanji: kanji,
  };
}

export async function deleteKanji(id: string) {
  const kanji = await Kanji.findByPk(id);
  if (!kanji) throw new Error("Kanji not found");

  await kanji.destroy();
  return kanji;
}