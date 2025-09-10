import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { role } = useAuth();
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">JPStudy</h2>
      <nav className="space-y-2">
        {role === "admin" && (
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
            Dashboard
          </Link>
        )}
        {role === "user" && (
          <Link to="/home" className="block p-2 rounded hover:bg-gray-700">
            Home
          </Link>
        )}
        {role === "user" && (
          <Link to="/vocab" className="block p-2 rounded hover:bg-gray-700">
            Vocab
          </Link>
        )}
        {role === "user" && (
          <Link to="/grammar" className="block p-2 rounded hover:bg-gray-700">
            Grammar
          </Link>
        )}
        {role === "user" && (
          <Link to="/kanji" className="block p-2 rounded hover:bg-gray-700">
            Kanji
          </Link>
        )}
        {role === "user" && (
          <Link to="/review" className="block p-2 rounded hover:bg-gray-700">
            Review
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
