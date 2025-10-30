import { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import GrammarDisplay from "@/features/user/grammar/components/GrammarDisplay";
import StudyTimer from "@/features/user/grammar/components/StudyTimer";
import BreakScreen from "@/features/user/grammar/components/GrammarStudyBreakScreen";
import Badge, { type BadgeVariant } from "@/components/atoms/Badge";
import GrammarStudyProgress from "@/features/user/grammar/components/GrammarStudyProgress";
import GrammarStudySummary from "@/features/user/grammar/components/GrammarStudySummary";
import GrammarStudyControls from "@/features/user/grammar/components/GrammarStudyControls";
import { shuffleArray } from "@/utils/grammarHelpers";
import Button from "@/components/atoms/Button";
import type { LevelVariant } from "@/types/common";
import { fetchGrammarStudy } from "@/features/user/grammar/grammarStudySlice";
import privateApi from "@/base/privateApi";
import { fetchGrammarSetting } from "@/features/user/settings/settingsSlice";

export default function GrammarStudy() {
  const dispatch = useAppDispatch();

  // ✅ Ambil grammarvocab dari study dan setting Redux
  const words = useAppSelector((state) => state.grammarStudy.studyWords) || [];
  const { grammar, loading: settingLoading } = useAppSelector((state) => state.settings);

  // 🔹 Ambil data study (daftar kata)
  useEffect(() => {
    dispatch(fetchGrammarStudy());
  }, [dispatch]);

  // 🔹 Ambil konfigurasi belajar user
  useEffect(() => {
    // ganti ke userId sesungguhnya nanti
    const userId = 3;
    dispatch(fetchGrammarSetting(userId));
  }, [dispatch]);


  // ✅ Konfigurasi belajar (fallback default jika belum ada data Redux)
  const studyConfig = useMemo(() => ({
    grammarPerSet: grammar?.grammar_per_set ?? 10,
    totalSets: grammar?.total_set ?? 3,
    duration: grammar?.seconds_per_grammar ?? 10,
    level: (grammar?.target_level as LevelVariant) ?? "N5",
    breakDuration: grammar?.break_per_set ?? 90,
  }), [grammar]);
  
  // === STATE ===
  const [currentSet, setCurrentSet] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(studyConfig.breakDuration);

  const [progressData, setProgressData] = useState<{ grammar_id: number; status: string }[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  // kata yang dipakai untuk sesi/set saat ini — tidak berubah selama set berjalan
  const [sessionWords, setSessionWords] = useState<typeof words>([]);
  const [sessionStart] = useState<Date>(new Date());


  // Build sessionWords once per set (menggunakan masteredIds yang ada saat set mulai)
  useEffect(() => {
    if (!Array.isArray(words) || words.length === 0) {
      setSessionWords([]);
      return;
    }

    // ambil kata yang belum mastered saat set mulai
    const remaining = words.filter((w) => !masteredIds.has(w.id));

    const levelFiltered =
      studyConfig.level === "All"
        ? remaining
        : remaining.filter((w) => w.level === studyConfig.level);

    const selected = shuffleArray(levelFiltered).slice(0, studyConfig.grammarPerSet);

    setSessionWords(selected);
    setCurrentWordIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, currentSet, studyConfig.level, studyConfig.grammarPerSet]);



  // === FILTER KATA ===
  const filteredWords = useMemo(() => {
    if (!Array.isArray(words) || words.length === 0) return [];

    // Ambil hanya kata yang belum mastered
    const remainingWords = words.filter((w) => !masteredIds.has(w.id));

    // Filter berdasarkan level (kalau perlu)
    const levelFiltered =
      studyConfig.level === "All"
        ? remainingWords
        : remainingWords.filter((w) => w.level === studyConfig.level);

    // Tidak menambah kata baru — cukup pakai kata tersisa
    return shuffleArray(levelFiltered);
  }, [words, masteredIds, studyConfig.level]);

  // ✅ Jika semua kata sudah mastered (filteredWords kosong), akhiri sesi otomatis
  useEffect(() => {
    // pastikan data study sudah ter-load
    if (!finished && words.length > 0 && filteredWords.length === 0) {
      setFinished(true);
    }
  }, [words, filteredWords, finished]);

  const currentWord = sessionWords[currentWordIndex];

  // === PROGRESS BAR ===
  const activeWordCount = sessionWords.length; // kata di set ini (tidak berubah selama set berjalan)

  const safeTotalSets = Math.max(1, studyConfig.totalSets);
  const clampedCurrentSet = Math.min(currentSet, safeTotalSets);
  const setProgressUnclamped = (clampedCurrentSet / safeTotalSets) * 100;
  const setProgress = Math.max(0, Math.min(setProgressUnclamped, 100));

  let totalKataProgress = 100;
  if (activeWordCount > 0) {
    const ratio = (currentWordIndex + 1) / activeWordCount;
    totalKataProgress = Math.max(0, Math.min(ratio * 100, 100));
  }

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
    if (!filteredWords || filteredWords.length === 0) {
      setFinished(true);
      return;
    }

    const totalBefore = filteredWords.length;
    const isMastered = status === "mastered";

    // Simpan progres ke state
    setProgressData((prev) => [...prev, { grammar_id: currentWord.id, status }]);

    if (isMastered) {
      setMasteredIds((prev) => new Set([...prev, currentWord.id]));
    }

    // 🔹 Logika index aman:
    const nextIndex = currentWordIndex + 1;

    // Jika masih ada kata berikutnya (berdasarkan totalBefore, bukan setelah filter berubah)
    if (nextIndex < totalBefore) {
      setCurrentWordIndex(nextIndex);
      return;
    }

    // Kalau tidak ada kata berikut, masuk ke break atau selesai total
    if (currentSet < studyConfig.totalSets) {
      setPaused(true);
      setIsBreak(true);
      setBreakTimeLeft(studyConfig.breakDuration);
    } else {
      setFinished(true);
    }
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
            id: p.grammar_id,
            status: p.status,
          })),
        };

        console.log("📦 Sending bulk progress:", JSON.stringify(payload, null, 2));
        await privateApi.post("/grammar-progress/bulk", payload);
        console.log("✅ Bulk progress saved successfully!");
      } catch (err) {
        console.error("❌ Failed to save bulk progress:", err);
      }
    };

    const sendStudySession = async () => {
      try {
        const payload = {
        activity_type: "grammar",
        start_time: sessionStart,
        end_time: new Date(),
        duration_seconds: totalTime,
        item_count: progressData.length,
        learned_count: progressData.filter((p) => p.status === "learned").length,
        mastered_count: progressData.filter((p) => p.status === "mastered").length,
      };

        console.log("📦 Sending study session:", JSON.stringify(payload, null, 2));
        await privateApi.post("/study-session", payload);
        console.log("✅ Study session saved successfully!");
      } catch (err) {
        console.error("❌ Failed to save study session:", err);
      }
    };

    sendBulkProgress();
    sendStudySession();
  }, [finished, progressData, totalTime]);

  // === SUMMARY ===
  if (finished) {
    const learnedCount = progressData.filter((p) => p.status === "learned").length;
    const masteredCount = progressData.filter((p) => p.status === "mastered").length;
    const totalLearned = learnedCount + masteredCount;
    const notLearned = studyConfig.grammarPerSet * studyConfig.totalSets - totalLearned;

    return (
      <GrammarStudySummary
        totalGrammar={studyConfig.grammarPerSet}
        totalSets={studyConfig.totalSets}
        learnedCount={totalLearned}
        notLearnedCount={notLearned}
        totalTime={totalTime}
      />
    );
  }

  // === LOADING ===
  if (settingLoading || !filteredWords.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">
          {settingLoading ? "Memuat konfigurasi belajar..." : "Menyiapkan data grammar..."}
        </p>
      </div>
    );
  }

  // === RENDER ===
  return (
    <div className="py-12 flex flex-col items-center space-y-6 w-full mx-auto min-h-[calc(100vh)] max-h-[calc(100vh)] justify-between">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium text-gray-700">Grammar Study</p>
          <Badge variant={studyConfig.level as BadgeVariant} size="md">
            {studyConfig.level}
          </Badge>
        </div>

        <GrammarStudyProgress
          currentSet={currentSet}
          totalSets={studyConfig.totalSets}
          currentIndex={currentWordIndex}
          grammarPerSet={activeWordCount}
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
              <GrammarDisplay
                pattern={currentWord.pattern}
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

          <GrammarStudyControls
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
