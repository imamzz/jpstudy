export interface KanjiWord {
    id: number;
    kanji: string;
    onyomi: string;
    kunyomi: string;
    meaning: string;
    example_words: string;
    level: string;
    status: "new" | "learning" | "mastered";
  }
  