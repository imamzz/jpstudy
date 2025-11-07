import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useState, useRef } from "react";
import logo from "@/assets/timer.png";
import { authService } from "@/services/authService";
import { logout as logoutAction } from "@/features/profile/userSlice";
import Button from "../atoms/Button";
import IconHome from "@/assets/icon/home.svg?react";
import IconVocab from "@/assets/icon/book.svg?react";
import IconGrammar from "@/assets/icon/book-open.svg?react";
import IconKanji from "@/assets/icon/kanji.svg?react";
import IconReview from "@/assets/icon/clock.svg?react";
import IconProfile from "@/assets/icon/profile.svg?react";

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

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownTimeout = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = window.setTimeout(() => {
      setOpenDropdown(false);
    }, 400);
  };

  const baseClass =
    "nav-item group block px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2";
  const activeClass = "bg-blue-700 text-white scale-105";
  const hoverClass = "hover:bg-blue-700 hover:text-white hover:scale-105";
  const baseIconClass = "w-5 h-5 [stroke-width:1.5]";

  const menus =
    role === "admin"
      ? [
          { to: "/dashboard", label: "Dashboard", icon: <IconHome className={baseIconClass} /> },
          { to: "/vocabs", label: "Vocab", icon: <IconVocab className={baseIconClass} /> },
        ]
      : [
          { to: "/home", label: "Home", icon: <IconHome className={baseIconClass} /> },
          { to: "/vocab", label: "Vocab", icon: <IconVocab className={baseIconClass} /> },
          { to: "/grammar", label: "Grammar", icon: <IconGrammar className={baseIconClass} /> },
          { to: "/kanji", label: "Kanji", icon: <IconKanji className={baseIconClass} /> },
          { to: "/review", label: "Review", icon: <IconReview className={baseIconClass} /> },
          { to: "/profile", label: "Profile", icon: <IconProfile className={baseIconClass} /> },
        ];

  return (
    <aside className="w-64 border-r border-gray-200 min-h-screen max-h-screen px-6 py-6 flex flex-col justify-between sticky top-0">
      <div className="flex items-center flex-col">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-md font-semibold">{user?.username}</p>
      </div>

      <nav className="space-y-2">
        {menus.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : hoverClass}`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <div
        className="relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={`w-full cursor-pointer block px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2
            hover:bg-blue-700 hover:text-white hover:scale-105
            ${openDropdown ? "bg-blue-700 text-white scale-105" : ""}`}
        >
          <IconVocab className={baseIconClass} />
          More
        </button>

        {openDropdown && (
          <div className="absolute z-50 left-55 bottom-[-2px] mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-200">
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-blue-700 hover:text-white rounded-t-xl cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>

            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-blue-700 hover:text-white rounded-b-xl cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
