import { useEffect, useState } from "react";
import ChartBase from "@/components/molecules/ChartBase";
import { fetchProgressSummary } from "@/features/user/home/progressSummarySlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { chartThemes } from "../../settings/chartTheme";

const LEVELS = [
  { key: "N1", label: "N1" },
  { key: "N2", label: "N2" },
  { key: "N3", label: "N3" },
  { key: "N4", label: "N4" },
  { key: "N5", label: "N5" },
] as const;

const ProgressCircle = () => {
  const theme = chartThemes.vocab;
  const [level, setLevel] = useState<"N1" | "N2" | "N3" | "N4" | "N5">("N1");

  const dispatch = useAppDispatch();
  const { progress, loading } = useAppSelector((state) => state.progressSummary);

  useEffect(() => {
    dispatch(fetchProgressSummary(level));
  }, [dispatch, level]);

  const chartData = progress
    ? [
        { x: "Vocab", y: progress.vocab.mastered, total: progress.vocab.total },
        { x: "Grammar", y: progress.grammar.mastered, total: progress.grammar.total },
        { x: "Kanji", y: progress.kanji.mastered, total: progress.kanji.total },
      ]
    : [];

  return (
    <div className={`col-span-1 bg-blue-50 rounded-xl p-4 shadow-sm ${theme.bg}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Progress Belajar
        </h2>

        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
          {LEVELS.map((f) => (
            <button
              key={f.key}
              onClick={() => setLevel(f.key)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                level === f.key
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-blue-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center w-full">
        {loading ? (
          <div className="text-gray-400 text-sm">Memuat data...</div>
        ) : progress ? (
          <ChartBase
            data={chartData}
            color={theme.color1}
            height={420}
            type="circle"
          />
        ) : (
          <div className="text-gray-400 text-sm">Tidak ada data</div>
        )}
      </div>
    </div>
  );
};

export default ProgressCircle;
