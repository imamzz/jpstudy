import Button from "@/components/atoms/Button";

interface ReviewStudyControlsProps {
  onAnswer: (isCorrect: boolean) => void;
}

export default function ReviewStudyControls({
  onAnswer,
}: ReviewStudyControlsProps) {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <hr className="w-full mb-12 border border-gray-200" />
      <div className="flex space-x-2 justify-between w-full max-w-6xl items-center">
        <Button
          onClick={() => onAnswer(false)}
          variant="secondary"
          className="px-6"
        >
          Skip
        </Button>
        <Button
          onClick={() => onAnswer(true)}
          variant="primary"
          className="px-6"
        >
          Tahu
        </Button>
      </div>
    </div>
  );
}
