import { useState, useEffect, useMemo } from "react";
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
import { fetchVocabSetting } from "@/features/settings/settingsSlice";

export default function VocabStudy() {
  const dispatch = useAppDispatch();

  // ✅ Ambil vocab dari study dan setting Redux
  const words = useAppSelector((state) => state.vocabStudy.studyWords) || [];
  const { vocab, loading: settingLoading } = useAppSelector((state) => state.settings);

  // 🔹 Ambil data study (daftar kata)
  useEffect(() => {
    dispatch(fetchVocabStudy());
  }, [dispatch]);

  // 🔹 Ambil konfigurasi belajar user
  useEffect(() => {
    // ganti ke userId sesungguhnya nanti
    const userId = 3;
    dispatch(fetchVocabSetting(userId));
  }, [dispatch]);


  // ✅ Konfigurasi belajar (fallback default jika belum ada data Redux)
  const studyConfig = useMemo(() => ({
    wordsPerSet: vocab?.words_per_set ?? 10,
    totalSets: vocab?.total_set ?? 3,
    duration: vocab?.seconds_per_word ?? 10,
    level: (vocab?.target_level as LevelVariant) ?? "N5",
    breakDuration: vocab?.break_per_set ?? 90,
  }), [vocab]);
  

  // === STATE ===
  const [currentSet, setCurrentSet] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(studyConfig.breakDuration);

  const [progressData, setProgressData] = useState<{ vocab_id: number; status: string }[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());

  // === FILTER KATA ===
  const filteredWords = useMemo(() => {
    if (!Array.isArray(words) || words.length === 0) return [];

    const availableWords = words.filter((w) => !masteredIds.has(w.id));

    const levelFiltered =
      studyConfig.level === "All"
        ? shuffleArray(availableWords)
        : shuffleArray(availableWords.filter((w) => w.level === studyConfig.level));

    return levelFiltered.slice(0, studyConfig.wordsPerSet);
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

  // === BREAK TIMER ===
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

    setProgressData((prev) => [...prev, { vocab_id: currentWord.id, status }]);

    if (status === "mastered") {
      setMasteredIds((prev) => new Set([...prev, currentWord.id]));
    }

    if (currentWordIndex < filteredWords.length - 1) {
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

  const handleBreakEnd = () => {
    setIsBreak(false);
    setPaused(false);
    setCurrentSet((prev) => prev + 1);
    setCurrentWordIndex(0);
    setBreakTimeLeft(studyConfig.breakDuration);
  };

  // === SIMPAN PROGRESS SAAT SELESAI ===
  useEffect(() => {
    if (!finished || progressData.length === 0) return;

    const sendBulkProgress = async () => {
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
    const totalLearned = learnedCount + masteredCount;
    const notLearned =
      studyConfig.wordsPerSet * studyConfig.totalSets - totalLearned;

    return (
      <VocabStudySummary
        totalWords={studyConfig.wordsPerSet}
        totalSets={studyConfig.totalSets}
        learnedCount={totalLearned}
        notLearnedCount={notLearned}
        totalTime={totalTime}
        config={studyConfig}
      />
    );
  }

  // === LOADING ===
  if (settingLoading || !filteredWords.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">
          {settingLoading ? "Memuat konfigurasi belajar..." : "Menyiapkan data vocab..."}
        </p>
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
