import IconClose from "@/assets/icon/close.png";

const Reminder = () => {
    return (
        <div className="w-full max-w-6xl border border-gray-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-600">Daily</p>
                <div className="icon w-6 h-6 cursor-pointer">
                    <img src={IconClose} alt="IconClose" />
                </div>
            </div>
            <div>
                <p className="text-md">Saatnya belajar 10 kata baru hari ini.</p>
            </div>
        </div>
    )
}

export default Reminder