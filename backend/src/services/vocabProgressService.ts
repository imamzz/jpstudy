import UserVocabProgress from "../models/UserVocabProgress";

export async function createVocabProgress(user_id: number, vocab_id: number, status: "learned" | "review" | "mastered") {
    const vocabProgress = await UserVocabProgress.create({
      user_id,
      vocab_id,
      status,
      last_studied: new Date(),
      times_reviewed: 1,
      mastered_at: status === "mastered" ? new Date() : null,
    });
    return vocabProgress;
  }
  

  export async function updateVocabProgress(user_id: number, vocab_id: number, status: "learned" | "review" | "mastered") {
    const vocabProgress = await UserVocabProgress.findOne({ where: { user_id, vocab_id } });
    if (!vocabProgress) return null;
  
    vocabProgress.status = status;
    vocabProgress.last_studied = new Date();
    vocabProgress.times_reviewed += 1;
  
    if (status === "mastered" && !vocabProgress.mastered_at) {
      vocabProgress.mastered_at = status === "mastered" ? new Date() : null;
    }
  
    await vocabProgress.save();
    return vocabProgress;
  }
  

export async function deleteVocabProgress(user_id: number, vocab_id: number) {
    const vocabProgress = await UserVocabProgress.destroy({ where: { user_id, vocab_id } });
    return vocabProgress;
}


export async function saveVocabProgress(
  user_id: number,
  vocab_id: number,
  status: "learned" | "review" | "mastered"
) {
  const existing = await UserVocabProgress.findOne({
    where: { user_id, vocab_id },
  });

  if (existing) {
    // jangan tambah times_reviewed saat learning
    existing.status = status;
    existing.last_studied = new Date();

    // hanya isi mastered_at saat pertama kali mastered
    if (status === "mastered" && !existing.mastered_at) {
      existing.mastered_at = new Date();
    }

    await existing.save();
    return existing;
  }

  // kalau belum ada progress → buat baru
  const progress = await UserVocabProgress.create({
    user_id,
    vocab_id,
    status,
    last_studied: new Date(),
    times_reviewed: 1, // tetap 1 untuk awal belajar
    mastered_at: status === "mastered" ? new Date() : null,
  });

  return progress;
}