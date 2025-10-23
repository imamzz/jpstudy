import img from "../../../../assets/Target.png";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useEffect } from "react";
import { fetchProgressSummary } from "@/features/user/home/progressSummarySlice";

const Target = () => {
  const dispatch = useAppDispatch();
  const { progressSummary, loading } = useAppSelector((state) => state.progressSummary);

  // 🔹 Ambil data saat pertama kali komponen muncul
  useEffect(() => {
    dispatch(fetchProgressSummary());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-xl col-span-2 shadow-sm">
        <p className="text-gray-500 text-sm">Memuat progress...</p>
      </div>
    );
  }

  if (!progressSummary) return null;

  const { mastered, total } = progressSummary.vocab;
  const progress = Math.round((mastered / total) * 100);

  return (
    <div className="flex items-center flex-shrink-0 gap-4 bg-blue-50 rounded-xl p-4 col-span-2 h-[150px] shadow-sm">
      <img
        src={img}
        alt="Target"
        className="
          w-[168.023px]
          h-[168.023px]
          flex-shrink-0
          rotate-[-200.36deg]
          object-contain
          aspect-[168.02/168.02]
          -translate-y-6
        "
      />

      <div className="flex flex-col w-full h-[102px] justify-between items-start">
        <p className="text-xs font-semibold text-gray-500">Main goal</p>
        <h2 className="text-lg font-semibold text-gray-700">Perbanyak vocab</h2>

        <div className="flex items-center justify-between text-sm mt-1 w-full">
          <span className="font-semibold text-gray-700">{progress}%</span>
          <span className="text-gray-500">
            {mastered}/{total} word
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Target;
