import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchVocabSetting, saveVocabSetting, type VocabSetting } from "@/features/user/settings/settingsSlice";
import { useEffect, useState } from "react";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import Modal from "../../../../components/molecules/Modal";

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
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      divider={true}
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
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
      </form>
    </Modal>
  );
}
