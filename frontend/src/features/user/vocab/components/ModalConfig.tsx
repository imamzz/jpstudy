import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchVocabSetting, saveVocabSetting, type VocabSetting } from "@/features/user/settings/settingsSlice";
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
  const { vocab, loading } = useAppSelector((state) => state.settings);

  const [wordsPerSet, setWordsPerSet] = useState(10);
  const [totalSet, setTotalSet] = useState(2);
  const [secondsPerWord, setSecondsPerWord] = useState(10);
  const [breakPerSet, setBreakPerSet] = useState(30);
  const [targetLevel, setTargetLevel] = useState("N5");

  // 🔹 Ambil data saat modal dibuka
  useEffect(() => {
    if (isOpen) dispatch(fetchVocabSetting(userId));
  }, [isOpen, dispatch, userId]);

  // 🔹 Sinkronisasi dengan state redux
  useEffect(() => {
    if (vocab) {
      setWordsPerSet(vocab.words_per_set);
      setTotalSet(vocab.total_set);
      setSecondsPerWord(vocab.seconds_per_word);
      setBreakPerSet(vocab.break_per_set);
      setTargetLevel(vocab.target_level);
    }
  }, [vocab, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      words_per_set: wordsPerSet,
      total_set: totalSet,
      seconds_per_word: secondsPerWord,
      break_per_set: breakPerSet,
      target_level: targetLevel,
    };

    dispatch(saveVocabSetting({ userId, data: data as Partial<VocabSetting> }));
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
              name="wordsPerSet"
              label="Word per set"
              type="number"
              value={wordsPerSet}
              onChange={(e) => setWordsPerSet(Number(e.target.value))}
            />
            <Input
              name="totalSet"
              label="Total set"
              type="number"
              value={totalSet}
              onChange={(e) => setTotalSet(Number(e.target.value))}
            />
            <Input
              name="secondsPerWord"
              label="Durasi per kata (detik)"
              type="number"
              value={secondsPerWord}
              onChange={(e) => setSecondsPerWord(Number(e.target.value))}
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
