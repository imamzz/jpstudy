import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import VolumeHigh from "@/assets/icon/volume-high.svg?react";
import type { ReviewItem } from "@/features/user/review/reviewTableSlice";

interface ReviewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ReviewItem | null;
  bookmark?: boolean;
}

export default function ReviewDetailModal({
  isOpen,
  onClose,
  item,
  bookmark,
}: ReviewDetailModalProps) {
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Detail Review"
      example={[item.item_detail.example || ""]}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </>
      }
      bookmark={bookmark}
    >
      <h2 className="text-12xl font-bold text-center mb-4">{item.item_detail.kana}</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <VolumeHigh className="w-6 h-6 [stroke-width:1.2]" />
      </div>
      <p className="text-center text-lg text-gray-600">{item.item_detail.kanji} ({item.item_detail.romaji}/{item.item_detail.meaning || ""})</p>
      <p className="text-center font-semibold">JLPT level {item.item_detail.level || ""}</p>
    </Modal>
  );
}
