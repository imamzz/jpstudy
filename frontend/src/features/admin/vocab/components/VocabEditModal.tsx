import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import type { Word } from "@/features/user/vocab/vocabSlice";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import privateApi from "@/base/privateApi";
import { toast } from "react-hot-toast";

interface VocabEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: Word | null;
  onUpdated?: () => void;
}

export default function VocabEditModal({
  isOpen,
  onClose,
  word,
  onUpdated,
}: VocabEditModalProps) {
  const [formData, setFormData] = useState({
    kana: "",
    kanji: "",
    romaji: "",
    meaning: "",
    example: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);

  // isi ulang form saat edit atau tambah
  useEffect(() => {
    if (word) {
      setFormData({
        kana: word.kana || "",
        kanji: word.kanji || "",
        romaji: word.romaji || "",
        meaning: word.meaning || "",
        example: word.example || "",
        level: word.level || "",
      });
    } else {
      // reset untuk mode tambah
      setFormData({
        kana: "",
        kanji: "",
        romaji: "",
        meaning: "",
        example: "",
        level: "",
      });
    }
  }, [word]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (word?.id) {
        // 🔹 UPDATE
        await privateApi.put(`/vocab/${word.id}`, formData);
        toast.success("Kosakata berhasil diperbarui!");
      } else {
        // 🔹 CREATE
        await privateApi.post(`/vocab`, formData);
        toast.success("Kosakata berhasil ditambahkan!");
      }

      setLoading(false);
      onClose();
      if (onUpdated) onUpdated();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal menyimpan kosakata");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const title = word?.id ? "Ubah Kosakata" : "Tambah Kosakata";

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={loading}>
            Tutup
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            form="editForm"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </>
      }
    >
      <form id="editForm" onSubmit={handleSubmit}>
        <Input
          className="mb-2"
          label="Kana"
          name="kana"
          type="text"
          placeholder="Kana"
          value={formData.kana}
          onChange={handleChange}
        />
        <Input
          className="mb-2"
          label="Kanji"
          name="kanji"
          type="text"
          placeholder="Kanji"
          value={formData.kanji}
          onChange={handleChange}
        />
        <Input
          className="mb-2"
          label="Romaji"
          name="romaji"
          type="text"
          placeholder="Romaji"
          value={formData.romaji}
          onChange={handleChange}
        />
        <Input
          className="mb-2"
          label="Arti"
          name="meaning"
          type="text"
          placeholder="Arti"
          value={formData.meaning}
          onChange={handleChange}
        />
        <TextArea
          className="mb-2"
          label="Contoh"
          name="example"
          placeholder="Contoh"
          value={formData.example}
          onChange={handleChange}
        />
        <Input
          className="mb-2"
          label="Level"
          name="level"
          type="text"
          placeholder="Level"
          value={formData.level}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
}
