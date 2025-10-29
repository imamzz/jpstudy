export const chartThemes = {
  vocab: {
    color1: "#3b82f6", // Biru - durasi belajar
    color2: "#10b981", // Hijau - kata dipelajari
    bg: "bg-blue-50",
    accent: "bg-blue-100",
    label: "Vocabulary",
  },
  grammar: {
    color1: "#8b5cf6", // Ungu - latihan grammar
    color2: "#a855f7", // Ungu terang - pola dikuasai
    bg: "bg-purple-50",
    accent: "bg-purple-100",
    label: "Grammar",
  },
  kanji: {
    color1: "#ef4444", // Merah - durasi latihan
    color2: "#f97316", // Oranye - karakter dihafal
    bg: "bg-red-50",
    accent: "bg-red-100",
    label: "Kanji",
  },
} as const;

export type ChartCategory = keyof typeof chartThemes;
