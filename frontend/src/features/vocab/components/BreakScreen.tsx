import { useEffect } from "react";

interface BreakScreenProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  onStartNow: () => void;
}

export default function BreakScreen({
  timeLeft,
  setTimeLeft,
  onStartNow,
}: BreakScreenProps) {
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
    <div className="flex flex-col items-center justify-center space-y-4 px-12 py-12 border rounded-lg shadow bg-white border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">
        Istirahat sebentar 🧘‍♂️
      </h2>
      <p className="text-md text-gray-600">
        Set berikutnya akan dimulai dalam <b>{timeLeft}</b> detik.
      </p>
    </div>
  );
}
