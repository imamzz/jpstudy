export interface GrammarPoint {
    id: number;
    level: string;
    pattern: string;
    meaning: string;
    example: string;
    status: "new" | "learning" | "mastered";
  }
  