import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
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
import { saveVocabProgress } from "@/features/vocab/vocabProgressApi";

export default function VocabStudy() {
  const words = useAppSelector((state) => state.vocab.words);
  const { config } = useAppSelector((state) => state.config);

  // mapping config dari Redux → schema lokal
  const studyConfig = {
    wordsPerSet: config.limit || 10,
    totalSets: config.totalSets || 2,
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

  // === PILIH KATA SESUAI LEVEL ===
  const levelWords =
    studyConfig.level === "All"
      ? shuffleArray(words)
      : words.filter((w) => w.level === studyConfig.level);

  const setWords = levelWords.slice(0, studyConfig.wordsPerSet);
  const currentWord = setWords[currentWordIndex];

  // === PROGRESS BAR ===
  const setProgress = (currentSet / studyConfig.totalSets) * 100;
  const totalKataProgress = ((currentWordIndex + 1) / studyConfig.wordsPerSet) * 100;

  // === TIMER GLOBAL ===
  useEffect(() => {
    if (finished || paused || isBreak) return;
    const interval = setInterval(() => setTotalTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [finished, paused, isBreak]);

  // === TIMER BREAK ===
  useEffect(() => {
    if (!isBreak) return;
    if (breakTimeLeft > 0) {
      const timer = setTimeout(() => setBreakTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isBreak, breakTimeLeft]);

  // === NEXT WORD ===
  const handleNextWord = async () => {
    if (currentWord) {
      try {
        // default kalau lanjut → status "learned"
        await saveVocabProgress(currentWord.id, "learned");
      } catch (err) {
        console.error("Failed to save progress", err);
      }
    }
  
    if (currentWordIndex < studyConfig.wordsPerSet - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      return;
    }
    if (currentSet < studyConfig.totalSets) {
      setPaused(true);
      setIsBreak(true);
      setBreakTimeLeft(studyConfig.breakDuration);
      return;
    }
    setFinished(true);
  };
  

  const handleMarkMastered = async () => {
    if (currentWord) {
      try {
        await saveVocabProgress(currentWord.id, "mastered");
      } catch (err) {
        console.error("Failed to save mastered progress", err);
      }
    }
    await handleNextWord(); // langsung lanjut ke kata berikutnya
  };
  

  const handleTimeUp = async () => {
    if (isBreak || finished) return;
    await handleNextWord();
  };

  const handleNext = async () => {
    if (isBreak || finished) return;
    await handleNextWord();
  };

  const handleBreakEnd = async () => {
    setIsBreak(false);
    setPaused(false);
    setCurrentSet((prev) => prev + 1);
    setCurrentWordIndex(0);
    setBreakTimeLeft(studyConfig.breakDuration);
  };

  // === SUMMARY ===
  if (finished) {
    const totalWords = studyConfig.wordsPerSet * studyConfig.totalSets;
    const learnedCount = levelWords.filter((w) => w.status === "mastered").length;
    const notLearnedCount = totalWords - learnedCount;

    return (
      <VocabStudySummary
        totalWords={totalWords}
        totalSets={studyConfig.totalSets}
        learnedCount={learnedCount}
        notLearnedCount={notLearnedCount}
        totalTime={totalTime}
        config={studyConfig}
      />
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

      {/* === FASE ISTIRAHAT === */}
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
              <Button disabled={paused} variant="disabled" size="md" className="self-start w-[100px] border border-gray-200">
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
            onMastered={handleMarkMastered} // tambahkan props baru
          />
        </>
      )}
    </div>
  );
}
