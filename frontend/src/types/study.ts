// src/types/study.ts
export type LevelVariant = "All" | "N5" | "N4" | "N3" | "N2" | "N1";

export interface StudyConfig {
  wordsPerSet: number;
  totalSets: number;
  duration: number; 
  breakDuration: number;
  level: LevelVariant;
}
