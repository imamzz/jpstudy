import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserSettingsReviewAttributes {
  id: number;
  user_id: number;
  review_days_range: number;
  target_level: "N5" | "N4" | "N3" | "N2" | "N1";
}

interface UserSettingsReviewCreationAttributes extends Optional<UserSettingsReviewAttributes, "id"> {}

class UserSettingsReview extends Model<UserSettingsReviewAttributes, UserSettingsReviewCreationAttributes>
  implements UserSettingsReviewAttributes {
  public id!: number;
  public user_id!: number;
  public review_days_range!: number;
  public target_level!: "N5" | "N4" | "N3" | "N2" | "N1";
}

UserSettingsReview.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    review_days_range: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 7 },
    target_level: { type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false, defaultValue: "N5" },
  },
  { sequelize, tableName: "user_settings_review", timestamps: true }
);

export default UserSettingsReview;
