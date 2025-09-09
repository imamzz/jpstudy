import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">JPStudy</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/vocab" className="block p-2 rounded hover:bg-gray-700">
          Vocab
        </Link>
        <Link to="/grammar" className="block p-2 rounded hover:bg-gray-700">
          Grammar
        </Link>
        <Link to="/kanji" className="block p-2 rounded hover:bg-gray-700">
          Kanji
        </Link>
        <Link to="/review" className="block p-2 rounded hover:bg-gray-700">
          Review
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
