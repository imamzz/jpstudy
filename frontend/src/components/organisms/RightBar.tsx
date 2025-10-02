import Reminder from "../molecules/Reminder";
import ShortCut from "../molecules/ShortCut";
import StartLearning from "../molecules/StartLearning";
import { useLocation } from "react-router-dom";

const RightBar = () => {
    const location = useLocation();
    return (
        <>
            <div className="w-80 h-full bg-right-bar absolute right-0"></div>
            <aside className="w-80 min-h-screen px-[28px] py-6 flex flex-col sticky top-0 max-h-screen gap-6">
                <div className="flex flex-col">
                    <h2 className="text-md font-bold mb-6">Study</h2>
                </div>
                <Reminder />    
                {location.pathname === "/home" && <ShortCut />}
                {location.pathname === "/vocab" && <StartLearning />}
            </aside>
        </>
    )
}

export default RightBar;