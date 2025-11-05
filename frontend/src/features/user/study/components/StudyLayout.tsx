import React from "react";
import Badge from "@/components/atoms/Badge";
import StudyProgress from "./StudyProgress";
import StudyControls from "./StudyControls";
import StudyTimer from "./StudyTimer";
import StudyBreak from "./StudyBreak";
import StudySummary from "./StudySummary";
import Button from "@/components/atoms/Button";

type AnyStudyHook<T> = ReturnType<
  typeof import("../hooks/useStudySession").useStudySession
>;

export default function StudyLayout<T extends { id: number; level?: string }>({
  title,
  level,
  config,
  studyHook,
  renderItem,
}: {
  title: string;
  level: string;
  config: {
    itemsPerSet: number;
    totalSets: number;
    duration: number;
    breakDuration: number;
    level?: string;
  };
  studyHook: AnyStudyHook<T>;
  renderItem: (item?: T) => React.ReactNode;
}) {
  const {
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
  } = studyHook as AnyStudyHook<T>;

  // Pastikan ada fallback
  const safeTotalSets = Math.max(1, config.totalSets || 1);
  const clampedCurrentSet = Math.min(
    Math.max(1, currentSet || 1),
    safeTotalSets
  );
  const setProgressUnclamped = (clampedCurrentSet / safeTotalSets) * 100;
  const setProgress = Math.max(0, Math.min(setProgressUnclamped, 100));

  const itemsInThisSet = sessionItems?.length ?? config.itemsPerSet ?? 0;
  let totalItemsProgress = 100;
  if (itemsInThisSet > 0) {
    const ratio = (currentIndex + 1) / itemsInThisSet;
    totalItemsProgress = Math.max(0, Math.min(ratio * 100, 100));
  }

  if (finished) {
    // hitung statistik summary (kamu bisa mengganti sesuai struktur `studyHook.progress`)
    const learnedCount = (studyHook.progress || []).filter(
      (p: any) => p.status === "learned"
    ).length;
    const masteredCount = (studyHook.progress || []).filter(
      (p: any) => p.status === "mastered"
    ).length;
    const totalLearned = learnedCount + masteredCount;
    const notLearned = config.itemsPerSet * config.totalSets - totalLearned;

    return (
      <StudySummary
        totalItems={config.itemsPerSet}
        totalSets={config.totalSets}
        learnedCount={totalLearned}
        notLearnedCount={notLearned}
        totalTime={totalTime}
      />
    );
  }

  return (
    <div className="py-12 flex flex-col items-center space-y-6 w-full mx-auto min-h-[calc(100vh)] max-h-[calc(100vh)] justify-between">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between w-full max-w-6xl mb-4">
          <p className="font-medium text-gray-700">{title}</p>
          {/* kalau Badge menerima BadgeVariant, cast level ke tipe itu */}
          <Badge variant={level as any}>{level}</Badge>
        </div>

        <StudyProgress
          currentSet={currentSet}
          totalSets={config.totalSets}
          currentIndex={currentIndex}
          itemsPerSet={config.itemsPerSet}
          setProgress={setProgress}
          totalItemsProgress={totalItemsProgress}
        />
      </div>

      {isBreak ? (
        <>
          <StudyBreak timeLeft={breakTimeLeft} onStartNow={handleBreakEnd} />
          <div className="w-full flex justify-center items-center flex-col">
            <hr className="w-full mb-12 border border-gray-200" />
            <div className="flex space-x-2 justify-between w-full max-w-6xl items-center">
              <Button
                disabled={paused}
                variant="disabled"
                size="md"
                className="self-start w-[100px] border border-gray-200"
              >
                Skip
              </Button>
              <Button onClick={handleBreakEnd} variant="primary" size="md">
                Mulai Sekarang
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 🔹 Wrapper dua kolom: WordDisplay + Timer */}
          <div className="flex space-x-10 mt-4 w-full max-w-6xl justify-center">
            {currentItem ? (
              renderItem(currentItem as any)
            ) : (
              <div className="text-gray-500 text-center py-12 flex-1">
                Menyiapkan item...
              </div>
            )}

            <StudyTimer
              paused={paused}
              duration={config.duration}
              onTimeUp={() => handleNext("learned")}
              totalDuration={totalTime}
            />
          </div>

          {/* 🔹 Controls di bawah */}
          <StudyControls
            paused={paused}
            onPauseToggle={() => setPaused(!paused)}
            onNext={() => handleNext("learned")}
            onMastered={() => handleNext("mastered")}
          />
        </>
      )}
    </div>
  );
}
