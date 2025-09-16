// src/pages/user/grammar/GrammarPage.tsx
import GrammarList from "@/features/grammar/components/GrammarList";
import GrammarConfigForm from "@/features/grammar/components/GrammarConfigForm";
import GrammarProgress from "@/features/grammar/components/GrammarProgress";

export default function GrammarPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-700">📘 Daftar Grammar</h1>

      {/* Progress */}
      <GrammarProgress />

      {/* Config Form */}
      <GrammarConfigForm />

      {/* List */}
      <GrammarList />
    </div>
  );
}
