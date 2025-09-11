import Bookmark from "../models/Bookmarks";

export async function createBookmark(data: any) {
  const existingBookmark = await Bookmark.findOne({ where: { item_id: data.item_id } });
  if (existingBookmark) {
    throw new Error("Bookmark already exists");
  }
  const bookmark = await Bookmark.create(data);
  return {
    bookmark: { id: bookmark.id, item_id: bookmark.item_id },
  };
}

export async function getAllBookmark() {
  const bookmark = await Bookmark.findAll({ attributes: ["id", "item_id"], order: [["id", "ASC"]] });
  return {
    bookmark: bookmark,
  };
}

export async function getBookmarkById(id: string) {
  const bookmark = await Bookmark.findByPk(id, { attributes: ["id", "item_id"], order: [["id", "ASC"]] });
  return {
    bookmark: bookmark,
  };
}

export async function getBookmarkByLevel(level: string) {
  const bookmark = await Bookmark.findAll({ where: { item_type: level }, attributes: ["id", "item_id"], order: [["id", "ASC"]] });
  return {
    bookmark: bookmark,
  };
}

export async function deleteBookmark(id: string) {
  const bookmark = await Bookmark.findByPk(id);
  if (!bookmark) throw new Error("Bookmark not found");

  await bookmark.destroy();
  return bookmark;
}
