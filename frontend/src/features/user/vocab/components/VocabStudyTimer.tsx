import { useEffect, useState } from "react";
import clock from "@/assets/timer.png";

interface StudyTimerProps {
  duration: number;
  paused: boolean;
  onTimeUp: () => void;
  totalDuration: number;
}

export default function StudyTimer({
  duration,
  paused,
  onTimeUp,
  totalDuration,
}: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // ⏱️ Hitung waktu mundur
  useEffect(() => {
    if (paused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [paused, timeLeft]);

  // ✅ Efek terpisah untuk menangani waktu habis
  useEffect(() => {
    if (timeLeft === 0 && !paused) {
      onTimeUp();
    }
  }, [timeLeft, paused, onTimeUp]);

  // 🔁 Reset ketika durasi berubah
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // format mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex w-[250px] h-[250px] p-3 flex-col items-center justify-center gap-5 aspect-square rounded-lg border border-gray-200">
      <div className="icon">
        <img src={clock} alt="Timer" />
      </div>
      <div className="text flex flex-col items-center">
        <h1 className="count-time text-8xl font-bold text-red-600">
          {formatTime(timeLeft)}
        </h1>
        <p className="total-time text-md text-gray-500">
          Total belajar: {formatTime(totalDuration)}
        </p>
      </div>
    </div>
  );
}
