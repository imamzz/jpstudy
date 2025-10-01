import audio from "@/assets/icon/volume-high.png";

interface WordDisplayProps {
  kanji: string;
  kana: string;
  romaji: string;
  arti: string;
}

export default function WordDisplay({ kanji, kana, romaji, arti }: WordDisplayProps) {
  return (
    <div className=" w-[450px] flex flex-col items-end p-3 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-15">
        <input className="mark-as-learned w-4 h-4" type="checkbox" />
      </div>
      <div className="flex flex-col items-center gap-4 align-self-stretch w-full">
        <h2 className="text-13xl font-bold text-gray-600">{kana}</h2>
        <div className="audio">
          <img src={audio} alt="audio" />
        </div>
        <div className="flex flex-col items-center gap-1 align-self-stretch">
          <div className="flex justify-center items-center gap-1 align-self-stretch">
            <p className="text-center text-gray-500">{kanji}</p>
            <p className="text-center text-gray-500">({romaji})</p>
          </div>
          <p className="definition text-md text-center">{arti}</p>
        </div>
      </div>
    </div>
  );
}
