export interface VocabWord {
    id: number;
    kanji: string;
    kana: string;
    romaji: string;
    meaning: string;
    level: string;
    status: "new" | "learning" | "mastered";
  }
  