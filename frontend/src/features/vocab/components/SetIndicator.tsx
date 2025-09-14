// src/pages/user/vocab/components/SetIndicator.tsx
interface SetIndicatorProps {
    currentSet: number;
    totalSet: number;
    currentWord: number;
    totalWord: number;
  }
  
  export default function SetIndicator({
    currentSet,
    totalSet,
    currentWord,
    totalWord,
  }: SetIndicatorProps) {
    return (
      <div className="text-sm text-gray-700">
        Set {currentSet}/{totalSet} · Kata {currentWord}/{totalWord}
      </div>
    );
  }
  