import Button from "@/components/atoms/Button";

interface VocabStudyControlsProps {
  paused: boolean;
  onPauseToggle: () => void;
  onNext: () => void;
  onMastered: () => void;
}

export default function VocabStudyControls({
  paused,
  onPauseToggle,
  onNext,
  onMastered,
}: VocabStudyControlsProps) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <hr className="w-full mb-12 border border-gray-200" />
      <div className="flex space-x-2 justify-between w-full max-w-6xl items-center">
        <Button onClick={onNext} variant="outline" size="md" className="self-start w-[100px]">
          Skip
        </Button>

        <Button onClick={onPauseToggle} variant="primary" size="md" className="self-end w-[100px]">
          {paused ? "Resume" : "Pause"}
        </Button>
        <Button onClick={onMastered} variant="primary" size="md" className="self-end w-[100px]">
          Mastered
        </Button>
      </div>
    </div>
  );
}
