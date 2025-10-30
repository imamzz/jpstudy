import { Request, Response, NextFunction } from "express";
import * as kanjiService from "../services/kanjiService";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Tambah kanji baru
 */
export async function createKanji(req: Request, res: Response, next: NextFunction) {
  try {
    const { kanji, kana, romaji, meaning, level, example_words } = req.body;

    if (!kanji || !meaning) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Field kanji dan meaning wajib diisi",
        { kanji, meaning },
        400
      );
    }

    const createdKanji = await kanjiService.createKanji({
      kanji,
      kana,
      romaji,
      meaning,
      level,
      example_words,
    });

    return successResponse(res, createdKanji, null, "Kanji berhasil dibuat", 201);
  } catch (error: any) {
    console.error("❌ createKanji error:", error);
    return errorResponse(res, "CREATE_FAILED", error.message || "Gagal membuat kanji", error, 400);
  }
}

/**
 * Update data kanji
 */
export async function updateKanji(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedKanji = await kanjiService.updateKanji(id, req.body);

    return successResponse(res, updatedKanji, null, "Kanji berhasil diperbarui");
  } catch (error: any) {
    console.error("❌ updateKanji error:", error);
    return errorResponse(res, "UPDATE_FAILED", error.message || "Gagal memperbarui kanji", error, 400);
  }
}

/**
 * Ambil semua kanji
 */
export async function getAllKanji(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { search, level, page = "1", pageSize = "10" } = req.query;
    const kanjiList = await kanjiService.getAllKanji(
      req, 
      search as string, 
      level as string, 
      parseInt(page as string, 10), 
      parseInt(pageSize as string, 10)
    );

    return successResponse(res, kanjiList.data, kanjiList.meta, "Kanji berhasil diambil");
  } catch (error: any) {
    console.error("❌ getAllKanji error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil daftar kanji", error, 400);
  }
}

/**
 * Ambil kanji berdasarkan ID
 */
export async function getKanjiById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const kanji = await kanjiService.getKanjiById(id);

    if (!kanji) {
      return errorResponse(res, "NOT_FOUND", "Kanji tidak ditemukan", { id }, 404);
    }

    return successResponse(res, kanji, null, "Kanji berhasil diambil");
  } catch (error: any) {
    console.error("❌ getKanjiById error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil kanji", error, 400);
  }
}

/**
 * Ambil kanji berdasarkan level JLPT
 */
export async function getKanjiByLevel(req: Request, res: Response, next: NextFunction) {
  try {
    const { level } = req.params;
    const kanjiList = await kanjiService.getKanjiByLevel(level);

    return successResponse(res, kanjiList, null, "Kanji berhasil diambil");
  } catch (error: any) {
    console.error("❌ getKanjiByLevel error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil kanji berdasarkan level", error, 400);
  }
}

/**
 * Hapus kanji
 */
export async function deleteKanji(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deletedKanji = await kanjiService.deleteKanji(id);

    return successResponse(res, deletedKanji, null, "Kanji berhasil dihapus");
  } catch (error: any) {
    console.error("❌ deleteKanji error:", error);
    return errorResponse(res, "DELETE_FAILED", error.message || "Gagal menghapus kanji", error, 400);
  }
}

/**
 * Ambil kanji untuk belajar
 */
export const getKanjiForLearning = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user!.id;
    const limit = Number(req.query.kanji_per_set) || 5;
    const level = req.query.level as string;

    const words = await kanjiService.getKanjiForLearning(user_id, limit, level);

    return successResponse(res, words, null, "Kanji untuk belajar berhasil diambil");
  } catch (error: any) {
    console.error("❌ getKanjiForLearning error:", error);
    return errorResponse(res, "KANJI_FETCH_ERROR", error.message || "Gagal mengambil kanji", error, 400);
  }
};

