import StudySession from "../models/StudySession";
import { fn, col, Op, literal } from "sequelize";

interface StudySummaryRow {
  date?: string;
  month?: string;
  duration_seconds: number;
  item_count: number;
  learned_count: number;
  mastered_count: number;
}

/**
 * Format tanggal lokal ke YYYY-MM-DD
 * (menghindari toISOString() yang menyebabkan offset timezone)
 */
const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Format bulan ke YYYY-MM */
const formatMonth = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

/** Awal minggu (Senin) */
const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Minggu, 1 = Senin
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Awal bulan */
const startOfMonth = (date: Date) => {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Awal tahun */
const startOfYear = (date: Date) => {
  const d = new Date(date.getFullYear(), 0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Build array tanggal kosong untuk tampilan (agar tetap 7 hari / 30 hari dll)
 * Sekarang berdasarkan tanggal referensi, bukan Date.now()
 */
const buildEmptyRange = (range: "week" | "month" | "year", refDate: Date) => {
  const result: string[] = [];

  if (range === "week") {
    const start = startOfWeek(refDate);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      result.push(formatDate(d));
    }
  } else if (range === "month") {
    const start = startOfMonth(refDate);
    const daysInMonth = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(refDate.getFullYear(), refDate.getMonth(), i);
      d.setHours(0, 0, 0, 0);
      result.push(formatDate(d));
    }
  } else if (range === "year") {
    for (let i = 0; i < 12; i++) {
      const d = new Date(refDate.getFullYear(), i, 1);
      d.setHours(0, 0, 0, 0);
      result.push(formatMonth(d));
    }
  }

  return result;
};

/**
 * Ambil data sesi belajar berdasarkan range (week, month, year)
 */
export const getStudySessionByRange = async (
  userId: string,
  activityType: "vocab" | "grammar" | "kanji" | null = null,
  range: "week" | "month" | "year" = "week",
  dateRef: Date = new Date()
) => {
  try {
    const now = dateRef;
    let sinceDate: Date;
    let groupBy: "day" | "month";

    if (range === "week") {
      sinceDate = startOfWeek(now);
      groupBy = "day";
    } else if (range === "month") {
      sinceDate = startOfMonth(now);
      groupBy = "day";
    } else {
      sinceDate = startOfYear(now);
      groupBy = "month";
    }

    // ✅ PostgreSQL-friendly attribute grouping
    const attributes =
      groupBy === "day"
        ? [
            [literal(`to_char("start_time" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM-DD')`), "date"],
            [fn("SUM", col("duration_seconds")), "duration_seconds"],
            [fn("SUM", col("item_count")), "item_count"],
            [fn("SUM", col("learned_count")), "learned_count"],
            [fn("SUM", col("mastered_count")), "mastered_count"],
          ]
        : [
            [literal(`to_char("start_time" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM')`), "month"],
            [fn("SUM", col("duration_seconds")), "duration_seconds"],
            [fn("SUM", col("item_count")), "item_count"],
            [fn("SUM", col("learned_count")), "learned_count"],
            [fn("SUM", col("mastered_count")), "mastered_count"],
          ];

    const where: any = {
      user_id: userId,
      start_time: { [Op.gte]: sinceDate },
    };
    if (activityType) where.activity_type = activityType;

    const rows = (await StudySession.findAll({
      attributes: attributes as any,
      where,
      group:
        groupBy === "day"
          ? [literal(`to_char("start_time" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM-DD')`)]
          : [literal(`to_char("start_time" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM')`)],
      order:
        groupBy === "day"
          ? [[literal(`MIN("start_time")`), "ASC"]]
          : [[literal(`MIN("start_time")`), "ASC"]],
      raw: true,
    })) as unknown as StudySummaryRow[];

    // Convert hasil query ke map agar mudah disusun ulang
    const summaryMap: Record<string, any> = {};
    rows.forEach((row) => {
      const key = groupBy === "day" ? row.date : row.month;
      if (!key) return;
      summaryMap[key] = {
        date: key,
        duration_seconds: Number(row.duration_seconds) || 0,
        item_count: Number(row.item_count) || 0,
        learned_count: Number(row.learned_count) || 0,
        mastered_count: Number(row.mastered_count) || 0,
      };
    });

    // Buat rentang tanggal kosong dan isi dengan hasil query
    const emptyRange = buildEmptyRange(range, now);
    const result = emptyRange.map((key) => ({
      date: key,
      duration_seconds: summaryMap[key]?.duration_seconds || 0,
      item_count: summaryMap[key]?.item_count || 0,
      learned_count: summaryMap[key]?.learned_count || 0,
      mastered_count: summaryMap[key]?.mastered_count || 0,
    }));

    return result;
  } catch (error) {
    console.error("getStudySessionByRange error:", error);
    throw error;
  }
};

/**
 * Membuat sesi belajar baru
 */
export const createStudySession = async (data: any) => {
  try {
    const studySession = await StudySession.create(data);
    return studySession;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
