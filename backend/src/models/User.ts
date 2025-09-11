import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// definisikan attributes user
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin"; // lebih aman pakai union type
}

// atribut opsional ketika create user baru (id auto increment)
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "user" | "admin";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email tidak valid" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // ✅ ENUM lebih aman
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // ✅ aktifkan createdAt & updatedAt (umumnya dibutuhkan)
    underscored: false, // ✅ kalau mau pakai snake_case di DB (created_at, updated_at)
  }
);

export default User;
