import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserSettingsAttributes {
    id: number;
    user_id: number;
    words_per_set: number;
    seconds_per_word: number;
    target_level: "N5" | "N4" | "N3" | "N2" | "N1";
    dark_mode: boolean;
    break_per_set: number;
    total_set: number;
}

interface UserSettingsCreationAttributes extends Optional<UserSettingsAttributes, "id"> {}

class UserSettings extends Model<UserSettingsAttributes, UserSettingsCreationAttributes> implements UserSettingsAttributes {
    public id!: number;
    public user_id!: number;
    public words_per_set!: number;
    public seconds_per_word!: number;
    public target_level!: "N5" | "N4" | "N3" | "N2" | "N1";
    public dark_mode!: boolean;
    public break_per_set!: number;
    public total_set!: number;
}

UserSettings.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        words_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
        seconds_per_word: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 10 },
        break_per_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 60 },
        total_set: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
        target_level: { type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false, defaultValue: "N5" },
        dark_mode: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

    },
    {
        sequelize,
        tableName: "user_settings",
        timestamps: true,
        underscored: false
    }
)

export default UserSettings