import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserProgressKanjiAttributes {
  id: number;
  user_id: number;
  kanji_id: number;
  status?: string;
  last_studied?: Date;
  mastered_at?: Date | null;
}

interface UserProgressKanjiCreationAttributes
  extends Optional<UserProgressKanjiAttributes, "id" | "mastered_at"> {}

class UserProgressKanji
  extends Model<UserProgressKanjiAttributes, UserProgressKanjiCreationAttributes>
  implements UserProgressKanjiAttributes
{
  public id!: number;
  public user_id!: number;
  public kanji_id!: number;
  public status?: string;
  public last_studied?: Date;
  public mastered_at?: Date | null;
}

UserProgressKanji.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    kanji_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING(10), allowNull: true },
    last_studied: { type: DataTypes.DATE, allowNull: true },
    mastered_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "user_kanji_progress",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "kanji_id"], // mencegah duplikasi
      },
    ],
  }
);

export default UserProgressKanji;
