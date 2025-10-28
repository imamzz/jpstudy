import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface StudySessionAttributes {
  id: number;
  user_id: number;
  activity_type: "vocab" | "kanji" | "grammar";
  start_time: Date;
  end_time: Date | null;
  duration_seconds: number;
  item_count: number;
  learned_count: number;
  mastered_count: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface StudySessionCreationAttributes
  extends Optional<
    StudySessionAttributes,
    "id" | "end_time" | "duration_seconds" | "item_count" | "learned_count" | "mastered_count"
  > {}

class StudySession
  extends Model<StudySessionAttributes, StudySessionCreationAttributes>
  implements StudySessionAttributes
{
  public id!: number;
  public user_id!: number;
  public activity_type!: "vocab" | "kanji" | "grammar";
  public start_time!: Date;
  public end_time!: Date | null;
  public duration_seconds!: number;
  public item_count!: number;
  public learned_count!: number;
  public mastered_count!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudySession.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    activity_type: { type: DataTypes.ENUM("vocab", "kanji", "grammar"), allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: true },
    duration_seconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    item_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    learned_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    mastered_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    sequelize,
    tableName: "study_sessions",
    timestamps: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["start_time"] },
    ],
  }
);

export default StudySession;
