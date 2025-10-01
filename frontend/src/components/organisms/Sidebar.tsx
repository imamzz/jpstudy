import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import logo from "@/assets/timer.png";
import { authService } from "@/services/authService";
import { useAppDispatch } from "@/app/hooks";
import { logout as logoutAction } from "@/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import IconHome from "@/assets/icon/home.svg?react";
import IconVocab from "@/assets/icon/book.svg?react";
import IconGrammar from "@/assets/icon/book-open.svg?react";
import IconKanji from "@/assets/icon/kanji.svg?react";
import IconReview from "@/assets/icon/clock.svg?react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, role } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      // Panggil backend untuk hapus refresh token cookie
      await authService.logout();
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      dispatch(logoutAction());
      navigate("/login", { replace: true });
    }
  };
  return (
    <aside className="w-64 border-r border-gray-200 min-h-screen max-h-screen px-12 py-6 flex flex-col justify-between sticky top-0">
      <div className="flex items-center flex-col">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-md font-semibold">{user?.username}</p>
      </div>
      <nav className="space-y-2">
        {role === "admin" && (
          <Link
            to="/dashboard"
            className="group block px-3 py-2 rounded-xl hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IconHome className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300 [stroke-width:1.5] group-hover:[stroke-width:2]" />
            Dashboard
          </Link>
        )}
        {role === "user" && (
          <Link
            to="/home"
            className="group block px-3 py-2 rounded-xl hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IconHome className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300 [stroke-width:1.5] group-hover:[stroke-width:2]" />
            Home
          </Link>
        )}
        {role === "user" && (
          <Link
            to="/vocab"
            className="group block px-3 py-2 rounded-xl hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IconVocab className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300 [stroke-width:1.5] group-hover:[stroke-width:2]" />
            Vocab
          </Link>
        )}
        {role === "user" && (
          <Link
            to="/grammar"
            className="group block px-3 py-2 rounded-xl hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IconGrammar className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300 [stroke-width:1.5] group-hover:[stroke-width:2]" />
            Grammar
          </Link>
        )}
        {role === "user" && (
          <Link
            to="/kanji"
            className="group block px-3 py-2 rounded-xl hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IconKanji className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300 [stroke-width:1.5] group-hover:[stroke-width:1.5]" />
            Kanji
          </Link>
        )}
        {role === "user" && (
          <Link
            to="/review"
            className="group block px-3 py-2 rounded-xl hover:bg-blue-700 hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <IconReview className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300 [stroke-width:1.5] group-hover:[stroke-width:2]" />
            Review
          </Link>
        )}
      </nav>
      <div className="flex items-center justify-center w-full h-[150px]">
        <Button onClick={handleLogout} variant="outline" size="md">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
