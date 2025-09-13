import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
const Topbar = () => {
  const { logout, user } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <header className="w-full bg-white shadow p-4 flex justify-end">
      <div className="flex items-center gap-2">
      <button onClick={() => changeLanguage("id")}>{t("id")}</button>
      <button onClick={() => changeLanguage("en")}>{t("en")}</button>
      <button onClick={() => changeLanguage("ja")}>{t("ja")}</button>
        <p className="text-lg font-semibold">{user?.username}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Topbar;
