// src/utils/vocabHelpers.ts

/**
 * Mengacak elemen array menggunakan algoritma Fisher-Yates shuffle.
 * Tidak mengubah array asli, tetapi mengembalikan array baru.
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  