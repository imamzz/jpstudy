import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface GrammarAttributes {
  id: number;
  level: string;
  pattern: string;
  meaning: string;
  example?: string;
}

interface GrammarCreationAttributes extends Optional<GrammarAttributes, "id"> {}

class Grammar extends Model<GrammarAttributes, GrammarCreationAttributes>
  implements GrammarAttributes {
  public id!: number;
  public level!: string;
  public pattern!: string;
  public meaning!: string;
  public example?: string;
}

Grammar.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    level: { type: DataTypes.STRING(10), allowNull: false },
    pattern: { type: DataTypes.STRING, allowNull: false },
    meaning: { type: DataTypes.TEXT, allowNull: false },
    example: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: "grammar", timestamps: true, underscored: false }
);

export default Grammar;
