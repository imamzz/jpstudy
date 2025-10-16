import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserSettingsGrammarAttributes {
  id: number;
  user_id: number;
  total_question_per_set: number;
  difficulty: "easy" | "medium" | "hard";
  break_per_set: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
  seconds_per_question: number;
  total_set: number;
}

interface UserSettingsGrammarCreationAttributes extends Optional<UserSettingsGrammarAttributes, "id"> {}

class UserSettingsGrammar extends Model<UserSettingsGrammarAttributes, UserSettingsGrammarCreationAttributes>
  implements UserSettingsGrammarAttributes {
  public id!: number;
  public user_id!: number;
  public total_question_per_set!: number;
  public difficulty!: "easy" | "medium" | "hard";
  public break_per_set!: number;
  public target_level!: "N5" | "N4" | "N3" | "N2" | "N1";
  public seconds_per_question!: number;
  public total_set!: number;
}
  
UserSettingsGrammar.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    total_question_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    difficulty: { type: DataTypes.ENUM("easy", "medium", "hard"), allowNull: false, defaultValue: "easy" },
    break_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 60 },
    target_level: { type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false, defaultValue: "N5" },
    seconds_per_question: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
    total_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
  },
  { sequelize, tableName: "user_settings_grammar", timestamps: true }
);

export default UserSettingsGrammar;
