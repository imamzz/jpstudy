import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import logo from "@/assets/timer.png";
import { authService } from "@/services/authService";
import { logout as logoutAction } from "@/features/profile/userSlice";
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
      await authService.logout();
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      dispatch(logoutAction());
      navigate("/login", { replace: true });
    }
  };

  const baseClass =
    "nav-item group block px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2";
  const activeClass = "bg-blue-700 text-white scale-105";
  const hoverClass = "hover:bg-blue-700 hover:text-white hover:scale-105";

  return (
    <aside className="w-64 border-r border-gray-200 min-h-screen max-h-screen px-12 py-6 flex flex-col justify-between sticky top-0">
      <div className="flex items-center flex-col">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-md font-semibold">{user?.username}</p>
      </div>

      <nav className="space-y-2">
        {role === "admin" && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <IconHome className="w-6 h-6 [stroke-width:1.5]" />
            Dashboard
          </NavLink>
        )}

        {role === "user" && (
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <IconHome className="w-6 h-6 [stroke-width:1.5]" />
            Home
          </NavLink>
        )}

        {role === "user" && (
          <NavLink
            to="/vocab"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <IconVocab className="w-6 h-6 [stroke-width:1.5]" />
            Vocab
          </NavLink>
        )}

        {role === "user" && (
          <NavLink
            to="/grammar"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <IconGrammar className="w-6 h-6 [stroke-width:1.5]" />
            Grammar
          </NavLink>
        )}

        {role === "user" && (
          <NavLink
            to="/kanji"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <IconKanji className="w-6 h-6 [stroke-width:1.5]" />
            Kanji
          </NavLink>
        )}

        {role === "user" && (
          <NavLink
            to="/review"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            <IconReview className="w-6 h-6 [stroke-width:1.5]" />
            Review
          </NavLink>
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
