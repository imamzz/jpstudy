import api from "./axios";

// 📝 Tipe data vocab (samakan dengan schema backend-mu)
export interface Vocab {
  id: number;
  kanji?: string;
  word: string;
  romaji: string;
  meaning: string;
  level?: string; // misal N5, N4, dst
  examples?: { jp: string; id: string }[];
}

// ✅ Ambil semua vocab (support filter level & search)
export const getAllVocab = async (
    search?: string,
    level?: string
  ): Promise<Vocab[]> => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (level) params.level = level;
  
    const res = await api.get("/vocab", { params });
    console.log("API Response /vocab:", res.data);
  
    // ✅ pastikan ambil dari data.vocab
    return Array.isArray(res.data?.data?.vocab) ? res.data.data.vocab : [];
  };
  
  
// ✅ Ambil detail vocab by ID
export const getVocabById = async (id: string | number) => {
  const res = await api.get(`/vocab/${id}`);
  return res.data.data ?? res.data;
};

// ✅ Tambah vocab baru
export const createVocab = async (payload: Partial<Vocab>) => {
  const res = await api.post("/vocab", payload);
  return res.data.data ?? res.data;
};

// ✅ Update vocab
export const updateVocab = async (id: string | number, payload: Partial<Vocab>) => {
  const res = await api.put(`/vocab/${id}`, payload);
  return res.data.data ?? res.data;
};

// ✅ Hapus vocab
export const deleteVocab = async (id: string | number) => {
  const res = await api.delete(`/vocab/${id}`);
  return res.data;
};
