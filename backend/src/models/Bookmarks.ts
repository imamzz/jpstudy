import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface BookmarkAttributes {
  id: number;
  user_id: number;
  item_type: string;
  item_id: number;
}

interface BookmarkCreationAttributes extends Optional<BookmarkAttributes, "id"> {}

class Bookmark
  extends Model<BookmarkAttributes, BookmarkCreationAttributes>
  implements BookmarkAttributes
{
  public id!: number;
  public user_id!: number;
  public item_type!: string;
  public item_id!: number;
}

Bookmark.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    item_type: { type: DataTypes.STRING(50), allowNull: false },
    item_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "bookmarks", timestamps: true, underscored: false }
);

export default Bookmark;
