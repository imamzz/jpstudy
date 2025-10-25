import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchVocab, setPage } from "@/features/user/vocab/vocabSlice";
import Button from "@/components/atoms/Button";
import VocabDetailModal from "./VocabDetailModal";
import Input from "@/components/atoms/Input";
import type { Word } from "@/features/user/vocab/vocabSlice";
import VocabEditModal from "./VocabEditModal";
import Modal from "@/components/molecules/Modal";
import privateApi from "@/base/privateApi"; // pastikan ini sudah ada
import { useToast } from "@/components/molecules/ToastProvider";

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

  // 🔸 Debounce search (500ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 🔹 Fetch vocab saat page / search berubah
  useEffect(() => {
    let isCancelled = false;
    dispatch(
      fetchVocab({ page, pageSize, search: debouncedSearch || undefined })
    )
      .unwrap()
      .then(() => {
        if (!isCancelled && keepFocus && inputRef.current) {
          inputRef.current.focus();
        }
      })
      .catch(() => {});
    return () => {
      isCancelled = true;
    };
  }, [dispatch, page, pageSize, debouncedSearch]);

  // 🔹 Reset halaman ke 1 jika search berubah
  useEffect(() => {
    dispatch(setPage(1));
  }, [searchQuery, dispatch]);

  // 🔹 Deteksi klik di luar input
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setKeepFocus(false);
      } else {
        setKeepFocus(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Fokus otomatis kalau user mulai mengetik di mana pun
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

  // 🗑️ Klik tombol hapus → buka modal konfirmasi
  const handleDeleteWord = (word: Word | null) => {
    if (!word) return;
    setDeleteWord(word);
  };

  const { showToast } = useToast();

  const confirmDeleteWord = async () => {
    if (!deleteWord) return;

    try {
      await privateApi.delete(`/vocab/${deleteWord.id}`);
      showToast("success", "Kosakata berhasil dihapus!");
      setDeleteWord(null);
      dispatch(
        fetchVocab({ page, pageSize, search: debouncedSearch || undefined })
      );
    } catch (err: any) {
      showToast(
        "error",
        err.response?.data?.message || "Gagal menghapus kosakata"
      );
    }
  };

  if (error) return <p className="text-red-500">❌ {error}</p>;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex justify-between items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Cari kosakata..."
          value={searchQuery}
          onFocus={() => setKeepFocus(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={() => setEditWord({} as Word)}
        >
          Tambah Kosakata
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-2 py-2 w-2 text-center">No</th>
              <th className="px-2 py-2 w-10 text-center">Kanji</th>
              <th className="px-2 py-2 w-10 text-center">Kana</th>
              <th className="px-2 py-2 w-10 text-center">Romaji</th>
              <th className="px-2 py-2 w-45 text-center">Arti</th>
              <th className="px-2 py-2 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  ⏳ Sedang memuat kosakata...
                </td>
              </tr>
            ) : words.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  📭 Tidak ada kosakata yang cocok.
                </td>
              </tr>
            ) : (
              words.map((word, index) => (
                <tr key={word.id} className="hover:bg-gray-50 transition">
                  <td className="px-2 py-2 text-center">
                    {index + 1 + (page - 1) * pageSize}
                  </td>
                  <td className="px-2 py-2 text-center text-lg font-medium">
                    {word.kanji}
                  </td>
                  <td className="px-2 py-2 text-center">{word.kana}</td>
                  <td className="px-2 py-2 text-center italic text-gray-500">
                    {word.romaji}
                  </td>
                  <td className="px-2 py-2 text-center">{word.meaning}</td>
                  <td className="px-2 py-2 text-center">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedWord(word)}
                    >
                      Lihat
                    </Button>
                    <Button
                      className="ml-2"
                      variant="warning"
                      size="sm"
                      onClick={() => setEditWord(word)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="ml-2"
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteWord(word)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
        <span>
          Halaman {page} dari {totalPages} (total {total} kosakata)
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            « Prev
          </Button>
          <span>{page}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next »
          </Button>
        </div>
      </div>

      {/* Modals */}
      <VocabDetailModal
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        word={selectedWord}
      />

      <VocabEditModal
        isOpen={!!editWord}
        onClose={() => setEditWord(null)}
        word={editWord}
        onUpdated={() => dispatch(fetchVocab({ page, pageSize }))}
      />

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={!!deleteWord}
        title="Hapus Kosakata"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteWord(null)}
            >
              Batal
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDeleteWord}>
              Hapus
            </Button>
          </>
        }
      >
        <p>
          Apakah Anda yakin ingin menghapus kosakata ini? {deleteWord?.kana}
        </p>
      </Modal>
    </div>
  );
}
