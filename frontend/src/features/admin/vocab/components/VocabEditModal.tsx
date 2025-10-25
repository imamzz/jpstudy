import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal";
import Button from "@/components/atoms/Button";
import type { Word } from "@/features/admin/vocab/vocabSlice";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import privateApi from "@/base/privateApi";
import { useToast } from "@/components/molecules/ToastProvider";

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

  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

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
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (word?.id) {
        await privateApi.put(`/vocab/${word.id}`, formData);
        showToast("success", "Kosakata berhasil diperbarui!");
      } else {
        await privateApi.post(`/vocab`, formData);
        showToast("success", "Kosakata berhasil ditambahkan!");
      }

      setLoading(false);
      onClose();
      if (onUpdated) onUpdated();
    }catch (err: any) {
      const data = err.response?.data;

      // --- 1️⃣ Error umum ---
      if (data?.error) {
        showToast("error", data.error.message || "Terjadi kesalahan");
      }

      // --- 2️⃣ Error validasi per field ---
      if (data?.errors) {
        const fieldErrors: Record<string, string[]> = {};
        data.errors.forEach((e: any) => {
          fieldErrors[e.field] = e.messages;
        });
        setFormErrors(fieldErrors);
      }

      // --- 3️⃣ Fallback umum ---
      if (!data?.error && !data?.errors) {
        showToast("error", data?.message || "Gagal menyimpan data");
      }

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
          label="Kana"
          name="kana"
          type="text"
          placeholder="Kana"
          value={formData.kana}
          onChange={handleChange}
          variant={formErrors.kana ? "error" : "default"}
          errorMessage={formErrors.kana?.[0]}
        />
        <Input
          label="Kanji"
          name="kanji"
          type="text"
          placeholder="Kanji"
          value={formData.kanji}
          onChange={handleChange}
          variant={formErrors.kanji ? "error" : "default"}
          errorMessage={formErrors.kanji?.[0]}
        />
        <Input
          label="Romaji"
          name="romaji"
          type="text"
          placeholder="Romaji"
          value={formData.romaji}
          onChange={handleChange}
          variant={formErrors.romaji ? "error" : "default"}
          errorMessage={formErrors.romaji?.[0]}
        />
        <Input
          label="Arti"
          name="meaning"
          type="text"
          placeholder="Arti"
          value={formData.meaning}
          onChange={handleChange}
          variant={formErrors.meaning ? "error" : "default"}
          errorMessage={formErrors.meaning?.[0]}
        />
        <TextArea
          label="Contoh"
          name="example"
          placeholder="Contoh"
          value={formData.example}
          onChange={handleChange}
          variant={formErrors.example ? "error" : "default"}
          errorMessage={formErrors.example?.[0]}
        />
        <Input
          label="Level"
          name="level"
          type="text"
          placeholder="Level"
          value={formData.level}
          onChange={handleChange}
          variant={formErrors.level ? "error" : "default"}
          errorMessage={formErrors.level?.[0]}
        />
      </form>
    </Modal>
  );
}
