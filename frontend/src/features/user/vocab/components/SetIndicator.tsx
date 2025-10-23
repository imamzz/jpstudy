export default function SetIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="text-sm text-gray-500">
      Sesi {current} dari {total}
    </div>
  );
}
