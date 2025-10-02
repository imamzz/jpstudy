import type { ReactNode } from "react";
import Bookmark from "@/assets/icon/bookmark.svg?react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  example?: string[];
}

export default function Modal({ isOpen, title, children, footer, example }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[550px] relative">
        {title && (
          <div className="px-6 py-3 flex items-center justify-between">
            <h2 className="text-md">{title}</h2>
            <Bookmark className="w-6 h-6 [stroke-width:1.2]" />
          </div>
        )}

        <div className="px-6 py-4">{children}</div>

        <hr className="w-full border-gray-200" />

        {example && (
          <div className="px-6 py-4">
            <p className="text-sm font-semibold">Contoh Kalimat</p>
            <ul className="list-disc list-inside">
              {example.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        

        {footer && <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
