// src/pages/user/vocab/components/WordDisplay.tsx
interface WordDisplayProps {
    kanji: string;
    kana: string;
    romaji: string;
    arti: string;
  }
  
  export default function WordDisplay({ kanji, kana, romaji, arti }: WordDisplayProps) {
    return (
      <div className="text-center space-y-2">
        <div className="text-5xl font-bold">{kanji}</div>
        <div className="text-2xl text-gray-600">{kana}</div>
        <div className="italic text-gray-500">{romaji}</div>
        <div className="text-lg text-green-600">{arti}</div>
      </div>
    );
  }
  