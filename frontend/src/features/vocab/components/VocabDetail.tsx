import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVocabById, type Vocab } from "../../../api/vocab";
import { ArrowLeft, BookOpen } from "lucide-react";

function VocabDetail() {
  const { id } = useParams<{ id: string }>();
  const [vocab, setVocab] = useState<Vocab | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchVocab(id);
  }, [id]);

  const fetchVocab = async (vocabId: string) => {
    try {
      setLoading(true);
      const data = await getVocabById(vocabId);
      setVocab(data);
    } catch (err) {
      console.error("Error fetching vocab detail:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading detail...</p>;
  }

  if (!vocab) {
    return <p className="text-center mt-10 text-red-600">Vocab tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <Link
        to="/user/vocab"
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft size={18} className="mr-1" /> Kembali ke daftar vocab
      </Link>

      {/* Header */}
      <div className="flex items-center mb-6">
        <BookOpen className="text-blue-600 w-8 h-8 mr-2" />
        <h1 className="text-2xl font-bold text-blue-700">Detail Vocabulary</h1>
      </div>

      {/* Detail Card */}
      <div className="bg-white shadow rounded-lg border border-gray-200 p-6">
        <h2 className="text-3xl font-bold mb-2">{vocab.kanji || vocab.word}</h2>
        <p className="text-lg text-gray-700 mb-1">Kana: {vocab.word}</p>
        <p className="text-lg text-gray-700 mb-1">Romaji: {vocab.romaji}</p>
        <p className="text-lg text-gray-700 mb-1">Meaning: {vocab.meaning}</p>
        <p className="text-lg text-gray-700 mb-1">Level: {vocab.level}</p>
      </div>

      {/* Example Sentences (opsional kalau backend support) */}
      {vocab.examples && vocab.examples.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Contoh Kalimat</h3>
          <ul className="space-y-2">
            {vocab.examples.map((ex, idx) => (
              <li
                key={idx}
                className="p-3 bg-gray-50 border border-gray-200 rounded"
              >
                <p className="font-medium">{ex.jp}</p>
                <p className="text-gray-600 text-sm">{ex.id}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VocabDetail;
