import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface ReviewAttributes {
  id: number;
  user_id: number;
  item_type: "vocab" | "kanji" | "grammar";
  item_id: number;
  first_review_date: Date;
  last_review_date: Date | null; // ✅ bisa null di awal
  attempt_count: number;
  correct: boolean | null; // ✅ bisa null sebelum ada hasil review
  ease_factor: number | null; // opsional untuk masa depan
  interval_days: number | null; // opsional untuk masa depan
  repetition_count: number | null; // opsional untuk masa depan
}

interface ReviewCreationAttributes
  extends Optional<
    ReviewAttributes,
    "id" | "last_review_date" | "correct" | "ease_factor" | "interval_days" | "repetition_count"
  > {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes {
  public id!: number;
  public user_id!: number;
  public item_type!: "vocab" | "kanji" | "grammar";
  public item_id!: number;
  public first_review_date!: Date;
  public last_review_date!: Date | null;
  public attempt_count!: number;
  public correct!: boolean | null;
  public ease_factor!: number | null;
  public interval_days!: number | null;
  public repetition_count!: number | null;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    item_type: { type: DataTypes.ENUM("vocab", "kanji", "grammar"), allowNull: false },
    item_id: { type: DataTypes.INTEGER, allowNull: false },
    first_review_date: { type: DataTypes.DATE, allowNull: false },
    last_review_date: { type: DataTypes.DATE, allowNull: true }, // ✅ boleh null
    attempt_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    correct: { type: DataTypes.BOOLEAN, allowNull: true }, // ✅ boleh null
    ease_factor: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 2.5 },
    interval_days: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    repetition_count: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  },
  { sequelize, tableName: "reviews", timestamps: true }
);

export default Review;
