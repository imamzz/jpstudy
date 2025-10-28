import StudySession from "../models/StudySession";
import { fn, col, Op } from "sequelize";

// Helper untuk format YYYY-MM-DD
const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];

export const getStudySessionSummary = async (userId: string, days: number = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - (days - 1)); // ambil hari ini juga

    // Ambil data dari DB
    const summary = await StudySession.findAll({
      attributes: [
        [fn("DATE", col("start_time")), "date"],
        [fn("SUM", col("duration_seconds")), "duration_seconds"],
        [fn("SUM", col("item_count")), "item_count"],
        [fn("SUM", col("learned_count")), "learned_count"],
        [fn("SUM", col("mastered_count")), "mastered_count"],
      ],
      where: {
        user_id: userId,
        start_time: { [Op.gte]: sinceDate },
      },
      group: [fn("DATE", col("start_time"))],
      order: [[fn("DATE", col("start_time")), "ASC"]],
      raw: true,
    });

    // Konversi hasil ke map agar mudah dicocokkan
    const summaryMap: Record<string, any> = {};
    summary.forEach((row) => {
      const dateStr = formatDate(new Date(row.date));
      summaryMap[dateStr] = {
        date: dateStr,
        duration_seconds: Number(row.duration_seconds) || 0,
        item_count: Number(row.item_count) || 0,
        learned_count: Number(row.learned_count) || 0,
        mastered_count: Number(row.mastered_count) || 0,
      };
    });

    // Buat array 7 hari terakhir (termasuk hari ini)
    const result: any[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);

      result.push(
        summaryMap[dateStr] || {
          date: dateStr,
          duration_seconds: summaryMap[dateStr]?.duration_seconds || 0,
          item_count: summaryMap[dateStr]?.item_count || 0,
          learned_count: summaryMap[dateStr]?.learned_count || 0,
          mastered_count: summaryMap[dateStr]?.mastered_count || 0,
        }
      );
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getVocabStudySession = async (userId: string, days: number = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - (days - 1));
    const vocab = await StudySession.findAll({
      attributes: [
        [fn("DATE", col("start_time")), "date"],
        [fn("SUM", col("duration_seconds")), "duration_seconds"],
        [fn("SUM", col("item_count")), "item_count"],
        [fn("SUM", col("learned_count")), "learned_count"],
        [fn("SUM", col("mastered_count")), "mastered_count"],
      ],
      where: {
        user_id: userId,
        activity_type: "vocab",
        start_time: { [Op.gte]: sinceDate },
      },
      group: [fn("DATE", col("start_time"))],
      order: [[fn("DATE", col("start_time")), "ASC"]],
      raw: true,
    });
    const summaryMap: Record<string, any> = {};
    vocab.forEach((row) => {
      const dateStr = formatDate(new Date(row.date));
      summaryMap[dateStr] = {
        date: dateStr,
        duration_seconds: Number(row.duration_seconds) || 0,
        item_count: Number(row.item_count) || 0,
        learned_count: Number(row.learned_count) || 0,
        mastered_count: Number(row.mastered_count) || 0,
      };
    });
    const result: any[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);

      result.push(
        summaryMap[dateStr] || {
          date: dateStr,
          duration_seconds: summaryMap[dateStr]?.duration_seconds || 0,
          item_count: summaryMap[dateStr]?.item_count || 0,
          learned_count: summaryMap[dateStr]?.learned_count || 0,
          mastered_count: summaryMap[dateStr]?.mastered_count || 0,
        }
      );
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGrammarStudySession = async (userId: string, days: number = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);
    const grammar = await StudySession.findAll({
      where: { user_id: userId, activity_type: "grammar", start_time: { [Op.gte]: sinceDate } },
    });
    const summaryMap: Record<string, any> = {};
    grammar.forEach((row) => {
      const dateStr = formatDate(new Date(row.date));
      summaryMap[dateStr] = {
        date: dateStr,
        duration_seconds: Number(row.duration_seconds) || 0,
        item_count: Number(row.item_count) || 0,
        learned_count: Number(row.learned_count) || 0,
        mastered_count: Number(row.mastered_count) || 0,
      };
    });
    const result: any[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);

      result.push(
        summaryMap[dateStr] || {
          date: dateStr,
          duration_seconds: summaryMap[dateStr]?.duration_seconds || 0,
          item_count: summaryMap[dateStr]?.item_count || 0,
          learned_count: summaryMap[dateStr]?.learned_count || 0,
          mastered_count: summaryMap[dateStr]?.mastered_count || 0,
        }
      );
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getKanjiStudySession = async (userId: string, days: number = 7) => {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);
    const kanji = await StudySession.findAll({
      where: { user_id: userId, activity_type: "kanji", start_time: { [Op.gte]: sinceDate } },
    });
    const summaryMap: Record<string, any> = {};
    kanji.forEach((row) => {
      const dateStr = formatDate(new Date(row.date));
      summaryMap[dateStr] = {
        date: dateStr,
        duration_seconds: Number(row.duration_seconds) || 0,
        item_count: Number(row.item_count) || 0,
        learned_count: Number(row.learned_count) || 0,
        mastered_count: Number(row.mastered_count) || 0,
      };
    });
    const result: any[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);

      result.push(
        summaryMap[dateStr] || {
          date: dateStr,
          duration_seconds: summaryMap[dateStr]?.duration_seconds || 0,
          item_count: summaryMap[dateStr]?.item_count || 0,
          learned_count: summaryMap[dateStr]?.learned_count || 0,
          mastered_count: summaryMap[dateStr]?.mastered_count || 0,
        }
      );
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createStudySession = async (data: any) => {
  try {
    const studySession = await StudySession.create(data);
    return studySession;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
