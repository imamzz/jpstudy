import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

interface Config {
  wordsPerSet: number;
  totalSets: number;
  duration: number;
  level: "All" | "N5" | "N4" | "N3" | "N2" | "N1";
  breakDuration: number;
}

export default function VocabStudy() {
  const words = useAppSelector((state) => state.vocab.words);
  const location = useLocation();

  const config = (location.state as Config) || {
    wordsPerSet: 10,
    totalSets: 2,
    duration: 10,
    level: "N5",
    breakDuration: 90,
  };

  // === STATE ===
  const [currentSet, setCurrentSet] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(config.breakDuration);

  // === PILIH KATA SESUAI LEVEL & SET ===
  const levelWords =
    config.level === "All"
      ? shuffleArray(words)
      : words.filter((w) => w.level === config.level);

  const setWords = levelWords.slice(0, config.wordsPerSet);
  const currentWord = setWords[currentWordIndex];

  // === PROGRESS BAR ===
  const setProgress = (currentSet / config.totalSets) * 100;
  const totalKataProgress = ((currentWordIndex + 1) / config.wordsPerSet) * 100;

  // === TIMER GLOBAL (total waktu belajar) ===
  useEffect(() => {
    if (finished || paused || isBreak) return;
    const interval = setInterval(() => setTotalTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [finished, paused, isBreak]);

  // === TIMER UNTUK BREAK (hanya hitung mundur, tanpa auto-lanjut) ===
  useEffect(() => {
    if (!isBreak) return;
    if (breakTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBreakTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBreak, breakTimeLeft]);

  // === HANDLER: LANJUT KE KATA BERIKUT ===
  const handleNextWord = () => {
    // Masih ada kata tersisa di set sekarang
    if (currentWordIndex < config.wordsPerSet - 1) {
      setCurrentWordIndex((prev) => prev + 1);
      return;
    }

    // Sudah selesai satu set
    if (currentSet < config.totalSets) {
      // Masuk ke fase istirahat
      setPaused(true);
      setIsBreak(true);
      setBreakTimeLeft(config.breakDuration);
      return;
    }

    // Semua set selesai
    setFinished(true);
  };

  // === HANDLER: SAAT TIMER HABIS ===
  const handleTimeUp = () => {
    if (isBreak || finished) return; // Hindari trigger ganda
    handleNextWord();
  };

  // === HANDLER: NEXT BUTTON ===
  const handleNext = () => {
    if (isBreak || finished) return;
    handleNextWord();
  };

  // === HANDLER: BREAK SELESAI (manual / otomatis) ===
  const handleBreakEnd = () => {
    console.log("Break end triggered");
    setIsBreak(false);
    setPaused(false);
    setCurrentSet((prev) => prev + 1);
    setCurrentWordIndex(0);
    setBreakTimeLeft(config.breakDuration);
  };

  // === KETIKA SEMUA SET SELESAI ===
  if (finished) {
    const totalWords = config.wordsPerSet * config.totalSets;
    const learnedCount = levelWords.filter((w) => w.status === "mastered").length;
    const notLearnedCount = totalWords - learnedCount;

    return (
      <VocabStudySummary
        totalWords={totalWords}
        totalSets={config.totalSets}
        learnedCount={learnedCount}
        notLearnedCount={notLearnedCount}
        totalTime={totalTime}
        config={config}
      />
    );
  }

  // === RENDER ===
  return (
    <div className="py-12 flex flex-col items-center space-y-6 w-full mx-auto min-h-[calc(100vh)] max-h-[calc(100vh)] justify-between">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium text-gray-700">Vocab Study</p>
          <Badge variant={config.level as BadgeVariant} size="md">
            {config.level}
          </Badge>
        </div>

        <VocabStudyProgress
          currentSet={currentSet}
          totalSets={config.totalSets}
          currentIndex={currentWordIndex}
          wordsPerSet={config.wordsPerSet}
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
            onStartNow={handleBreakEnd} // hanya di sini auto-lanjut
          />
          <div className="w-full flex justify-center items-center flex-col">
      <hr className="w-full mb-12 border border-gray-200" />
      <div className="flex space-x-2 justify-between w-full max-w-6xl items-center">
        <Button disabled={paused} variant="disabled" size="md" className="self-start w-[100px] border border-gray-200">
          Skip
        </Button>

        <Button onClick={handleBreakEnd} variant="primary" size="md" className="self-end ">
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
              duration={config.duration}
              onTimeUp={handleTimeUp}
              totalDuration={totalTime}
            />
          </div>

          <VocabStudyControls
            paused={paused}
            onPauseToggle={() => setPaused(!paused)}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
}
