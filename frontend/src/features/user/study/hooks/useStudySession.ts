import { useState, useEffect, useMemo } from "react";
import { shuffleArray } from "@/utils/shuffleArray";

interface StudyConfig {
  itemsPerSet: number;
  totalSets: number;
  duration: number;
  breakDuration: number;
  level?: string;
}

interface StudyItem {
  id: number;
  level?: string;
  [key: string]: any;
}

export function useStudySession<T extends StudyItem>(
  allItems: T[],
  config: StudyConfig,
  onFinish?: (progress: any) => void
) {
  const [currentSet, setCurrentSet] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [breakTimeLeft, setBreakTimeLeft] = useState(config.breakDuration);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<{ id: number; status: string }[]>(
    []
  );

  const sessionItems = useMemo(() => {
    const remaining = allItems.filter((i) => !masteredIds.has(i.id));
    const filtered =
      config.level === "All"
        ? remaining
        : remaining.filter((i) => i.level === config.level);
    return shuffleArray(filtered).slice(0, config.itemsPerSet);
  }, [allItems, masteredIds, config]);

  const currentItem = sessionItems[currentIndex];

  useEffect(() => {
    if (!paused && !isBreak && !finished) {
      const timer = setInterval(() => setTotalTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [paused, isBreak, finished]);

  const handleNext = (status = "learned") => {
    if (!currentItem) return;
    setProgress((prev) => [...prev, { id: currentItem.id, status }]);
    if (status === "mastered")
      setMasteredIds((prev) => new Set([...prev, currentItem.id]));

    if (currentIndex + 1 < sessionItems.length) {
      setCurrentIndex((i) => i + 1);
    } else if (currentSet < config.totalSets) {
      setIsBreak(true);
      setBreakTimeLeft(config.breakDuration);
    } else {
      setFinished(true);
      onFinish?.(progress);
    }
  };

  const handleBreakEnd = () => {
    setIsBreak(false);
    setPaused(false);
    setCurrentSet((s) => s + 1);
    setCurrentIndex(0);
  };

  return {
    currentSet,
    currentIndex,
    sessionItems,
    currentItem,
    paused,
    setPaused,
    finished,
    isBreak,
    breakTimeLeft,
    totalTime,
    handleNext,
    handleBreakEnd,
    progress,
  };
}
