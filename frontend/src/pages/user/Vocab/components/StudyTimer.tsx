// src/pages/user/vocab/components/StudyTimer.tsx
import { useState, useEffect } from "react";

interface StudyTimerProps {
  duration: number; // detik per kata
  paused: boolean;
  onTimeUp: () => void;
}

export default function StudyTimer({ duration, paused, onTimeUp }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (paused) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, timeLeft, onTimeUp]);

  return (
    <div className="text-xl font-bold">
      ⏱ {timeLeft}s
    </div>
  );
}
