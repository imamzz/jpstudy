import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchGrammarSetting,
  saveGrammarSetting,
  type GrammarSetting,
} from "@/features/user/settings/settingsSlice";
import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Modal from "@/components/molecules/Modal";

interface GrammarConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  title?: string;
  description?: string;
}

export default function GrammarConfigModal({
  isOpen,
  onClose,
  userId,
  title,
  description,
}: GrammarConfigModalProps) {
  const dispatch = useAppDispatch();
  const { grammar, loading } = useAppSelector((state) => state.settings);

  const [form, setForm] = useState({
    grammar_per_set: 10,
    total_set: 2,
    seconds_per_grammar: 10,
    break_per_set: 30,
    target_level: "N5",
  });

  // Ambil data saat modal dibuka
  useEffect(() => {
    if (isOpen) dispatch(fetchGrammarSetting(userId));
  }, [isOpen, dispatch, userId]);

  // Sinkronisasi dengan Redux state
  useEffect(() => {
    if (grammar) setForm(grammar);
  }, [grammar, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      saveGrammarSetting({
        userId,
        data: form as Partial<GrammarSetting>,
      })
    );
    onClose();
  };

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          name="grammar_per_set"
          label="Grammar per set"
          type="number"
          value={form.grammar_per_set}
          onChange={handleChange}
        />
        <Input
          name="total_set"
          label="Total set"
          type="number"
          value={form.total_set}
          onChange={handleChange}
        />
        <Input
          name="seconds_per_grammar"
          label="Durasi per grammar (detik)"
          type="number"
          value={form.seconds_per_grammar}
          onChange={handleChange}
        />
        <Input
          name="break_per_set"
          label="Istirahat per set (detik)"
          type="number"
          value={form.break_per_set}
          onChange={handleChange}
        />
        <Input
          name="target_level"
          label="Target Level"
          type="text"
          value={form.target_level}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}
