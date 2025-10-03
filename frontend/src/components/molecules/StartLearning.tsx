import IconSetting from "@/assets/icon/setting.svg?react";
import IconRepeat from "@/assets/icon/repeat.svg?react";
import IconTimer from "@/assets/icon/timer.svg?react";
import IconTimerPause from "@/assets/icon/timer-pause.svg?react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalConfig from "../molecules/ModalConfig";
import Badge, { type BadgeVariant } from "../atoms/Badge";
import { fetchUserConfig } from "@/features/config/configSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

interface StartLearningProps {
  userId: number;
}

const StartLearning = ({ userId }: StartLearningProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { config, loading, error } = useAppSelector((state) => state.config);

  useEffect(() => {
    dispatch(fetchUserConfig(userId));
  }, [dispatch, userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/vocab/study");
  };

  return (
    <>
      <form
        className="p-4 bg-blue-700 border border-gray-200 rounded-xl space-y-3 w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white">Study</p>
            <button type="button" onClick={() => setIsOpen(true)}>
              <IconSetting className="w-5 h-5 cursor-pointer text-white hover:text-gray-700 transition-all duration-300 [stroke-width:1.5] hover:[stroke-width:2]" />
            </button>
          </div>

          {loading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <p className="text-lg font-semibold text-white">
              Belajar vocab : Pelajari {config.limit} vocabulary per hari
            </p>
          )}
        </div>

        {!loading && !error && (
          <div className="flex items-center justify-between">
            <div className="set flex items-center gap-2">
              <IconRepeat className="w-5 h-5 text-white [stroke-width:2]" />
              <p className="text-md text-white">{config.totalSets}</p>
            </div>
            <div className="timer flex items-center gap-2">
              <IconTimer className="w-4.5 h-4.5 text-white [stroke-width:2]" />
              <p className="text-md text-white">{config.duration}s</p>
            </div>
            <div className="break flex items-center gap-2">
              <IconTimerPause className="w-5 h-5 text-white [stroke-width:2]" />
              <p className="text-md text-white">{config.breakDuration}s</p>
            </div>
            <div className="word flex items-center gap-2">
              <Badge variant={config.targetLevel as BadgeVariant} size="md">
                {config.targetLevel}
              </Badge>
            </div>
          </div>
        )}

        <Button variant="outline" className="bg-white text-blue-700" size="md">
          Mulai Belajar
        </Button>
      </form>

      <ModalConfig
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Konfigurasi"
        description="Atur preferensi belajar"
      />
    </>
  );
};

export default StartLearning;
