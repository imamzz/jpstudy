import privateApi from "@/base/privateApi";

export async function saveVocabProgress(vocabId: number, status: "learned" | "mastered") {
  const res = await privateApi.post("/vocab-progress", {
    vocab_id: vocabId,
    status,
  });
  return res.data;
}

export const createVocabProgress = async (vocabId: number) => {
  const res = await privateApi.post(`/vocab-progress`, { vocab_id: vocabId });
  return res.data;
};
