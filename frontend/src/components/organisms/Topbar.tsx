import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { logout as logoutAction } from "@/features/user/userSlice";
import { authApi } from "@/api/auth"; // ✅ panggil API logout
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    try {
      // 1. Panggil backend untuk hapus refresh token cookie
      await authApi.logout();

      // 2. Clear redux state
      
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      // ✅ clear redux state dulu
      dispatch(logoutAction());
  
      // ✅ redirect cepat ke login
      navigate("/login", { replace: true });
    }
  };


  return (
    <header className="w-full bg-white shadow p-4 flex justify-end">
      <div className="flex items-center gap-2">
        <button onClick={() => changeLanguage("id")}>{t("id")}</button>
        <button onClick={() => changeLanguage("en")}>{t("en")}</button>
        <button onClick={() => changeLanguage("ja")}>{t("ja")}</button>

        <p className="text-lg font-semibold">{user?.username}</p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
