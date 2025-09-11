import Vocab from "../models/Vocab";

export async function createVocab(data: any) {
    const existingVocab = await Vocab.findOne({ where: { word: data.word } });
    if (existingVocab) {
        throw new Error("Vocab already exists");
    }
    const vocab = await Vocab.create(data);
    return {
        vocab: { id: vocab.id, word: vocab.word, meaning: vocab.meaning, example: vocab.example, kanji: vocab.kanji, romaji: vocab.romaji, level: vocab.level },
    };
}

export async function updateVocab(id: string, data: any) {
    const vocab = await Vocab.findByPk(id);
    if (!vocab) throw new Error("Vocab not found");

    await vocab.update(data);
    return vocab;
}

export async function getAllVocab() {
    const vocab = await Vocab.findAll({ attributes: ["id", "word", "meaning", "example", "kanji", "romaji", "level"], order: [["id", "ASC"]] });
    return {
        vocab: vocab,
    };
}

export async function getVocabById(id: string) {
    const vocab = await Vocab.findByPk(id, { attributes: ["id", "word", "meaning", "example", "kanji", "romaji", "level"], order: [["id", "ASC"]] });
    return {
        vocab: vocab,
    };
}

export async function getVocabByLevel(level: string) {
    const vocab = await Vocab.findAll({ where: { level }, attributes: ["id", "word", "meaning", "example", "kanji", "romaji", "level"], order: [["id", "ASC"]] });
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
