import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface ReviewAttributes {
  id: number;
  user_id: number;
  item_type: string;
  item_id: number;
  review_date: Date;
  next_review: Date;
  attempt_count: number;
  correct: boolean;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes {
  public id!: number;
  public user_id!: number;
  public item_type!: string;
  public item_id!: number;
  public review_date!: Date;
  public next_review!: Date;
  public attempt_count!: number;
  public correct!: boolean;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    item_type: { type: DataTypes.STRING(50), allowNull: false },
    item_id: { type: DataTypes.INTEGER, allowNull: false },
    review_date: { type: DataTypes.DATE, allowNull: false },
    next_review: { type: DataTypes.DATE, allowNull: false },
    attempt_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    correct: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: "reviews", timestamps: true, underscored: false }
);

export default Review;
