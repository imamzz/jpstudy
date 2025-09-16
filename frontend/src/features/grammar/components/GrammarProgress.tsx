import { useAppSelector } from "@/app/hooks";

export default function GrammarProgress() {
  const grammarPoints = useAppSelector((state) => state.grammar.points);

  const total = grammarPoints.length;
  const mastered = grammarPoints.filter((g) => g.status === "mastered").length;
  const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return (
    <div className="w-full p-4 border rounded-lg shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">Progres Grammar</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 bg-green-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {mastered} dari {total} grammar ({percent}%)
      </p>
    </div>
  );
}
