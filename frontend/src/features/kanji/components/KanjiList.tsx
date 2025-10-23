import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  markKanjiLearning,
  markKanjiMastered,
} from "@/features/kanji/kanjiSlice";
import Badge from "@/components/atoms/Badge";
import { Link } from "react-router-dom";

export default function KanjiList() {
  const dispatch = useAppDispatch();
  const kanjiItems = useAppSelector((state) => state.kanji.items);

  const [levelFilter, setLevelFilter] = useState<
    "All" | "N5" | "N4" | "N3" | "N2" | "N1"
  >("All");
  const [search, setSearch] = useState("");

  // 🔹 filter kanji sesuai level + keyword
  const filteredKanji = kanjiItems.filter((k) => {
    const matchLevel = levelFilter === "All" || k.level === levelFilter;
    const matchKeyword =
      k.kanji.includes(search) ||
      k.meaning.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchKeyword;
  });

  return (
    <div className="py-6 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">🔡 Daftar Kanji</h1>

        {/* Search + Filter */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Cari kanji..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as "All" | "N5" | "N4" | "N3" | "N2" | "N1")}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">Semua Level</option>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Kanji</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Onyomi</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Kunyomi</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Arti</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Level</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Status</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredKanji.map((k) => (
              <tr key={k.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 font-medium text-2xl">
                  {k.kanji}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {k.onyomi?.join(", ")}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-sm">
                  {k.kunyomi?.join(", ")}
                </td>
                <td className="border border-gray-200 px-4 py-2">{k.meaning}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <Badge variant={k.level.toLowerCase() as "n5" | "n4" | "n3" | "n2" | "n1"}>{k.level}</Badge>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center italic">
                  {k.status}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
                  <Link to={`/kanji/${k.id}`}>Detail</Link>
                  <button
                    onClick={() => dispatch(markKanjiLearning(k.id))}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Mulai Belajar
                  </button>
                  <button
                    onClick={() => dispatch(markKanjiMastered(k.id))}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    Tandai Hafal
                  </button>
                </td>
              </tr>
            ))}
            {filteredKanji.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  📭 Tidak ada kanji ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
