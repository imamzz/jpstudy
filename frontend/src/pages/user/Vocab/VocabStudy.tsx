import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useEffect, useMemo } from "react";
import { fetchVocabStudy, type Word } from "@/features/user/vocab/vocabStudySlice";
import { fetchVocabSetting } from "@/features/user/settings/settingsSlice";
import { useStudySession } from "@/features/user/study/hooks/useStudySession";
import StudyLayout from "@/features/user/study/components/StudyLayout";
import WordDisplay from "@/features/user/vocab/components/VocabStudyWordDisplay";

export default function VocabStudyPage() {
  const dispatch = useAppDispatch();
  const words = useAppSelector((s) => s.vocabStudy.studyWords);
  const { vocab } = useAppSelector((s) => s.settings);

  useEffect(() => { dispatch(fetchVocabStudy()); }, [dispatch]);
  useEffect(() => { dispatch(fetchVocabSetting(3)); }, [dispatch]);

  const config = useMemo(() => ({
    itemsPerSet: vocab?.words_per_set ?? 10,
    totalSets: vocab?.total_set ?? 3,
    duration: vocab?.seconds_per_word ?? 10,
    breakDuration: vocab?.break_per_set ?? 90,
    level: vocab?.target_level ?? "N5",
  }), [vocab]);

  const studyHook = useStudySession<Word>(words, config);

  return (
    <StudyLayout<Word>
      title="Vocab Study"
      level={config.level}
      config={config}
      studyHook={studyHook}
      renderItem={(item) => {
        if (!item) return null;
        return (
          <WordDisplay
            kanji={item.kanji}
            kana={item.kana}
            romaji={item.romaji}
            meaning={item.meaning}
          />
        );
      }}
    />
  );
}
