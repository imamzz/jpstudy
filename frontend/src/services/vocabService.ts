import privateApi from "@/base/privateApi";

// 📝 Tipe data vocab (samakan dengan schema backend-mu)
export interface Vocab {
  id: number;
  kanji?: string;
  kana: string;
  romaji: string;
  meaning: string;
  level?: string; // misal N5, N4, dst
  examples?: { jp: string; id: string }[];
}

export const vocabService = {
  // ✅ Ambil semua vocab (support filter level & search)
  async getAll(search?: string, level?: string): Promise<Vocab[]> {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (level) params.level = level;

    const res = await privateApi.get("/vocab", { params });
    // console.log("API Response /vocab:", res.data);

    // pastikan ambil dari data.vocab
    return Array.isArray(res.data?.data?.vocab) ? res.data.data.vocab : [];
  },

  // ✅ Ambil detail vocab by ID
  async getById(id: string | number) {
    const res = await privateApi.get(`/vocab/${id}`);
    return res.data.data ?? res.data;
  },

  // ✅ Tambah vocab baru
  async create(payload: Partial<Vocab>) {
    const res = await privateApi.post("/vocab", payload);
    return res.data.data ?? res.data;
  },

  // ✅ Update vocab
  async update(id: string | number, payload: Partial<Vocab>) {
    const res = await privateApi.put(`/vocab/${id}`, payload);
    return res.data.data ?? res.data;
  },

  // ✅ Hapus vocab
  async delete(id: string | number) {
    const res = await privateApi.delete(`/vocab/${id}`);
    return res.data;
  },
};
