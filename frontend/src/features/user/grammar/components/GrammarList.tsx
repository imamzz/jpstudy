import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { markGrammarLearning, markGrammarMastered } from "../grammarSlice";
import Badge from "@/components/atoms/Badge";

export default function GrammarList() {
  const dispatch = useAppDispatch();
  const grammarPoints = useAppSelector((state) => state.grammar.points);

  const [levelFilter, setLevelFilter] = useState<"All" | "N5" | "N4" | "N3" | "N2" | "N1">("All");
  const [search, setSearch] = useState("");

  const filteredGrammar = grammarPoints.filter((gp) => {
    const matchLevel = levelFilter === "All" || gp.level === levelFilter;
    const matchKeyword =
      gp.title.toLowerCase().includes(search.toLowerCase()) ||
      gp.meaning.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchKeyword;
  });

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Cari grammar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value as any)}
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

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Grammar</th>
              <th className="px-4 py-2 text-left">Arti</th>
              <th className="px-4 py-2 text-center">Level</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrammar.map((gp) => (
              <tr key={gp.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{gp.title}</td>
                <td className="px-4 py-2">{gp.meaning}</td>
                <td className="px-4 py-2 text-center">
                  <Badge variant={gp.level.toLowerCase() as any}>{gp.level}</Badge>
                </td>
                <td className="px-4 py-2 text-center italic">{gp.status}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => dispatch(markGrammarLearning(gp.id))}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Mulai
                  </button>
                  <button
                    onClick={() => dispatch(markGrammarMastered(gp.id))}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    Hafal
                  </button>
                </td>
              </tr>
            ))}
            {filteredGrammar.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  📭 Tidak ada grammar ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
