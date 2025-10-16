import UserVocabSettings from "../models/UserSettingsVocab";
import { defaultSettings } from "../utils/defaultSettings";

/**
 * Ambil pengaturan vocab user (gunakan default jika belum tersimpan)
 */
export async function getVocabSetting(userId: number) {
  const userSetting = await UserVocabSettings.findOne({ where: { user_id: userId } });
  return userSetting || defaultSettings.vocab;
}

/**
 * Simpan / update pengaturan vocab user
 */
export async function saveVocabSetting(userId: number, data: any) {
  await UserVocabSettings.upsert({ user_id: userId, ...data });
  return await UserVocabSettings.findOne({ where: { user_id: userId } });
}
