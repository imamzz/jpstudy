import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  saveReviewSetting,
  fetchReviewSetting,
  type ReviewSetting,
} from "@/features/user/settings/settingsSlice";
import { useEffect, useState } from "react";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import Modal from "@/components/molecules/Modal";

interface ModalConfigReviewProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

export default function ModalConfigReview({
  isOpen,
  onClose,
  userId,
}: ModalConfigReviewProps) {
  const dispatch = useAppDispatch();
  const { review, loading } = useAppSelector((state) => state.settings);

  const [rangeDays, setRangeDays] = useState(7);
  const [targetLevel, setTargetLevel] = useState("N5");

  // Ambil setting dari backend saat modal dibuka
  useEffect(() => {
    if (isOpen) dispatch(fetchReviewSetting(userId));
  }, [isOpen, dispatch, userId]);

  // Sync dengan state Redux
  useEffect(() => {
    if (review) {
      setRangeDays(review.review_days_range);
      setTargetLevel(review.target_level);
    }
  }, [review, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      saveReviewSetting({
        userId,
        data: {
          review_days_range: rangeDays,
          target_level: targetLevel as ReviewSetting["target_level"],
        },
      })
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Konfigurasi Review"
      description="Konfigurasi review untuk setiap level"
      divider={true}
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
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
      </form>
    </Modal>
  );
}
