import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
// import { markAsLearned } from "@/features/vocab/vocabSlice";

import WordDisplay from "@/features/vocab/components/WordDisplay";
import StudyTimer from "@/features/vocab/components/StudyTimer";
import Badge, { type BadgeVariant } from "@/components/atoms/Badge";
import VocabStudyProgress from "@/features/vocab/components/VocabStudyProgress";
import VocabStudySummary from "@/features/vocab/components/VocabStudySummary";
import VocabStudyControls from "@/features/vocab/components/VocabStudyControls";
import { shuffleArray } from "@/utils/vocabHelpers";

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
    breakDuration: 5,
  };

  // 🔹 State utama
  const [currentSet, setCurrentSet] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [transitioning, setTransitioning] = useState(false); // anti-duplikasi

  // 🔹 Siapkan kata sesuai level
  const levelWords =
    config.level === "All"
      ? shuffleArray(words)
      : words.filter((w) => w.level === config.level);

  // 🔹 Ambil kata untuk satu set (acak di awal setiap set)
  const [setWords, setSetWords] = useState(() =>
    levelWords.slice(0, config.wordsPerSet)
  );

  // 🔹 Kata saat ini
  const currentWord = setWords[currentWordIndex];

  // 🔹 Progress bar
  const setProgress = (currentSet / config.totalSets) * 100;
  const totalKataProgress = ((currentWordIndex + 1) / config.wordsPerSet) * 100;

  // 🔹 Timer global (total durasi belajar)
  useEffect(() => {
    if (finished || paused) return;
    const interval = setInterval(() => setTotalTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [finished, paused]);

  // 🔹 Fungsi utama berpindah kata
  const handleNextWord = useCallback(() => {
    // jika sedang transisi, abaikan
    if (transitioning || finished) return;
    setTransitioning(true);

    // pindah kata dalam set
    if (currentWordIndex < config.wordsPerSet - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      // jika semua kata dalam set sudah selesai
      if (currentSet < config.totalSets) {
        // naik ke set berikut & reset kata ke awal
        setCurrentSet((prev) => prev + 1);
        setCurrentWordIndex(0);
        // acak ulang kata untuk set baru
        setSetWords(shuffleArray(levelWords).slice(0, config.wordsPerSet));
      } else {
        // semua set selesai
        setFinished(true);
      }
    }

    // reset flag setelah sedikit jeda agar klik ganda tidak menggandakan increment
    setTimeout(() => setTransitioning(false), 200);
  }, [
    transitioning,
    finished,
    currentWordIndex,
    currentSet,
    config.wordsPerSet,
    config.totalSets,
    levelWords,
  ]);

  // 🔹 Callback ketika timer habis
  const handleTimeUp = useCallback(() => {
    if (!transitioning && !paused && !finished) {
      handleNextWord();
    }
  }, [transitioning, paused, finished, handleNextWord]);

  // 🔹 Tombol Next manual
  const handleNext = () => {
    if (!transitioning && !finished) {
      handleNextWord();
    }
  };

  // 🔹 Hitung statistik hafalan
  const learnedCount = levelWords.filter((w) => w.status === "mastered").length;
  const totalWords = config.wordsPerSet * config.totalSets;
  const notLearnedCount = totalWords - learnedCount;

  // 🔹 Jika sesi selesai
  if (finished) {
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

  // 🔹 Tampilan utama
  return (
    <div className="py-6 flex flex-col items-center space-y-6 w-full mx-auto gap-30">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium text-gray-700">Vocab Study</p>
          <Badge variant={config.level as BadgeVariant} size="md">
            {config.level}
          </Badge>
        </div>

        {/* Progress */}
        <VocabStudyProgress
          currentSet={currentSet}
          totalSets={config.totalSets}
          currentIndex={currentWordIndex}
          wordsPerSet={config.wordsPerSet}
          setProgress={setProgress}
          totalKataProgress={totalKataProgress}
        />
      </div>

      {/* Word + Timer */}
      <div className="flex space-x-4 mt-4 w-full max-w-6xl justify-center">
        {currentWord && (
          <WordDisplay
            kanji={currentWord.kanji}
            kana={currentWord.kana}
            romaji={currentWord.romaji}
            arti={currentWord.arti}
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

      {/* Controls */}
      <VocabStudyControls
        paused={paused}
        onPauseToggle={() => setPaused(!paused)}
        onNext={handleNext}
      />
    </div>
  );
}
