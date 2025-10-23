// src/features/grammar/components/StudyTimer.tsx
import { useEffect, useState } from "react";

interface StudyTimerProps {
  duration: number;       // dalam detik
  onTimeUp: () => void;   // callback waktu habis
  paused?: boolean;       // status pause
}

export default function StudyTimer({ duration, onTimeUp, paused = false }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (paused) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, paused, onTimeUp]);

  // format waktu mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-lg font-medium text-blue-600">
      ⏱ {formatTime(timeLeft)}
    </div>
  );
}
