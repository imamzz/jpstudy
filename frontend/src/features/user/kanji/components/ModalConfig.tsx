import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchKanjiSetting, saveKanjiSetting, type KanjiSetting } from "@/features/user/settings/settingsSlice";
import { useEffect, useState } from "react";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";

interface ModalConfigProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  title?: string;
  description?: string;
}

export default function ModalConfig({
  isOpen,
  onClose,
  userId,
  title,
  description,
}: ModalConfigProps) {
  const dispatch = useAppDispatch();
  const { kanji, loading } = useAppSelector((state) => state.settings);

  const [kanjiPerSet, setKanjiPerSet] = useState(10);
  const [totalSet, setTotalSet] = useState(2);
  const [secondsPerKanji, setSecondsPerKanji] = useState(10);
  const [breakPerSet, setBreakPerSet] = useState(30);
  const [targetLevel, setTargetLevel] = useState("N5");

  // 🔹 Ambil data saat modal dibuka
  useEffect(() => {
    if (isOpen) dispatch(fetchKanjiSetting(userId));
  }, [isOpen, dispatch, userId]);

  // 🔹 Sinkronisasi dengan state redux
  useEffect(() => {
    if (kanji) {
      setKanjiPerSet(kanji.kanji_per_set);
      setTotalSet(kanji.total_set);
      setSecondsPerKanji(kanji.seconds_per_kanji);
      setBreakPerSet(kanji.break_per_set);
      setTargetLevel(kanji.target_level);
    }
  }, [kanji, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      kanji_per_set: kanjiPerSet,
      total_set: totalSet,
      seconds_per_kanji: secondsPerKanji,
      break_per_set: breakPerSet,
      target_level: targetLevel,
    };

    dispatch(saveKanjiSetting({ userId, data: data as Partial<KanjiSetting> }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px] relative">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-3 text-center border-b border-gray-200">
            <h2 className="text-md font-semibold">{title}</h2>
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </div>

          <div className="px-6 py-4 flex flex-col gap-3">
            <Input
              name="kanjiPerSet"
              label="Kanji per set"
              type="number"
              value={kanjiPerSet}
              onChange={(e) => setKanjiPerSet(Number(e.target.value))}
            />
            <Input
              name="totalSet"
              label="Total set"
              type="number"
              value={totalSet}
              onChange={(e) => setTotalSet(Number(e.target.value))}
            />
            <Input
              name="secondsPerKanji"
              label="Durasi per kanji (detik)"
              type="number"
              value={secondsPerKanji}
              onChange={(e) => setSecondsPerKanji(Number(e.target.value))}
            />
            <Input
              name="breakPerSet"
              label="Istirahat per set (detik)"
              type="number"
              value={breakPerSet}
              onChange={(e) => setBreakPerSet(Number(e.target.value))}
            />
            <Input
              name="targetLevel"
              label="Target Level"
              type="text"
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
            />
          </div>

          <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
            <Button variant="secondary" size="md" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
