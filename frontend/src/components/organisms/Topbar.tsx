// import { useTranslation } from "react-i18next";
// import Select from "../atoms/Select"; 
import IconNotification from "@/assets/icon/fire-svgrepo-com 1.png";
import IconFire from "@/assets/icon/notification.png";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  // const { i18n } = useTranslation();

  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  const location = useLocation();
    // Mapping route → judul halaman
  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/home": "Home",
    "/vocab": "Vocabulary",
    "/grammar": "Grammar",
    "/kanji": "Kanji",
    "/review": "Review",
  };

  // Ambil judul sesuai path aktif (default: Halaman)
  const title = pageTitles[location.pathname] || "Halaman";

  return (
    <header className="w-full py-4 px-12 flex justify-between sticky top-0 bg-white">
      {/* title halaman contoh, dashboard, home, dll. bisa diganti sesuai dengan halaman atau route */}
      <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
      <div className="flex items-center gap-2">

        {/* <Select
          options={[
            { value: "id", label: "Bahasa Indonesia" },
            { value: "en", label: "English" },
            { value: "ja", label: "Bahasa Jepang" },
          ]}
          value={i18n.language}
          onChange={(value) => changeLanguage(value)}
        /> */}

        {/* icon notification dan fire */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 cursor-pointer">
            <img src={IconNotification} alt="IconNotification" />
          </div>
          <div className="w-6 h-6 cursor-pointer">
            <img src={IconFire} alt="IconFire" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
