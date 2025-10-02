import IconSetting from "@/assets/icon/setting.svg?react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalConfig from "../molecules/ModalConfig";

interface ReminderReviewProps {
  totalVocab: number;
  totalReview: number;
}

const ReminderReview: React.FC<ReminderReviewProps> = ({ totalVocab, totalReview }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    navigate("/review/study");
  };

  const progress = (totalReview / totalVocab) * 100;

  return (
    <>
      <form
        className="p-4 bg-white border border-gray-200 rounded-xl space-y-3 w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-600">Daily Review</p>
            <button type="button" onClick={() => setIsOpen(true)}>
              <IconSetting className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-all duration-300 [stroke-width:1.5] hover:[stroke-width:2]" />
            </button>
          </div>
          <p className="text-lg">Review vocab</p>
        </div>

        <div className="progress-bar">
          <div className="progress flex justify-between w-full">
            <p className="text-lg font-semibold">{progress}%</p>
            <p className="text-md text-gray-600">{totalReview}/{totalVocab} vocab</p>
          </div>
          <div className="progress w-full h-2 bg-gray-200 rounded-full">
            <div className="progress w-0 h-2 bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <Button variant="primary" size="md" className="w-full">
          Review
        </Button>
      </form>

      {/* ✅ ModalConfig langsung ditampilkan di sini */}
      <ModalConfig
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Konfigurasi"
        description="Atur preferensi belajar"
      />
    </>
  );
};

export default ReminderReview;
