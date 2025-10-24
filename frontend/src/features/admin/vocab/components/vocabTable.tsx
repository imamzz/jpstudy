import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchVocab, setPage } from "@/features/user/vocab/vocabSlice";
import Button from "@/components/atoms/Button";
import VocabDetailModal from "./VocabDetailModal";
import Input from "@/components/atoms/Input";
import type { Word } from "@/features/user/vocab/vocabSlice";
import VocabEditModal from "./VocabEditModal";
import Modal from "@/components/molecules/Modal";

export default function VocabTable() {
  const dispatch = useAppDispatch();
  const { words, loading, error, page, pageSize, totalPages, total } = useAppSelector(
    (state) => state.vocab
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [editWord, setEditWord] = useState<Word | null>(null);
  const [deleteWord, setDeleteWord] = useState<Word | null>(null);

  const handleDeleteWord = (word: Word | null) => {
    if (!word) return;
    setDeleteWord(word);
  };

  // 🔹 Fetch data setiap kali page / search berubah
  useEffect(() => {
    dispatch(fetchVocab({ page, pageSize, search: searchQuery || undefined }));
  }, [dispatch, page, pageSize, searchQuery]);

  if (loading) return <p>⏳ Sedang memuat kosakata...</p>;
  if (error) return <p className="text-red-500">❌ {error}</p>;
  if (words.length === 0) return <p className="text-gray-500">📭 Tidak ada kosakata.</p>;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Cari kosakata..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            dispatch(setPage(1)); // reset ke halaman 1 saat search
          }}
        />
        {/* Add Button */}
        <Button
            variant="primary"
            size="sm"
            onClick={() => setEditWord({} as Word)} // gunakan objek kosong agar modal tetap terbuka
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
            {words.map((word, index) => (
              <tr key={word.id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-2 w-2 text-center">{index + 1 + (page - 1) * pageSize}</td>
                <td className="px-2 py-2 w-10 font-medium text-lg text-center">{word.kanji}</td>
                <td className="px-2 py-2 w-10 text-center">{word.kana}</td>
                <td className="px-2 py-2 w-10 italic text-gray-500 text-center">{word.romaji}</td>
                <td className="px-2 py-2 w-45 text-center">{word.meaning}</td>
                <td className="px-2 py-2 w-20 text-center items-center ">
                  <Button variant="primary" size="sm" onClick={() => setSelectedWord(word)}>
                    Lihat
                  </Button>
                  <Button className="ml-2" variant="warning" size="sm" onClick={() => setEditWord(word)}>
                    Edit
                  </Button>
                  <Button className="ml-2" variant="danger" size="sm" onClick={() => handleDeleteWord(word)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
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

      {/* Modal detail */}
      <VocabDetailModal
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        word={selectedWord}
      />

      {/* Modal edit */}
      <VocabEditModal
        isOpen={!!editWord}
        onClose={() => setEditWord(null)}
        word={editWord}
        onUpdated={() => dispatch(fetchVocab({ page, pageSize }))}
    />

      {/* Modal delete */}
      <Modal
        isOpen={!!deleteWord}
        title="Hapus Kosakata"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDeleteWord(null)}>
              Batal
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleDeleteWord(deleteWord)}>
              Hapus
            </Button>
          </>
        }
      >
        <p>Apakah Anda yakin ingin menghapus kosakata ini?</p>
      </Modal>
    </div>
  );
}
