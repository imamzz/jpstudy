import { Optional } from "sequelize";
import { Model } from "sequelize";
import sequelize from "../config/database";
import { DataTypes } from "sequelize";

export interface UserAchievementsAttributes {
  id: number;
  user_id: number;
  achievement_id: number;
  unlock_at: Date;
}

interface UserAchievementsCreationAttributes extends Optional<UserAchievementsAttributes, "id"> {}

class UserAchievements extends Model<UserAchievementsAttributes, UserAchievementsCreationAttributes> implements UserAchievementsAttributes {
  public id!: number;
  public user_id!: number;
  public achievement_id!: number;
  public unlock_at!: Date;
}

UserAchievements.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    achievement_id: { type: DataTypes.INTEGER, allowNull: false },
    unlock_at: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "user_achievements", timestamps: true, underscored: false }
);

export default UserAchievements;
