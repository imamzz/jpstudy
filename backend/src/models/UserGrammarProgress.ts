import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserGrammarProgressAttributes {
    id: number;
    user_id: number;
    grammar_id: number;
    level: string;
    grammar: string;
    meaning: string;
    example?: string;
}

interface UserGrammarProgressCreationAttributes extends Optional<UserGrammarProgressAttributes, "id"> {}

class UserGrammarProgress extends Model<UserGrammarProgressAttributes, UserGrammarProgressCreationAttributes> implements UserGrammarProgressAttributes {
    public id!: number;
    public user_id!: number;
    public grammar_id!: number;
    public level!: string;
    public grammar!: string;
    public meaning!: string;
    public example?: string;
}

UserGrammarProgress.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        grammar_id: { type: DataTypes.INTEGER, allowNull: false },
        level: { type: DataTypes.STRING(10), allowNull: false },
        grammar: { type: DataTypes.STRING(10), allowNull: false },
        meaning: { type: DataTypes.STRING(255), allowNull: false },
        example: { type: DataTypes.TEXT },
    },
    {
        sequelize,
        tableName: "user_grammar_progress",
        timestamps: true,
        underscored: false
    }
)

export default UserGrammarProgress