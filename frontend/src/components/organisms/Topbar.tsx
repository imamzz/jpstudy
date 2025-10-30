import IconNotification from "@/assets/icon/Notification.svg?react";
import IconFire from "@/assets/icon/fire-filled.svg?react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Notification from "@/components/molecules/Notification";

const Topbar = () => {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/home": "Home",
    "/vocab": "Vocabulary",
    "/grammar": "Grammar",
    "/kanji": "Kanji",
    "/review": "Review",
  };

  const [showNotification, setShowNotification] = useState(false);
  const title = pageTitles[location.pathname] || "Halaman";

  return (
    <>
      <header className="w-full py-4 px-12 flex justify-between sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowNotification(!showNotification)}
            >
              <IconNotification className="w-6 h-6" />
            </div>
            <div className="w-6 h-6 cursor-pointer">
              <IconFire className="w-6 h-6" />
            </div>
          </div>
        </div>
      </header>

      {/* Render Notification di luar header */}
      <Notification isOpen={showNotification} onClose={() => setShowNotification(false)} />
    </>
  );
};

export default Topbar;
