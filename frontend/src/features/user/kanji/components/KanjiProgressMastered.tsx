import { useEffect, useState } from "react";
import ChartBase from "@/components/molecules/ChartBase";
import { fetchKanjiMasteredProgress } from "@/features/user/kanji/kanjiProgressMasteredSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getXLabel } from "@/utils/dateLabel";
import { chartThemes } from "../../settings/chartTheme";

const FILTERS = [
  { key: "week", label: "Minggu" },
  { key: "month", label: "Bulan" },
  { key: "year", label: "Tahun" },
] as const;

const KanjiProgressMastered = () => {
  const theme = chartThemes.kanji;
  const [range, setRange] = useState<"week" | "month" | "year">("week");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchKanjiMasteredProgress(range));
  }, [dispatch, range]);

  const { progress, loading } = useAppSelector((state) => state.kanjiProgressMastered);

  // Gunakan jumlah kata dipelajari (learned_count)
  const chartData = progress.map((p) => ({
    x: getXLabel(p.date, range),
    y: p.learned_count,
  }));

  return (
    <div className={`col-span-1 bg-blue-50 rounded-xl p-4 shadow-sm ${theme.bg}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Kata Dipelajari
        </h2>

        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setRange(f.key)}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                range === f.key
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
        ) : chartData.length ? (
          <ChartBase
            data={chartData}
            color={theme.color2}
            height={300}
            yLabel="Kata"
            type="bar"
          />
        ) : (
          <div className="text-gray-400 text-sm">Tidak ada data</div>
        )}
      </div>
    </div>
  );
};

export default KanjiProgressMastered;
