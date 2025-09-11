import Word from "../models/Word";

export async function getAllWords() {
  return await Word.findAll({ order: [["id", "ASC"]] });
}

export async function createWord(
  kanji: string,
  kana: string,
  romaji: string,
  meaning: string
) {
  return await Word.create({ kanji, kana, romaji, meaning });
}

export async function updateWord(
  id: string,
  kanji: string,
  kana: string,
  romaji: string,
  meaning: string
) {
  const word = await Word.findByPk(id);
  if (!word) throw new Error("Word not found");

  word.kanji = kanji;
  word.kana = kana;
  word.romaji = romaji;
  word.meaning = meaning;

  await word.save();
  return word;
}

export async function deleteWord(id: string) {
  const word = await Word.findByPk(id);
  if (!word) throw new Error("Word not found");

  await word.destroy();
  return word;
}
