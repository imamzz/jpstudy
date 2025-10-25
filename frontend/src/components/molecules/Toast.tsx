import Close from "@/assets/icon/close.svg?react";
import TickCirclex from "@/assets/icon/TickCirclex.svg?react";
import Error from "@/assets/icon/Warning.svg?react";

interface ToastProps {
    onClose: () => void;
    type: "success" | "error";
    message: string;
}

export const Toast = ({ onClose, type, message }: ToastProps) => {
    return (
        <div className="toast bg-white w-[400px] flex items-start justify-between mb-4 border border-gray-200 rounded-lg p-4 gap-4 shadow-lg">
            {type === "success" ? <TickCirclex className="w-6 h-6" /> : <Error className="w-6 h-6" />}
            <div className="description w-full">
                <h3 className="text-lg font-semibold">{type === "success" ? "Berhasil" : "Gagal"}</h3>
                <p>{message}</p>
            </div>
            <Close className="w-6 h-6 cursor-pointer" onClick={() => onClose()} />
        </div>
    );
}
