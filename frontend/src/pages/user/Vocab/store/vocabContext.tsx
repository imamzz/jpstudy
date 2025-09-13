// src/pages/user/vocab/store/vocabContext.tsx
import { createContext, useContext, useState } from "react";

type WordStatus = "new" | "learning" | "mastered";

interface Word {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  arti: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  status: WordStatus;
}

interface VocabContextType {
  words: Word[];
  setWords: React.Dispatch<React.SetStateAction<Word[]>>;
  markAsLearned: (id: number) => void;
}

const VocabContext = createContext<VocabContextType | undefined>(undefined);

export const VocabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [words, setWords] = useState<Word[]>([
    { id: 1, kanji: "猫", kana: "ねこ", romaji: "neko", arti: "kucing", level: "N5", status: "new" },
    { id: 2, kanji: "水", kana: "みず", romaji: "mizu", arti: "air", level: "N5", status: "new" },
    { id: 3, kanji: "学校", kana: "がっこう", romaji: "gakkou", arti: "sekolah", level: "N4", status: "new" },
    { id: 4, kanji: "経済", kana: "けいざい", romaji: "keizai", arti: "ekonomi", level: "N3", status: "new" },
    { id: 5, kanji: "議論", kana: "ぎろん", romaji: "giron", arti: "diskusi", level: "N2", status: "new" },
    { id: 6, kanji: "憲法", kana: "けんぽう", romaji: "kenpou", arti: "konstitusi", level: "N1", status: "new" },
  ]);

  const markAsLearned = (id: number) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "mastered" } : w))
    );
  };

  return (
    <VocabContext.Provider value={{ words, setWords, markAsLearned }}>
      {children}
    </VocabContext.Provider>
  );
};

export const useVocab = () => {
  const ctx = useContext(VocabContext);
  if (!ctx) throw new Error("useVocab must be used inside VocabProvider");
  return ctx;
};
