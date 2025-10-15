import { Request, Response, NextFunction } from "express";
import * as bookmarkService from "../services/bookmarkService";
import { successResponse, errorResponse } from "../utils/response";

/**
 * 🧩 Tambah bookmark baru
 */
export async function createBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const { kanji, kana, romaji, meaning } = req.body;

    if (!kanji && !kana && !romaji && !meaning) {
      return errorResponse(
        res,
        "VALIDATION_ERROR",
        "Minimal satu field (kanji, kana, romaji, meaning) harus diisi",
        req.body,
        400
      );
    }

    const bookmark = await bookmarkService.createBookmark({ kanji, kana, romaji, meaning });

    return successResponse(res, bookmark, null, "Bookmark berhasil dibuat", 201);
  } catch (error: any) {
    return errorResponse(res, "CREATE_FAILED", error.message || "Gagal membuat bookmark", error, 500);
  }
}

/**
 * ✏️ Update bookmark
 */
export async function updateBookmark(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await bookmarkService.updateBookmark(id, req.body);

    if (!updated) {
      return errorResponse(res, "NOT_FOUND", "Bookmark tidak ditemukan", { id }, 404);
    }

    return successResponse(res, updated, null, "Bookmark berhasil diperbarui");
  } catch (error: any) {
    return errorResponse(res, "UPDATE_FAILED", error.message || "Gagal memperbarui bookmark", error, 500);
  }
}

/**
 * 📘 Ambil semua bookmark
 */
export async function getAllBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const bookmarks = await bookmarkService.getAllBookmark();
    return successResponse(res, bookmarks, null, "Bookmark berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil daftar bookmark", error, 500);
  }
}

/**
 * 🔍 Ambil bookmark berdasarkan ID
 */
export async function getBookmarkById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const bookmark = await bookmarkService.getBookmarkById(id);

    if (!bookmark) {
      return errorResponse(res, "NOT_FOUND", "Bookmark tidak ditemukan", { id }, 404);
    }

    return successResponse(res, bookmark, null, "Bookmark berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil bookmark", error, 500);
  }
}

/**
 * 📗 Ambil bookmark berdasarkan level (misal N5, N4, dsb.)
 */
export async function getBookmarkByLevel(req: Request, res: Response, next: NextFunction) {
  try {
    const { level } = req.params;
    const bookmarks = await bookmarkService.getBookmarkByLevel(level);

    if (!bookmarks || bookmarks.bookmark.length === 0) {
      return errorResponse(res, "NOT_FOUND", "Bookmark dengan level tersebut tidak ditemukan", { level }, 404);
    }

    return successResponse(res, bookmarks.bookmark, null, "Bookmark berhasil diambil");
  } catch (error: any) {
    return errorResponse(res, "FETCH_FAILED", error.message || "Gagal mengambil bookmark berdasarkan level", error, 500);
  }
}

/**
 * ❌ Hapus bookmark
 */
export async function deleteBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deleted = await bookmarkService.deleteBookmark(id);

    if (!deleted) {
      return errorResponse(res, "NOT_FOUND", "Bookmark tidak ditemukan", { id }, 404);
    }

    return successResponse(res, deleted, null, "Bookmark berhasil dihapus");
  } catch (error: any) {
    return errorResponse(res, "DELETE_FAILED", error.message || "Gagal menghapus bookmark", error, 500);
  }
}
