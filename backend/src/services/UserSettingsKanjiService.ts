import UserKanjiSettings from "../models/UserSettingsKanji";
import { defaultSettings } from "../utils/defaultSettings";

/**
 * Ambil pengaturan kanji user (gunakan default jika belum tersimpan)
 */
export async function getKanjiSetting(userId: number) {
  const userSetting = await UserKanjiSettings.findOne({ where: { user_id: userId } });
  return userSetting || defaultSettings.kanji;
}

/**
 * Simpan / update pengaturan kanji user
 */
export async function saveKanjiSetting(userId: number, data: any) {
  await UserKanjiSettings.upsert({ user_id: userId, ...data });
  return await UserKanjiSettings.findOne({ where: { user_id: userId } });
}
