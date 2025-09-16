import { useEffect, useState } from "react";

interface StudyTimerProps {
  duration: number; // detik
  paused: boolean;
  onTimeUp: () => void;
}

export default function StudyTimer({ duration, paused, onTimeUp }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (paused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paused, timeLeft, onTimeUp]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // format detik → mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-red-600">
        ⏳ {formatTime(timeLeft)}
      </p>
    </div>
  );
}
