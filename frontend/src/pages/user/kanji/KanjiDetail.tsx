import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import KanjiDetail from "@/features/kanji/components/KanjiDetail";

export default function KanjiDetail() {
    const { id } = useParams<{ id: string }>();
    const kanji = useAppSelector((state) => state.kanji.items.find((k) => k.id === Number(id)));

    if (!kanji) return <p>Kanji tidak ditemukan</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-red-700">Detail Kanji</h1>
            <KanjiDetail />
        </div>
    );
}