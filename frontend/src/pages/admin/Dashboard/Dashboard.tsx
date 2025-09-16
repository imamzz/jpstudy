import { useEffect, useState } from "react";
import api from "@/base/api";
import { PlusCircle, Edit2, Trash2, BookOpen } from "lucide-react";

interface Word {
  id: number;
  kanji: string;
  kana: string;
  romaji: string;
  meaning: string;
}

function Dashboard() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk form tambah/edit
  const [kanji, setKanji] = useState("");
  const [kana, setKana] = useState("");
  const [romaji, setRomaji] = useState("");
  const [meaning, setMeaning] = useState("");

  // State edit
  const [editId, setEditId] = useState<number | null>(null);

  // State modal delete
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = () => {
    api
      .get("/vocab")
      .then((res) => {
        const list = res.data?.data ?? []; // ambil langsung dari "data"
        setWords(Array.isArray(list) ? list : []); // pastikan array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching words:", err);
        setLoading(false);
      });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!kanji || !kana || !romaji || !meaning) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    try {
      if (editId) {
        const res = await api.put(`/vocab/${editId}`, {
          kanji,
          kana,
          romaji,
          meaning,
        });
        setWords(words.map((w) => (w.id === editId ? res.data.data : w)));
        setEditId(null);
      } else {
        const res = await api.post("/vocab", {
          kanji,
          kana,
          romaji,
          meaning,
        });
        setWords([...words, res.data.data]);
      }

      setKanji("");
      setKana("");
      setRomaji("");
      setMeaning("");
    } catch (err) {
      console.error("Error saving word:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await api.delete(`/vocab/${deleteId}`);
      setWords(words.filter((w) => w.id !== deleteId));
    } catch (err) {
      console.error("Error deleting word:", err);
    } finally {
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <BookOpen className="text-blue-600 w-8 h-8 mr-2" />
        <h1 className="text-3xl font-bold text-blue-700">Japanese Words</h1>
      </div>

      {/* Form Tambah/Edit */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          {editId ? (
            <>
              <Edit2 className="w-5 h-5 mr-2 text-yellow-600" /> Edit Kata
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-2 text-green-600" /> Tambah Kata
              Baru
            </>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Kanji"
            value={kanji}
            onChange={(e) => setKanji(e.target.value)}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Kana"
            value={kana}
            onChange={(e) => setKana(e.target.value)}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Romaji"
            value={romaji}
            onChange={(e) => setRomaji(e.target.value)}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            {editId ? "Update" : "Tambah"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setKanji("");
                setKana("");
                setRomaji("");
                setMeaning("");
              }}
              className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel Kata */}
      {words.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada kata ditambahkan.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="w-full text-center border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Kanji</th>
                <th className="p-3 border">Kana</th>
                <th className="p-3 border">Romaji</th>
                <th className="p-3 border">Meaning</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {words.map((word) => (
                <tr
                  key={word.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border p-2">{word.kanji}</td>
                  <td className="border p-2">{word.kana}</td>
                  <td className="border p-2">{word.romaji}</td>
                  <td className="border p-2">{word.meaning}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditId(word.id);
                        setKanji(word.kanji);
                        setKana(word.kana);
                        setRomaji(word.romaji);
                        setMeaning(word.meaning);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(word.id);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Konfirmasi Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6 text-gray-700">
              Apakah Anda yakin ingin menghapus kata ini? Tindakan ini tidak bisa
              dibatalkan.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
