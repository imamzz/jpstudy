import IconSetting from "@/assets/icon/setting.svg?react";
import IconRepeat from "@/assets/icon/repeat.svg?react";
import IconTimer from "@/assets/icon/timer.svg?react";
import IconTimerPause from "@/assets/icon/timer-pause.svg?react";
import IconBook from "@/assets/icon/book.svg?react";
import Badge, { type BadgeVariant } from "../atoms/Badge";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalConfig from "../molecules/ModalConfig";

interface StartLearningProps {
  level: string;
  limit: number;
  totalSets: number;
  duration: number;
  breakDuration: number;
}

const StartLearning = ({ level, limit, totalSets, duration, breakDuration }: StartLearningProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      wordsPerSet: limit,
      totalSets: totalSets,
      duration,
      level,
      breakDuration,
    };
    navigate("/vocab/study", { state: config });
  };

  return (
    <>
      <form
        className="p-4 bg-white border border-gray-200 rounded-xl space-y-3 w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-600">Study</p>
            <button type="button" onClick={() => setIsOpen(true)}>
              <IconSetting className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-300 [stroke-width:1.5] hover:[stroke-width:2]" />
            </button>
          </div>
          <p className="text-lg">
            Vocab learning level <Badge variant={level as BadgeVariant}>{level}</Badge>
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="word flex items-center gap-2">
            <IconBook className="w-5 h-5 text-gray-500" />
            <p className="text-md">{limit}</p>
          </div>
          <div className="set flex items-center gap-2">
            <IconRepeat className="w-5 h-5 text-gray-500" />
            <p className="text-md">{totalSets}</p>
          </div>
          <div className="timer flex items-center gap-2">
            <IconTimer className="w-5 h-5 text-gray-500" />
            <p className="text-md">{duration}s</p>
          </div>
          <div className="break flex items-center gap-2">
            <IconTimerPause className="w-6 h-6 text-gray-500" />
            <p className="text-md">{breakDuration}s</p>
          </div>
        </div>

        <Button variant="primary" size="md" className="w-full">
          Mulai Belajar
        </Button>
      </form>

      {/* ✅ ModalConfig langsung ditampilkan di sini */}
      <ModalConfig isOpen={isOpen} onClose={() => setIsOpen(false)} title="Konfigurasi" description="Atur preferensi belajar" />
    </>
  );
};

export default StartLearning;
