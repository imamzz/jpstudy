import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useEffect, useMemo } from "react";
import { fetchGrammarStudy, type Grammar } from "@/features/user/grammar/grammarStudySlice";
import { fetchGrammarSetting } from "@/features/user/settings/settingsSlice";
import { useStudySession } from "@/features/user/study/hooks/useStudySession";
import StudyLayout from "@/features/user/study/components/StudyLayout";
import WordDisplay from "@/features/user/grammar/components/GrammarStudyDisplay";

export default function GrammarStudyPage() {
  const dispatch = useAppDispatch();
  const grammars = useAppSelector((s) => s.grammarStudy.studyWords);
  const { grammar } = useAppSelector((s) => s.settings);

  useEffect(() => { dispatch(fetchGrammarStudy()); }, [dispatch]);
  useEffect(() => { dispatch(fetchGrammarSetting(3)); }, [dispatch]);

  const config = useMemo(() => ({
    itemsPerSet: grammar?.grammar_per_set ?? 10,
    totalSets: grammar?.total_set ?? 3,
    duration: grammar?.seconds_per_grammar ?? 10,
    breakDuration: grammar?.break_per_set ?? 90,
    level: grammar?.target_level ?? "N5",
  }), [grammar]);

  const studyHook = useStudySession<Grammar>(grammars, config);

  return (
    <StudyLayout<Grammar>
      title="grammar Study"
      level={config.level}
      config={config}
      studyHook={studyHook}
      renderItem={(item) => {
        if (!item) return null;
        return (
          <WordDisplay
            pattern={item.pattern}
            kana={item.kana}
            romaji={item.romaji}
            meaning={item.meaning}
          />
        );
      }}
    />
  );
}
