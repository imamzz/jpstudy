// src/pages/user/grammar/GrammarPage.tsx
import GrammarList from "@/features/user/grammar/components/GrammarList";
import GrammarConfigForm from "@/features/user/grammar/components/GrammarConfigForm";
import GrammarProgress from "@/features/user/grammar/components/GrammarProgress";

export default function GrammarPage() {
  return (
    <div className="w-full mx-auto ">
      {/* Header */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📘 Daftar Grammar</h1>

      {/* Progress */}
      <GrammarProgress />

      {/* Config Form */}
      <GrammarConfigForm />

      {/* List */}
      <GrammarList />
    </div>
  );
}
