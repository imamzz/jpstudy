import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { saveReviewSetting, fetchReviewSetting } from "@/features/settings/settingsSlice";
import { useEffect, useState } from "react";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";

export default function ModalConfigReview({ isOpen, onClose }: any) {
  const dispatch = useAppDispatch();
  const { review, loading } = useAppSelector((state) => state.settings);
  const userId = 3; // sementara hardcoded

  const [rangeDays, setRangeDays] = useState(7);
  const [targetLevel, setTargetLevel] = useState("N5");

  // Ambil setting dari backend saat modal dibuka
  useEffect(() => {
    if (isOpen) dispatch(fetchReviewSetting(userId));
  }, [isOpen, dispatch]);

  // Sync dengan state Redux
  useEffect(() => {
    if (review) {
      setRangeDays(review.review_days_range);
      setTargetLevel(review.target_level);
    }
  }, [review]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveReviewSetting({ userId, data: { review_days_range: rangeDays, target_level: targetLevel } }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px] relative">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-3 text-center border-b border-gray-200">
            <h2 className="text-md font-semibold">Konfigurasi Review</h2>
          </div>

          <div className="px-6 py-4 flex flex-col gap-3">
            <Input
              name="rangeDays"
              label="Range Days"
              type="number"
              value={rangeDays}
              onChange={(e) => setRangeDays(Number(e.target.value))}
            />
            <Input
              name="targetLevel"
              label="Target Level"
              type="text"
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
            />
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
            <Button variant="secondary" size="md" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
