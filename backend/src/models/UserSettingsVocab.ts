import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserSettingsVocabAttributes {
  id: number;
  user_id: number;
  words_per_set: number;
  seconds_per_word: number;
  break_per_set: number;
  total_set: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
}

interface UserSettingsVocabCreationAttributes extends Optional<UserSettingsVocabAttributes, "id"> {}

class UserSettingsVocab extends Model<UserSettingsVocabAttributes, UserSettingsVocabCreationAttributes>
  implements UserSettingsVocabAttributes {
  public id!: number;
  public user_id!: number;
  public words_per_set!: number;
  public seconds_per_word!: number;
  public break_per_set!: number;
  public total_set!: number;
  public target_level!: "N5" | "N4" | "N3" | "N2" | "N1";
}

UserSettingsVocab.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    words_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    seconds_per_word: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    break_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 60 },
    total_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
    target_level: { type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false, defaultValue: "N5" },
  },
  { sequelize, tableName: "user_settings_vocab", timestamps: true }
);

export default UserSettingsVocab;
