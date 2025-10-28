import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/authMiddleware";
import * as studySessionService from "../services/studySessionService";
import { Request, Response } from "express";

export const getStudySessionSummary = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const range = req.query.range;

    const summary = await studySessionService.getStudySessionByRange(userId, null, range as "week" | "month" | "year");
    return successResponse(res, summary, null, "Study session summary berhasil diambil");   
  } catch (error: any) {
    console.error(error);
    return errorResponse(res, "STUDY_SESSION_GET_ERROR", error.message || "Gagal mengambil study session", error, 400);
  }
};

export const getVocabStudySession = async (req: AuthRequest, res: any) => {
  try {
    const { userId } = req.params;
    const { range = "week" } = req.query; // week | month | year

    const data = await studySessionService.getStudySessionByRange(userId, "vocab", range as "week" | "month" | "year");

    return successResponse(res, data, null, "Vocab study session berhasil diambil");
  } catch (error: any) {
    console.error(error);
    return errorResponse(res, "STUDY_SESSION_GET_ERROR", error.message || "Gagal mengambil study session", error, 400);
  }
};

export const getGrammarStudySession = async (req: AuthRequest, res: any) => {
    try {
        const userId = req.user.id;
        const range = req.query.range;
        const grammar = await studySessionService.getStudySessionByRange(userId, "grammar", range as "week" | "month" | "year");
        return successResponse(res, grammar, null, "Grammar study session berhasil diambil");
    } catch (error: any) {
        console.error(error);
        return errorResponse(res, "STUDY_SESSION_GET_ERROR", error.message || "Gagal mengambil study session", error, 400);
    }
};

export const getKanjiStudySession = async (req: AuthRequest, res: any) => {
    try {
        const userId = req.user.id;
        const range = req.query.range;
        const kanji = await studySessionService.getStudySessionByRange(userId, "kanji", range as "week" | "month" | "year");
        return successResponse(res, kanji, null, "Kanji study session berhasil diambil");
    } catch (error: any) {
        console.error(error);
        return errorResponse(res, "STUDY_SESSION_GET_ERROR", error.message || "Gagal mengambil study session", error, 400);
    }
};


export const createStudySessionController = async (req: AuthRequest, res: Response) => {
  try {
    const {
      activity_type,
      start_time,
      end_time,
      duration_seconds,
      item_count,
      learned_count,
      mastered_count,
    } = req.body;

    const session = await studySessionService.createStudySession({
      user_id: req.user.id,
      activity_type,
      start_time,
      end_time,
      duration_seconds,
      item_count,
      learned_count,
      mastered_count,
    });

    return successResponse(res, session, null, "Study session berhasil direcord");
  } catch (error: any) {
    console.error(error);
    return errorResponse(res, "STUDY_SESSION_CREATE_ERROR", error.message || "Gagal merecord study session", error, 400);
  }
};
