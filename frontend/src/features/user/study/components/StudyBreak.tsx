// features/study/components/StudyBreak.tsx
import { useEffect, useState } from "react";

interface StudyBreakProps {
  timeLeft: number;
  onStartNow: () => void;
}

export default function StudyBreak({ timeLeft, onStartNow }: StudyBreakProps) {
  const [localLeft, setLocalLeft] = useState<number>(timeLeft);

  // sinkron ketika prop berubah (mis. user skip atau reset)
  useEffect(() => {
    setLocalLeft(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (localLeft <= 0) {
      onStartNow();
      return;
    }
    const t = setTimeout(() => setLocalLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [localLeft, onStartNow]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-12 py-12 border rounded-lg shadow bg-white border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800">Istirahat sebentar 🧘‍♂️</h2>
      <p className="text-md text-gray-600">
        Set berikutnya akan dimulai dalam <b>{localLeft}</b> detik.
      </p>
    </div>
  );
}
