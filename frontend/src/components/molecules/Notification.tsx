interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

// ketika di klik diluar menutup

export default function Notification({ isOpen, onClose }: NotificationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-57 z-[9999]">
      <div className="w-[360px] max-h-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          <button
            onClick={onClose}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            See All
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[280px] overflow-y-auto flex flex-col divide-y divide-gray-100">
          <div className="px-4 py-3 hover:bg-blue-50 transition-colors cursor-pointer">
            <h3 className="font-medium text-gray-800 text-sm mb-1">New Achievement!</h3>
            <p className="text-gray-600 text-xs leading-snug">
              Kamu telah mencapai target hafalan 10 kata baru hari ini 🎉
            </p>
            <p className="text-gray-400 text-[11px] mt-1">2 jam lalu</p>
          </div>

          <div className="px-4 py-3 hover:bg-blue-50 transition-colors cursor-pointer">
            <h3 className="font-medium text-gray-800 text-sm mb-1">Weekly Progress</h3>
            <p className="text-gray-600 text-xs leading-snug">
              Aktivitas belajar kamu meningkat 15% dibanding minggu lalu.
            </p>
            <p className="text-gray-400 text-[11px] mt-1">Kemarin</p>
          </div>

          <div className="px-4 py-3 hover:bg-blue-50 transition-colors cursor-pointer">
            <h3 className="font-medium text-gray-800 text-sm mb-1">Reminder</h3>
            <p className="text-gray-600 text-xs leading-snug">
              Jangan lupa review kembali kata “学ぶ (manabu)” hari ini.
            </p>
            <p className="text-gray-400 text-[11px] mt-1">1 hari lalu</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center py-3 bg-white border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
}
