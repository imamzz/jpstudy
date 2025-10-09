import privateApi from "@/base/privateApi";

export async function saveVocabProgress(progress: { id: number; status: "learned" | "mastered" }[]) {
  // bulk
  const res = await privateApi.post("/vocab-progress/bulk", { items: progress });
  return res.data;
}
export const createVocabProgress = async (vocabId: number) => {
  const res = await privateApi.post(`/vocab-progress`, { vocab_id: vocabId });
  return res.data;
};
