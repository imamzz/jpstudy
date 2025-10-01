import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";


function Home() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">🏠 Home</h1>
      </div>

      {/* Sapaan User */}
      <div className="mb-6">
        <p className="text-md text-gray-700">
          Selamat datang kembali, <span className="font-semibold">{user?.username}!</span> 👋
        </p>
        <p className="text-sm text-gray-500">
          Pilih menu di bawah untuk mulai belajar.
        </p>
      </div>

      {/* Menu Navigasi */} 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link
          to="/vocab"
          className="p-6 bg-blue-100 text-blue-700 font-semibold rounded-xl shadow hover:bg-blue-200 hover:scale-105 transition text-center"
        >
          📖 Vocab
        </Link>
        <Link
          to="/grammar"
          className="p-6 bg-green-100 text-green-700 font-semibold rounded-xl shadow hover:bg-green-200 hover:scale-105 transition text-center"
        >
          ✍️ Grammar
        </Link>
        <Link
          to="/kanji"
          className="p-6 bg-yellow-100 text-yellow-700 font-semibold rounded-xl shadow hover:bg-yellow-200 hover:scale-105 transition text-center"
        >
          🈶 Kanji
        </Link>
        <Link
          to="/review"
          className="p-6 bg-purple-100 text-purple-700 font-semibold rounded-xl shadow hover:bg-purple-200 hover:scale-105 transition text-center"
        >
          🔄 Review
        </Link>
      </div>
    </div>
  );
}

export default Home;
