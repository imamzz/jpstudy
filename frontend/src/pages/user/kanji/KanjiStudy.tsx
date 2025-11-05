import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useEffect, useMemo } from "react";
import { fetchKanjiStudy, type Kanji } from "@/features/user/kanji/kanjiStudySlice";
import { fetchKanjiSetting } from "@/features/user/settings/settingsSlice";
import { useStudySession } from "@/features/user/study/hooks/useStudySession";
import StudyLayout from "@/features/user/study/components/StudyLayout";
import WordDisplay from "@/features/user/kanji/components/KanjiStudyDisplay";

export default function KanjiStudyPage() {
  const dispatch = useAppDispatch();
  const kanjis = useAppSelector((s) => s.kanjiStudy.studyWords);
  const { kanji } = useAppSelector((s) => s.settings);

  useEffect(() => { dispatch(fetchKanjiStudy()); }, [dispatch]);
  useEffect(() => { dispatch(fetchKanjiSetting(3)); }, [dispatch]);

  const config = useMemo(() => ({
    itemsPerSet: kanji?.kanji_per_set ?? 10,
    totalSets: kanji?.total_set ?? 3,
    duration: kanji?.seconds_per_kanji ?? 10,
    breakDuration: kanji?.break_per_set ?? 90,
    level: kanji?.target_level ?? "N5",
  }), [kanji]);

  const studyHook = useStudySession<Kanji>(kanjis, config);

  return (
    <StudyLayout<Kanji>
      title="Kanji Study"
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
