import { useAppSelector } from "@/app/hooks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function KanjiDetail() {
    const { id } = useParams<{ id: string }>();
    const kanji = useAppSelector((state) => state.kanji.kanjis.find((k) => k.id === Number(id)));

    if(!kanji) return <p>Kanji tidak ditemukan</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <Link to="/kanji" className="text-blue-600 hover:underline flex items-center">
                <ArrowLeft size={18} className="mr-1" /> Kembali
            </Link>
            <div className="flex justify-between">
                <h1>{kanji.kanji}</h1>
                <p>{kanji.arti}</p>
                <p>{kanji.level}</p>
                <p>{kanji.status}</p>
            </div>
            <div className="flex justify-between">
                <h2>Penjelasan</h2>
                <p>{kanji.penjelasan}</p>
            </div>
            <div className="flex justify-between">
                <h2>Contoh</h2>
                <p>{kanji.contoh}</p>
            </div>
            <div className="flex justify-between">
                <h2>Stroke Order</h2>
                <p>{kanji.stroke_order}</p>
            </div>
        </div>
    );
}