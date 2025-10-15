import { Request, Response, NextFunction } from "express";
import * as grammarService from "../services/grammarService";
import { successResponse, errorResponse } from "../utils/response";

/**
 * Tambah grammar baru
 */
export async function createGrammar(req: Request, res: Response, next: NextFunction) {
  try {
    const { pattern, meaning, example, level } = req.body;

    if (!pattern || !meaning) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Field pattern dan meaning wajib diisi",
        { pattern, meaning },
        400
      );
    }

    const grammar = await grammarService.createGrammar({ pattern, meaning, example, level });

    return successResponse(res, grammar, null, "Grammar berhasil dibuat", 201);
  } catch (error: any) {
    console.error("❌ createGrammar error:", error);
    return errorResponse(res, "CREATE_FAILED", error.message || "Gagal membuat grammar", error, 400);
  }
}

/**
 * Update grammar
 */
export async function updateGrammar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const grammar = await grammarService.updateGrammar(id, req.body);

    return successResponse(res, grammar, null, "Grammar berhasil diperbarui");
  } catch (error: any) {
    console.error("❌ updateGrammar error:", error);
    return errorResponse(res, "UPDATE_FAILED", error.message || "Gagal memperbarui grammar", error, 400);
  }
}

/**
 * Ambil semua grammar
 */
export async function getAllGrammar(req: Request, res: Response, next: NextFunction) {
  try {
    const grammar = await grammarService.getAllGrammar();

    return successResponse(res, grammar, null, "Grammar berhasil diambil");
  } catch (error: any) {
    console.error("❌ getAllGrammar error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil grammar", error, 400);
  }
}

/**
 * Ambil grammar berdasarkan ID
 */
export async function getGrammarById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const grammar = await grammarService.getGrammarById(id);

    if (!grammar) {
      return errorResponse(res, "NOT_FOUND", "Grammar tidak ditemukan", { id }, 404);
    }

    return successResponse(res, grammar, null, "Grammar berhasil diambil");
  } catch (error: any) {
    console.error("❌ getGrammarById error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil grammar", error, 400);
  }
}

/**
 * Ambil grammar berdasarkan level JLPT
 */
export async function getGrammarByLevel(req: Request, res: Response, next: NextFunction) {
  try {
    const { level } = req.params;
    const grammar = await grammarService.getGrammarByLevel(level);

    return successResponse(res, grammar, null, "Grammar berhasil diambil");
  } catch (error: any) {
    console.error("❌ getGrammarByLevel error:", error);
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil grammar", error, 400);
  }
}

/**
 * Hapus grammar
 */
export async function deleteGrammar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await grammarService.deleteGrammar(id);

    return successResponse(res, deleted, null, "Grammar berhasil dihapus");
  } catch (error: any) {
    console.error("❌ deleteGrammar error:", error);
    return errorResponse(res, "DELETE_FAILED", error.message || "Gagal menghapus grammar", error, 400);
  }
}
