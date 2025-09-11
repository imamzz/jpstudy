import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface KanjiAttributes {
  id: number;
  level: string;
  kanji: string;
  meaning: string;
  example_words?: string;
  word?: string;
  romaji?: string;
}

interface KanjiCreationAttributes extends Optional<KanjiAttributes, "id"> {}

class Kanji extends Model<KanjiAttributes, KanjiCreationAttributes>
  implements KanjiAttributes {
  public id!: number;
  public level!: string;
  public kanji!: string;
  public meaning!: string;
  public example_words?: string;
  public word?: string;
  public romaji?: string;
}

Kanji.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    level: { type: DataTypes.STRING(10), allowNull: false },
    kanji: { type: DataTypes.STRING(10), allowNull: false },
    meaning: { type: DataTypes.STRING(255), allowNull: false },
    example_words: { type: DataTypes.TEXT },
    word: { type: DataTypes.STRING(255) },
    romaji: { type: DataTypes.STRING(255) },
  },
  { sequelize, tableName: "kanji", timestamps: true, underscored: false }
);

export default Kanji;
