import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import VolumeHigh from "@/assets/icon/volume-high.svg?react";
import type { Kanji } from "@/features/user/kanji/kanjiSlice";

interface VocabDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  kanji: Kanji | null;
  bookmark?: boolean;
}

export default function VocabDetailModal({
  isOpen,
  onClose,
  kanji,
  bookmark,
}: VocabDetailModalProps) {
  if (!kanji) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Detail Kanji"
      example={[kanji.example || ""]}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </>
      }
      bookmark={bookmark}
    >
      <h2 className="text-12xl font-bold text-center mb-4">{kanji.kanji}</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <VolumeHigh className="w-6 h-6 [stroke-width:1.2]" />
      </div>
      <p className="text-center text-lg text-gray-600">{kanji.kanji} ({kanji.kana}/{kanji.meaning || ""})</p>
      <p className="text-center font-semibold">JLPT level {kanji.level || ""}</p>
      <p className="text-center font-semibold">Onyomi: {kanji.onyomi || ""}</p>
      <p className="text-center font-semibold">Kunyomi: {kanji.kunyomi || ""}</p>
    </Modal>
  );
}
