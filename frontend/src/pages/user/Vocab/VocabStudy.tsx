import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import WordDisplay from "@/features/vocab/components/WordDisplay";
import StudyTimer from "@/features/vocab/components/StudyTimer";
import BreakScreen from "@/features/vocab/components/BreakScreen";
import Badge, { type BadgeVariant } from "@/components/atoms/Badge";
import VocabStudyProgress from "@/features/vocab/components/VocabStudyProgress";
import VocabStudySummary from "@/features/vocab/components/VocabStudySummary";
import VocabStudyControls from "@/features/vocab/components/VocabStudyControls";
import { shuffleArray } from "@/utils/vocabHelpers";
import Button from "@/components/atoms/Button";
import type { LevelVariant } from "@/types/common";
import { fetchVocabStudy } from "@/features/vocab/vocabStudySlice";
import privateApi from "@/base/privateApi";

export default function VocabStudy() {
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.vocabStudy.studyWords) || [];
  const { config } = useAppSelector((state) => state.config);

  useEffect(() => {
    dispatch(fetchVocabStudy());
  }, [dispatch]);

  const studyConfig = {
    wordsPerSet: config.limit || 10,
    totalSets: config.totalSets || 3,
    duration: config.duration || 10,
    level: (config.targetLevel as LevelVariant) || "N5",
    breakDuration: config.breakDuration || 90,
  };

  // === STATE ===
  const [currentSet, setCurrentSet] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(studyConfig.breakDuration);

  // progress lokal (belum dikirim)
  const [progressData, setProgressData] = useState<{ vocab_id: number; status: string }[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());

  // === FILTER KATA ===
  const filteredWords = useMemo(() => {
    if (!Array.isArray(words)) return [];

    // hanya kata yang belum mastered di sesi ini
    const availableWords = words.filter((w) => !masteredIds.has(w.id));

    // hanya level sesuai config
    const levelWords =
      studyConfig.level === "All"
        ? shuffleArray(availableWords)
        : shuffleArray(availableWords.filter((w) => w.level === studyConfig.level));

    return levelWords.slice(0, studyConfig.wordsPerSet);
  }, [words, masteredIds, studyConfig.level, studyConfig.wordsPerSet]);

  const currentWord = filteredWords[currentWordIndex];

  // === PROGRESS BAR ===
  const setProgress = (currentSet / studyConfig.totalSets) * 100;
  const totalKataProgress = ((currentWordIndex + 1) / studyConfig.wordsPerSet) * 100;

  // === TIMER ===
  useEffect(() => {
    if (finished || paused || isBreak) return;
    const interval = setInterval(() => setTotalTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [finished, paused, isBreak]);

  useEffect(() => {
    if (!isBreak) return;
    if (breakTimeLeft > 0) {
      const timer = setTimeout(() => setBreakTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isBreak, breakTimeLeft]);

  // === NEXT WORD ===
  const handleNextWord = (status = "learned") => {
    if (!currentWord) return;

    // simpan progress ke lokal
    setProgressData((prev) => [...prev, { vocab_id: currentWord.id, status }]);

    // kalau mastered → tambahkan ke daftar agar tidak muncul lagi
    if (status === "mastered") {
      setMasteredIds((prev) => new Set([...prev, currentWord.id]));
    }

    // lanjut kata berikut
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      return;
    }

    // lanjut ke set berikutnya atau selesai
    if (currentSet < studyConfig.totalSets) {
      setPaused(true);
      setIsBreak(true);
      setBreakTimeLeft(studyConfig.breakDuration);
      return;
    }

    // kalau semua selesai
    setFinished(true);
  };

  const handleMarkMastered = () => {
    if (isBreak || finished) return;
    handleNextWord("mastered");
  };

  const handleNext = () => {
    if (isBreak || finished) return;
    handleNextWord("learned");
  };

  const handleTimeUp = () => {
    if (isBreak || finished) return;
    handleNextWord("learned");
  };

  // === SELESAI ISTIRAHAT ===
  const handleBreakEnd = async () => {
    setIsBreak(false);
    setPaused(false);
    setCurrentSet((prev) => prev + 1);
    setCurrentWordIndex(0);
    setBreakTimeLeft(studyConfig.breakDuration);
  };

  // === SAAT SELESAI SEMUA SET ===
  useEffect(() => {
    const sendBulkProgress = async () => {
      if (!finished || progressData.length === 0) return;
      try {
        const payload = {
          items: progressData.map((p) => ({
            id: p.vocab_id,
            status: p.status,
          })),
        };
  
        console.log("📦 Sending bulk progress:", JSON.stringify(payload, null, 2));
        await privateApi.post("/vocab-progress/bulk", payload);
        console.log("✅ Bulk progress saved successfully!");
      } catch (err) {
        console.error("❌ Failed to save bulk progress:", err);
      }
    };
  
    sendBulkProgress();
  }, [finished, progressData]);
  

  // === SUMMARY ===
  if (finished) {
    const learnedCount = progressData.filter((p) => p.status === "learned").length;
    const masteredCount = progressData.filter((p) => p.status === "mastered").length;
    const notLearnedCount =
      studyConfig.wordsPerSet * studyConfig.totalSets - (learnedCount + masteredCount);

    return (
      <VocabStudySummary
        totalWords={studyConfig.wordsPerSet}
        totalSets={studyConfig.totalSets}
        learnedCount={learnedCount + masteredCount}
        notLearnedCount={notLearnedCount}
        totalTime={totalTime}
        config={studyConfig}
      />
    );
  }

  // === LOADING GUARD ===
  if (!filteredWords.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading vocab data...</p>
      </div>
    );
  }

  // === RENDER ===
  return (
    <div className="py-12 flex flex-col items-center space-y-6 w-full mx-auto min-h-[calc(100vh)] max-h-[calc(100vh)] justify-between">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium text-gray-700">Vocab Study</p>
          <Badge variant={studyConfig.level as BadgeVariant} size="md">
            {studyConfig.level}
          </Badge>
        </div>

        <VocabStudyProgress
          currentSet={currentSet}
          totalSets={studyConfig.totalSets}
          currentIndex={currentWordIndex}
          wordsPerSet={studyConfig.wordsPerSet}
          setProgress={setProgress}
          totalKataProgress={totalKataProgress}
        />
      </div>

      {isBreak ? (
        <>
          <BreakScreen
            timeLeft={breakTimeLeft}
            setTimeLeft={setBreakTimeLeft}
            onStartNow={handleBreakEnd}
          />
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
          <div className="flex space-x-10 mt-4 w-full max-w-6xl justify-center">
            {currentWord && (
              <WordDisplay
                kanji={currentWord.kanji}
                kana={currentWord.kana}
                romaji={currentWord.romaji}
                meaning={currentWord.meaning}
              />
            )}
            <StudyTimer
              key={`${currentSet}-${currentWordIndex}`}
              paused={paused}
              duration={studyConfig.duration}
              onTimeUp={handleTimeUp}
              totalDuration={totalTime}
            />
          </div>

          <VocabStudyControls
            paused={paused}
            onPauseToggle={() => setPaused(!paused)}
            onNext={handleNext}
            onMastered={handleMarkMastered}
          />
        </>
      )}
    </div>
  );
}
