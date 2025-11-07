import Reminder from "../molecules/Reminder";
import ShortCut from "../molecules/ShortCut";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import ReminderReview from "../../features/user/review/components/ReminderReview";
import StartLearningKanji from "../../features/user/kanji/components/StartLearningKanji";
import StartLearningVocab from "../../features/user/vocab/components/StartLearningVocab";
import StartLearningGrammar from "../../features/user/grammar/components/StartLearningGrammar";

const RightBar = () => {
  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);
  return (
    <>
      {/* <div className="w-96 h-full bg-right-bar fixed right-0 top-0"></div> */}
      <aside className="w-96 min-h-screen px-[28px] py-6 flex flex-col sticky top-0 max-h-screen gap-6 ">
        <div className="flex flex-col">
          <h2 className="text-md font-bold mb-6">Study</h2>
        </div>
        <Reminder />
        {location.pathname === "/home" && (
          <>
            <div className="flex flex-col gap-3">
              <ShortCut
                variant="N5"
                size="lg"
                title="N5"
                description="Grammar"
              />
              <ShortCut
                variant="N5"
                size="lg"
                title="N5"
                description="Kanji"
              />
            </div>
            <ReminderReview userId={user?.id || 0} />
            <StartLearningVocab userId={user?.id || 0} />
          </>
        )}
        {location.pathname === "/review" && (
          <ReminderReview userId={user?.id || 0} />
        )}
        {location.pathname === "/kanji" && (
          <StartLearningKanji userId={user?.id || 0} />
        )}
        {location.pathname === "/vocab" && (
          <StartLearningVocab userId={user?.id || 0} />
        )}
        {location.pathname === "/grammar" && (
          <StartLearningGrammar userId={user?.id || 0} />
        )}
      </aside>
    </>
  );
};

export default RightBar;
