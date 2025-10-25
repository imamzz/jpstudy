import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchVocab, setPage } from "@/features/user/vocab/vocabSlice";
import Button from "@/components/atoms/Button";
import type { Word } from "@/features/user/vocab/vocabSlice";
import VocabDetailModal from "./VocabDetailModal";
import VocabEditModal from "./VocabEditModal";
import Modal from "@/components/molecules/Modal";
import privateApi from "@/base/privateApi";
import { useToast } from "@/components/molecules/ToastProvider";
import DataTable, { type Column } from "@/components/molecules/DataTable";

export default function VocabTable() {
  const dispatch = useAppDispatch();
  const { words, loading, error, page, pageSize, totalPages, total } =
    useAppSelector((state) => state.vocab);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [editWord, setEditWord] = useState<Word | null>(null);
  const [deleteWord, setDeleteWord] = useState<Word | null>(null);
  const [keepFocus, setKeepFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();

  // 🔸 Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 🔹 Fetch data
  useEffect(() => {
    let isCancelled = false;
    dispatch(fetchVocab({ page, pageSize, search: debouncedSearch || undefined }))
      .unwrap()
      .then(() => {
        if (!isCancelled && keepFocus && inputRef.current) inputRef.current.focus();
      })
      .catch(() => {});
    return () => {
      isCancelled = true;
    };
  }, [dispatch, page, pageSize, debouncedSearch]);

  // 🔹 Reset ke page 1 jika search berubah
  useEffect(() => {
    dispatch(setPage(1));
  }, [searchQuery, dispatch]);

  // 🔹 Klik luar input → hilangkan fokus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) setKeepFocus(false);
      else setKeepFocus(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Ketik → fokus ke input otomatis
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        if (inputRef.current) {
          inputRef.current.focus();
          setSearchQuery((prev) => prev + e.key);
          setKeepFocus(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 🗑️ Hapus kosakata
  const confirmDeleteWord = async () => {
    if (!deleteWord) return;
    try {
      await privateApi.delete(`/vocab/${deleteWord.id}`);
      showToast("success", "Kosakata berhasil dihapus!");
      setDeleteWord(null);
      dispatch(fetchVocab({ page, pageSize, search: debouncedSearch || undefined }));
    } catch (err: any) {
      showToast("error", err.response?.data?.message || "Gagal menghapus kosakata");
    }
  };

  // 📋 Kolom tabel
  const columns: Column<Word>[] = [
    {
      key: "no",
      header: "No",
      render: (_: Word, index: number) => index + 1 + (page - 1) * pageSize,
      className: "w-5",
    },
    { key: "kanji", header: "Kanji", className: "w-10 font-medium text-lg" },
    { key: "kana", header: "Kana", className: "w-10" },
    {
      key: "romaji",
      header: "Romaji",
      render: (word) => <span className="italic text-gray-500">{word.romaji}</span>,
      className: "w-5",
    },
    { key: "meaning", header: "Arti", className: "w-55" },
    {
      key: "aksi",
      header: "Aksi",
      className: "w-30",
      render: (word) => (
        <>
          <Button variant="primary" size="sm" onClick={() => setSelectedWord(word)}>
            Lihat
          </Button>
          <Button className="ml-2" variant="warning" size="sm" onClick={() => setEditWord(word)}>
            Edit
          </Button>
          <Button className="ml-2" variant="danger" size="sm" onClick={() => setDeleteWord(word)}>
            Hapus
          </Button>
        </>
      ),
    },
  ];


  // 🧩 Header kanan → tombol tambah
  const rightHeader = (
    <Button variant="primary" size="sm" onClick={() => setEditWord({} as Word)}>
      Tambah Kosakata
    </Button>
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={words}
        loading={loading}
        error={error}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kosakata..."
        inputRef={inputRef}
        rightHeader={rightHeader}
      />

      {/* Modal: Detail */}
      <VocabDetailModal
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        word={selectedWord}
      />

      {/* Modal: Tambah/Edit */}
      <VocabEditModal
        isOpen={!!editWord}
        onClose={() => setEditWord(null)}
        word={editWord}
        onUpdated={() => dispatch(fetchVocab({ page, pageSize, search: debouncedSearch }))}
      />

      {/* Modal: Konfirmasi Hapus */}
      <Modal
        isOpen={!!deleteWord}
        title="Hapus Kosakata"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDeleteWord(null)}>
              Batal
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDeleteWord}>
              Hapus
            </Button>
          </>
        }
      >
        <p>Apakah Anda yakin ingin menghapus kosakata ini? {deleteWord?.kana}</p>
      </Modal>
    </>
  );
}
