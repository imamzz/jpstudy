import { useEffect } from "react";

interface BreakScreenProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  onStartNow: () => void;
}

export default function BreakScreen({ timeLeft, setTimeLeft, onStartNow }: BreakScreenProps) {
  // Timer otomatis berkurang setiap detik
  useEffect(() => {
    if (timeLeft <= 0) {
      onStartNow(); // otomatis lanjut ke set berikutnya
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onStartNow, setTimeLeft]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 border rounded-lg shadow bg-white">
      <h2 className="text-2xl font-semibold text-gray-800">Istirahat sebentar 🧘‍♂️</h2>
      <p className="text-lg text-gray-600">
        Set berikutnya akan dimulai dalam <b>{timeLeft}</b> detik.
      </p>
      <button
        onClick={onStartNow}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all"
      >
        Mulai Sekarang
      </button>
    </div>
  );
}
