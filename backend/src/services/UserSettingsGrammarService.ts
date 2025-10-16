import UserGrammarSettings from "../models/UserSettingsGrammar";
import { defaultSettings } from "../utils/defaultSettings";

/**
 * Ambil pengaturan grammar user (gunakan default jika belum tersimpan)
 */
export async function getGrammarSetting(userId: number) {
  const userSetting = await UserGrammarSettings.findOne({ where: { user_id: userId } });
  return userSetting || defaultSettings.grammar;
}

/**
 * Simpan / update pengaturan grammar user
 */
export async function saveGrammarSetting(userId: number, data: any) {
  await UserGrammarSettings.upsert({ user_id: userId, ...data });
  return await UserGrammarSettings.findOne({ where: { user_id: userId } });
}
