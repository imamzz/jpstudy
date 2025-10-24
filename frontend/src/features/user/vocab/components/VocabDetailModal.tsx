import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import VolumeHigh from "@/assets/icon/volume-high.svg?react";
import type { Word } from "@/features/user/vocab/vocabSlice";

interface VocabDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: Word | null;
  bookmark?: boolean;
}

export default function VocabDetailModal({
  isOpen,
  onClose,
  word,
  bookmark,
}: VocabDetailModalProps) {
  if (!word) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Detail Kosakata"
      example={[word.example || ""]}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </>
      }
      bookmark={bookmark}
    >
      <h2 className="text-12xl font-bold text-center mb-4">{word.kana}</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <VolumeHigh className="w-6 h-6 [stroke-width:1.2]" />
      </div>
      <p className="text-center text-lg text-gray-600">{word.kanji} ({word.romaji}/{word.meaning || ""})</p>
      <p className="text-center font-semibold">JLPT level {word.level || ""}</p>
    </Modal>
  );
}
