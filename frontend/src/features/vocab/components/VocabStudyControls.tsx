import Button from "@/components/atoms/Button";
import React from "react";

interface VocabStudyControlsProps {
  paused: boolean;
  onPauseToggle: () => void;
  onNext: () => void;
}

export default function VocabStudyControls({
  paused,
  onPauseToggle,
  onNext,
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
      </div>
    </div>
  );
}
