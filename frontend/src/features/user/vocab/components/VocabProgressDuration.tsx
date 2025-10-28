import { useEffect, useState } from "react";
import ChartBase from "@/components/molecules/ChartBase";
import { fetchVocabDurationProgress } from "@/features/user/vocab/vocabProgressDurationSlice";
import { useAppDispatch } from "@/app/hooks";
import { useAppSelector } from "@/app/hooks";
import { getXLabel } from "@/utils/dateLabel";

const FILTERS = [
  { key: "week", label: "Minggu" },
  { key: "month", label: "Bulan" },
  { key: "year", label: "Tahun" },
] as const;

const VocabProgressDuration = () => {
  const [range, setRange] = useState<"week" | "month" | "year">("week");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVocabDurationProgress(range));
  }, [dispatch, range]);

  
    const { progress, loading } = useAppSelector((state) => state.vocabProgressDuration);

    const maxDuration = Math.max(...progress.map((p) => p.duration_seconds), 0);
    const isHourScale = maxDuration >= 3600;

    const chartData = progress.map((p) => ({
      x: getXLabel(p.date, range),
      y: isHourScale
        ? Number((p.duration_seconds / 3600).toFixed(2))
        : Math.round(p.duration_seconds / 60),
    }));

  return (
    <div className="col-span-1 bg-blue-50 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Durasi Belajar Vocab
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
        ) : progress.length ? (
          <ChartBase
            data={chartData}
            color="#3b82f6"
            height={300}
            yLabel={isHourScale ? "Jam" : "Menit"}
            type="line"
        />

        ) : (
          <div className="text-gray-400 text-sm">Tidak ada data</div>
        )}
      </div>
    </div>
  );
};

export default VocabProgressDuration;
