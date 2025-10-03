import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
}

export default function ModalConfig({ isOpen, title, description, onClose }: ModalProps) {
  const [limit, setLimit] = useState(10);
  const [totalSets, setTotalSets] = useState(2);
  const [duration, setDuration] = useState(10);
  const [breakDuration, setBreakDuration] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const config = {
    //   limit,
    //   totalSets,
    //   duration,
    //   breakDuration,    
    // };
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px] relative">
        <div className="px-6 py-3 text-center border-b border-gray-200">
          <h2 className="text-md font-semibold">{title}</h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>

        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input name="limit" label="Word per set" type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
            <Input name="totalSets" label="Total Sets" type="number" value={totalSets} onChange={(e) => setTotalSets(Number(e.target.value))} />
            <Input name="duration" label="Duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            <Input name="breakDuration" label="Break Duration" type="number" value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))} />
          </form>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
          <Button variant="secondary" size="md" onClick={onClose}>
            Batal
          </Button>
          <Button variant="primary" size="md" type="submit">
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
