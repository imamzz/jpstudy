import { useEffect, useState } from "react";
import { getAllVocab, type Vocab } from "../../../api/vocab";
import { BookOpen, Search } from "lucide-react";
import Select from "../../../components/atoms/Select";
import type { BadgeVariant } from "../../../components/atoms/Badge";
import Badge from "../../../components/atoms/Badge";

function VocabList() {
  const [vocab, setVocab] = useState<Vocab[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");

  const getVariant = (level?: string): BadgeVariant => {
    if (!level) return "default";
    switch (level.toLowerCase()) {
      case "n5":
        return "n5";
      case "n4":
        return "n4";
      case "n3":
        return "n3";
      case "n2":
        return "n2";
      case "n1":
        return "n1";
      default:
        return "default";
    }
  };


  useEffect(() => {
    fetchVocabs();
  }, [search, level]);

  const fetchVocabs = async () => {
    try {
      setLoading(true);
      const list = await getAllVocab(search, level);
      setVocab(list);
    } catch (err) {
      console.error("Error fetching vocab:", err);
      setVocab([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <BookOpen className="text-blue-600 w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold text-blue-700">
          Japanese Vocabulary
        </h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Cari vocab..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* select level */}
        <Select options={[
          { value: "", label: "Semua Level" },
          { value: "N5", label: "N5" },
          { value: "N4", label: "N4" },
          { value: "N3", label: "N3" },
          { value: "N2", label: "N2" },
          { value: "N1", label: "N1" },
        ]} value={level} 
        onChange={(value) => setLevel(value)} />
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading vocab...</p>
      ) : vocab.length === 0 ? (
        <div className="text-center text-gray-500 mt-6">
          <p>📭 Tidak ada vocab ditemukan</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
          <table className="w-full text-center border-collapse">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="border-b border-gray-200">
                <th className="p-3 ">Kanji</th>
                <th className="p-3 ">Kana</th>
                <th className="p-3 ">Romaji</th>
                <th className="p-3 ">Meaning</th>
                <th className="p-3 ">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vocab.map((word) => (
                <tr
                  key={word.id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="p-3">{word.kanji || "-"}</td>
                  <td className="p-3 font-medium">{word.word}</td>
                  <td className="p-3 text-gray-600">{word.romaji}</td>
                  <td className="p-3">{word.meaning}</td>
                  <td className="p-3">
                  <Badge variant={getVariant(word.level)}>{word.level || "-"}</Badge>
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VocabList;
