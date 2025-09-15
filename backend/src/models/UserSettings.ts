import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserSettingsAttributes {
    id: number;
    user_id: number;
    words_per_set: number;
    seconds_per_word: number;
    target_level: "N5" | "N4" | "N3" | "N2" | "N1";
    dark_mode: boolean;
}

interface UserSettingsCreationAttributes extends Optional<UserSettingsAttributes, "id"> {}

class UserSettings extends Model<UserSettingsAttributes, UserSettingsCreationAttributes> implements UserSettingsAttributes {
    public id!: number;
    public user_id!: number;
    public words_per_set!: number;
    public seconds_per_word!: number;
    public target_level!: "N5" | "N4" | "N3" | "N2" | "N1";
    public dark_mode!: boolean;
}

UserSettings.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        words_per_set: { type: DataTypes.INTEGER, allowNull: false },
        seconds_per_word: { type: DataTypes.INTEGER, allowNull: false },
        target_level: { type: DataTypes.ENUM("N5", "N4", "N3", "N2", "N1"), allowNull: false },
        dark_mode: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        sequelize,
        tableName: "user_settings",
        timestamps: true,
        underscored: false
    }
)

export default UserSettings