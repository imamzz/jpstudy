import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserSettingsKanjiAttributes {
  id: number;
  user_id: number;
  kanji_per_set: number;
  seconds_per_kanji: number;
  break_per_set: number;
  total_set: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
  focus_mode: "arti" | "bacaan" | "campuran";
}

interface UserSettingsKanjiCreationAttributes extends Optional<UserSettingsKanjiAttributes, "id"> {}

class UserSettingsKanji extends Model<UserSettingsKanjiAttributes, UserSettingsKanjiCreationAttributes>
  implements UserSettingsKanjiAttributes {
  public id!: number;
  public user_id!: number;
  public kanji_per_set!: number;
  public seconds_per_kanji!: number;
  public break_per_set!: number;
  public total_set!: number;
  public target_level!: "N5" | "N4" | "N3" | "N2" | "N1";
  public focus_mode!: "arti" | "bacaan" | "campuran";
}

UserSettingsKanji.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    kanji_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    seconds_per_kanji: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    break_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 60 },
    total_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
    target_level: { type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false, defaultValue: "N5" },
    focus_mode: { type: DataTypes.ENUM("arti", "bacaan", "campuran"), allowNull: false, defaultValue: "campuran" },
  },
  { sequelize, tableName: "user_settings_kanji", timestamps: true }
);

export default UserSettingsKanji;
