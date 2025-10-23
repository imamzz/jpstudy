import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserGrammarProgressAttributes {
  id: number;
  user_id: number;
  grammar_id: number;
  status?: string;
  last_studied?: Date;
  mastered_at?: Date | null;
}

interface UserGrammarProgressCreationAttributes
  extends Optional<UserGrammarProgressAttributes, "id" | "mastered_at"> {}

class UserGrammarProgress
  extends Model<UserGrammarProgressAttributes, UserGrammarProgressCreationAttributes>
  implements UserGrammarProgressAttributes
{
  public id!: number;
  public user_id!: number;
  public grammar_id!: number;
  public status?: string;
  public last_studied?: Date;
  public mastered_at?: Date | null;
}

UserGrammarProgress.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    grammar_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING(10), allowNull: true },
    last_studied: { type: DataTypes.DATE, allowNull: true },
    mastered_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "user_grammar_progress",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "grammar_id"], // mencegah duplikasi
      },
    ],
  }
);

export default UserGrammarProgress;
