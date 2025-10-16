import UserReviewSettings from "../models/UserSettingsReview";
import { defaultSettings } from "../utils/defaultSettings";

/**
 * Ambil pengaturan review user (gunakan default jika belum tersimpan)
 */
export async function getReviewSetting(userId: number) {
  const userSetting = await UserReviewSettings.findOne({ where: { user_id: userId } });
  return userSetting || defaultSettings.review;
}

/**
 * Simpan / update pengaturan review user
 */
export async function saveReviewSetting(userId: number, data: any) {
  await UserReviewSettings.upsert({ user_id: userId, ...data });
  return await UserReviewSettings.findOne({ where: { user_id: userId } });
}
