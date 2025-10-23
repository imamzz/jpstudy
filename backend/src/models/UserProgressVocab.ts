import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserProgressVocabAttributes {
  id: number;
  user_id: number;
  vocab_id: number;
  status?: string;
  last_studied?: Date;
  mastered_at?: Date | null;
}

interface UserProgressVocabCreationAttributes
  extends Optional<UserProgressVocabAttributes, "id" | "mastered_at"> {}

class UserProgressVocab
  extends Model<UserProgressVocabAttributes, UserProgressVocabCreationAttributes>
  implements UserProgressVocabAttributes
{
  public id!: number;
  public user_id!: number;
  public vocab_id!: number;
  public status?: string;
  public last_studied?: Date;
  public mastered_at?: Date | null;
}

UserProgressVocab.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    vocab_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING(10), allowNull: true },
    last_studied: { type: DataTypes.DATE, allowNull: true },
    mastered_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: "user_vocab_progress",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "vocab_id"], // mencegah duplikasi
      },
    ],
  }
);

export default UserProgressVocab;
