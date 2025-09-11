import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface VocabAttributes {
  id: number;
  word: string;
  meaning: string;
  example?: string;
  level: string;
}

interface VocabCreationAttributes extends Optional<VocabAttributes, "id"> {}

class Vocab extends Model<VocabAttributes, VocabCreationAttributes>
  implements VocabAttributes {
  public id!: number;
  public word!: string;
  public meaning!: string;
  public example?: string;
  public level!: string;
}

Vocab.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    word: { type: DataTypes.STRING, allowNull: false },
    meaning: { type: DataTypes.STRING, allowNull: false },
    example: { type: DataTypes.TEXT },
    level: { type: DataTypes.STRING(10), allowNull: false },
  },
  { sequelize, tableName: "vocab", timestamps: true, underscored: false }
);

export default Vocab;
