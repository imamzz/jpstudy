import IconSetting from "@/assets/icon/setting.svg?react";
import IconRepeat from "@/assets/icon/repeat.svg?react";
import IconTimer from "@/assets/icon/timer.svg?react";
import IconTimerPause from "@/assets/icon/timer-pause.svg?react";
import Button from "../../../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalConfig from "./ModalConfig";
import Badge, { type BadgeVariant } from "../../../../components/atoms/Badge";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchVocabSetting } from "@/features/user/settings/settingsSlice";

interface StartLearningProps {
  userId: number;
}

const StartLearning = ({ userId }: StartLearningProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { vocab, loading, error } = useAppSelector((state) => state.settings);

  // ✅ Ambil setting vocab dari backend
  useEffect(() => {
    if (userId) dispatch(fetchVocabSetting(userId));
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
              <IconSetting className="w-5 h-5 cursor-pointer text-white hover:text-gray-200 transition-all duration-300 [stroke-width:1.5] hover:[stroke-width:2]" />
            </button>
          </div>

          {loading ? (
            <p className="text-white">Memuat konfigurasi...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : vocab ? (
            <p className="text-lg font-semibold text-white">
              Belajar vocab: {vocab.words_per_set} kata per sesi
            </p>
          ) : (
            <p className="text-white text-lg">Gunakan pengaturan default</p>
          )}
        </div>

        {!loading && vocab && (
          <div className="flex items-center justify-between">
            <div className="set flex items-center gap-2">
              <IconRepeat className="w-5 h-5 text-white [stroke-width:2]" />
              <p className="text-md text-white">{vocab.total_set}</p>
            </div>
            <div className="timer flex items-center gap-2">
              <IconTimer className="w-4.5 h-4.5 text-white [stroke-width:2]" />
              <p className="text-md text-white">{vocab.seconds_per_word}s</p>
            </div>
            <div className="break flex items-center gap-2">
              <IconTimerPause className="w-5 h-5 text-white [stroke-width:2]" />
              <p className="text-md text-white">{vocab.break_per_set}s</p>
            </div>
            <div className="word flex items-center gap-2">
              <Badge variant={vocab.target_level as BadgeVariant} size="md">
                {vocab.target_level}
              </Badge>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="bg-white text-blue-700"
          size="md"
          disabled={loading}
        >
          Mulai Belajar
        </Button>
      </form>

      {/* ⚙️ Modal konfigurasi vocab */}
      <ModalConfig
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={userId}
        title="Konfigurasi Vocab"
        description="Atur preferensi belajar vocabulary"
      />
    </>
  );
};

export default StartLearning;
