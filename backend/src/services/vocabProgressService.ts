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
