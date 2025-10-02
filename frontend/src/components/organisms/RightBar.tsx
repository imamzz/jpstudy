import Reminder from "../molecules/Reminder";
import ShortCut from "../molecules/ShortCut";
import StartLearning from "../molecules/StartLearning";
import { useLocation } from "react-router-dom";
import ReminderReview from "../molecules/ReminderReview";

const RightBar = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-80 h-full bg-right-bar fixed right-0 top-0"></div>
      <aside className="w-80 min-h-screen px-[28px] py-6 flex flex-col sticky top-0 max-h-screen gap-6">
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
              <ShortCut variant="N5" size="lg" title="N5" description="Kanji" />
            </div>
            <ReminderReview totalVocab={50} totalReview={10} />
          </>
        )}
        {location.pathname === "/review" && <ReminderReview totalVocab={50} totalReview={10} />}
        <StartLearning
          level="N5"
          limit={10}
          totalSets={2}
          duration={10}
          breakDuration={30}
        />
      </aside>
    </>
  );
};

export default RightBar;
