import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserKanjiProgressAttributes {
  id: number;
  user_id: number;
  kanji_id: number;
  level: string;
  kanji: string;
  meaning: string;
  example_words?: string;
  kana?: string;
  romaji?: string;
}

interface UserKanjiProgressCreationAttributes extends Optional<UserKanjiProgressAttributes, "id"> {}

class UserKanjiProgress extends Model<UserKanjiProgressAttributes, UserKanjiProgressCreationAttributes> implements UserKanjiProgressAttributes {
    public id!: number;
    public user_id!: number;
    public kanji_id!: number;
    public level!: string;
    public kanji!: string;
    public meaning!: string;
    public example_words?: string;
    public kana?: string;
    public romaji?: string;
}

UserKanjiProgress.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        kanji_id: { type: DataTypes.INTEGER, allowNull: false },
        level: { type: DataTypes.STRING(10), allowNull: false },
        kanji: { type: DataTypes.STRING(10), allowNull: false },
        meaning: { type: DataTypes.STRING(255), allowNull: false },
        example_words: { type: DataTypes.TEXT },
        kana: { type: DataTypes.STRING(255) },
        romaji: { type: DataTypes.STRING(255) },    
    },
    {
        sequelize,
        tableName: "user_kanji_progress",
        timestamps: true,
        underscored: false
    }
)

export default UserKanjiProgress