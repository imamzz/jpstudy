import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserVocabProgressAttributes {
    id: number;
    user_id: number;
    vocab_id: number;
    status: "learned" | "review" | "mastered";
    last_studied: Date;
    times_reviewed: number;
    // nullable untuk mastered
    mastered_at: Date | null;
}

interface UserVocabProgressCreationAttributes extends Optional<UserVocabProgressAttributes, "id"> {}

class UserVocabProgress extends Model<UserVocabProgressAttributes, UserVocabProgressCreationAttributes> implements UserVocabProgressAttributes {
    public id!: number;
    public user_id!: number;
    public vocab_id!: number;
    public status!: "learned" | "review" | "mastered";
    public last_studied!: Date;
    public times_reviewed!: number;
    public mastered_at!: Date | null;
}

UserVocabProgress.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        vocab_id: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM("learned", "review", "mastered"), allowNull: false },
        last_studied: { type: DataTypes.DATE, allowNull: false },
        times_reviewed: { type: DataTypes.INTEGER, allowNull: false },
        mastered_at: { type: DataTypes.DATE, allowNull: true }, 
    },
    {
        sequelize,
        tableName: "user_vocab_progress",
        timestamps: true,
    }
)

export default UserVocabProgress