import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Word extends Model {
  public id!: number;
  public kanji!: string;
  public kana!: string;
  public romaji!: string;
  public meaning!: string;
}

Word.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kanji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    romaji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meaning: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Word",
    tableName: "words",
    timestamps: false, // kalau tabel tidak punya createdAt/updatedAt
  }
);

export default Word;
