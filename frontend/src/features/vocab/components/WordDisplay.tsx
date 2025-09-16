interface WordDisplayProps {
  kanji: string;
  kana: string;
  romaji: string;
  arti: string;
}

export default function WordDisplay({ kanji, kana, romaji, arti }: WordDisplayProps) {
  return (
    <div className="text-center space-y-3">
      <h2 className="text-4xl font-bold text-gray-800">{kanji}</h2>
      <p className="text-2xl text-gray-600">{kana}</p>
      <p className="text-lg text-gray-500 italic">{romaji}</p>
      <p className="text-xl text-green-600 font-medium">{arti}</p>
    </div>
  );
}
