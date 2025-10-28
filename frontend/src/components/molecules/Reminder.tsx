import { useEffect, useState } from "react";
import IconClose from "@/assets/icon/close.svg?react";

const Reminder = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const dismissedDate = localStorage.getItem("dismissedReminderDate");

    if (dismissedDate === today) {
      setHidden(true);
    }
  }, []);

  const handleClose = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("dismissedReminderDate", today);
    setHidden(true);
  };

  if (hidden) return null;

  return (
    <div className="w-full max-w-6xl border border-gray-200 rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-gray-600">Daily</p>
        <div className="icon w-6 h-6 cursor-pointer">
          <IconClose onClick={handleClose} />
        </div>
      </div>
      <div>
        <p className="text-md">Saatnya belajar 10 kata baru hari ini.</p>
      </div>
    </div>
  );
};

export default Reminder;
