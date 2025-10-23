import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { ArrowLeft } from "lucide-react";

export default function GrammarDetail() {
  const { id } = useParams<{ id: string }>();
  const grammarPoint = useAppSelector((state) =>
    state.grammar.points.find((g) => g.id === Number(id))
  );

  if (!grammarPoint) {
    return <p className="text-center mt-10 text-red-500">Grammar tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <Link to="/grammar" className="text-blue-600 hover:underline flex items-center">
        <ArrowLeft size={18} className="mr-1" /> Kembali
      </Link>

      <h1 className="text-2xl font-bold text-blue-700">{grammarPoint.title}</h1>
      <p className="text-gray-700">Arti: {grammarPoint.meaning}</p>
      <p className="text-gray-500 italic">Level: {grammarPoint.level}</p>

      <div className="mt-4">
        <h2 className="font-semibold mb-2">Contoh:</h2>
        <ul className="list-disc list-inside space-y-1">
          {grammarPoint.examples.map((ex, i) => (
            <li key={i} className="text-gray-700">{ex}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
