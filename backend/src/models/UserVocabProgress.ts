import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserVocabProgressAttributes {
    id: number;
    user_id: number;
    vocab_id: number;
    level: string;
    vocab: string;
    meaning: string;
    example?: string;
}

interface UserVocabProgressCreationAttributes extends Optional<UserVocabProgressAttributes, "id"> {}

class UserVocabProgress extends Model<UserVocabProgressAttributes, UserVocabProgressCreationAttributes> implements UserVocabProgressAttributes {
    public id!: number;
    public user_id!: number;
    public vocab_id!: number;
    public level!: string;
    public vocab!: string;
    public meaning!: string;
    public example?: string;
}

UserVocabProgress.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        vocab_id: { type: DataTypes.INTEGER, allowNull: false },
        level: { type: DataTypes.STRING(10), allowNull: false },
        vocab: { type: DataTypes.STRING(10), allowNull: false },
        meaning: { type: DataTypes.STRING(255), allowNull: false },
        example: { type: DataTypes.TEXT },
    },
    {
        sequelize,
        tableName: "user_vocab_progress",
        timestamps: true,
        underscored: false
    }
)

export default UserVocabProgress