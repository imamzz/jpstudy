import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import VolumeHigh from "@/assets/icon/volume-high.svg?react";
import type { Grammar } from "@/features/user/grammar/grammarSlice";

interface GrammarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  grammar: Grammar | null;
  bookmark?: boolean;
}

export default function GrammarDetailModal({
  isOpen,
  onClose,
  grammar,
  bookmark,
}: GrammarDetailModalProps) {
  if (!grammar) return null;

  return (
    <Modal
      isOpen={isOpen}
      title="Detail Grammar"
      example={[grammar.example || ""]}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </>
      }
      bookmark={bookmark}
    >
      <h2 className="text-12xl font-bold text-center mb-4">{grammar.pattern}</h2>
      <div className="flex items-center justify-center w-full mb-4">
        <VolumeHigh className="w-6 h-6 [stroke-width:1.2]" />
      </div>
      <p className="text-center text-lg text-gray-600">{grammar.meaning || ""}</p>
      <p className="text-center font-semibold">Level {grammar.level || ""}</p>
    </Modal>
  );
}
