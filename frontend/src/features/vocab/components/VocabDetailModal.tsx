import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import VolumeHigh from "@/assets/icon/volume-high.svg?react";

interface VocabDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: {
    id: string;
    kanji: string;
    kana: string;
    romaji: string;
    arti: string;
    level: string;
  } | null;
}

export default function VocabDetailModal({
  isOpen,
  onClose,
  word,
}: VocabDetailModalProps) {
  if (!word) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Kosakata"
      example={[
        "Contoh 1",
        "Contoh 2",
        "Contoh 3",
      ]}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </>
      }
    >
      <h2 className="text-12xl font-bold text-center mb-4">{word.kana}</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <VolumeHigh className="w-6 h-6 [stroke-width:1.2]" />
      </div>
      <p className="text-center text-lg text-gray-600">{word.kanji} ({word.romaji}/{word.arti})</p>
      <p className="text-center font-semibold">JLPT level {word.level}</p>
    </Modal>
  );
}
