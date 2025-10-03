import UserSettings from "../models/UserSettings";

export async function getUserSetting(userId: number) {
    const userSetting = await UserSettings.findOne({ where: { user_id: userId } });
    return userSetting;
}

export async function createUserSetting(userId: number) {
    const userSetting = await UserSettings.create({ user_id: userId, words_per_set: 10, seconds_per_word: 10, break_per_set: 10, target_level: "N5", dark_mode: false });
    return userSetting;
}

export async function updateUserSetting(userId: number, data: any) {
    const userSetting = await UserSettings.update(data, { where: { user_id: userId } });
    return userSetting;
}