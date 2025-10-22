import IconSetting from "@/assets/icon/setting.svg?react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ModalConfig from "../../features/vocab/components/ModalConfig";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchReviewStudy } from "@/features/review/reviewSlice";

const ReminderReview: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loading, meta } = useAppSelector((state) => state.review);

  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Fetch data review dari backend (default: vocab 7 hari terakhir)
  useEffect(() => {
    dispatch(fetchReviewStudy({ days: 7, type: "vocab" }));
  }, [dispatch]);

  // 🔹 Hitung total & progress
const { totalVocab, totalReview, progress } = useMemo(() => {
  if (meta) {
    return {
      totalVocab: meta.total || 0,
      totalReview: meta.total - meta.reviewedToday || 0,
      progress: meta.progress || 0,
    };
  }

  // fallback lama
  const totalVocab = items.length;
  const reviewedCount = items.filter((i) => i.correct === true).length;
  const progress = totalVocab > 0 ? (reviewedCount / totalVocab) * 100 : 0;
  const totalReview = totalVocab - reviewedCount;
  return { totalVocab, totalReview, progress };
}, [items, meta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/review/study", { state: { type: "vocab" } });
  };

  return (
    <>
      <form
        className="p-4 bg-white border border-gray-200 rounded-xl space-y-3 w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-600">Daily Review</p>
            <button type="button" onClick={() => setIsOpen(true)}>
              <IconSetting className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-300 [stroke-width:1.5] hover:[stroke-width:2]" />
            </button>
          </div>
          <p className="text-lg">Review vocab</p>
        </div>

        {/* 🔹 Progress */}
        <div className="progress-bar">
          <div className="progress flex justify-between w-full mb-1">
            <p className="text-lg font-semibold">{Math.round(progress)}%</p>
            <p className="text-md text-gray-600">
              {totalVocab - totalReview}/{totalVocab} selesai
            </p>
          </div>
          <div className="progress w-full h-2 bg-gray-200 rounded-full">
            <div
              className="progress h-2 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          className="w-full"
          disabled={loading || totalVocab === 0}
        >
          {loading ? "Loading..." : totalReview > 0 ? "Mulai Review" : "✅ Semua selesai!"}
        </Button>
      </form>

      {/* ⚙️ Modal Config */}
      <ModalConfig
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Konfigurasi"
        description="Atur preferensi belajar"
      />
    </>
  );
};

export default ReminderReview;
