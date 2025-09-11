import { IsInt, IsString, IsOptional, IsIn } from "class-validator";

const ITEM_TYPES = ["vocab", "kanji", "grammar"]; // sesuaikan

export class UpdateBookmarkDto {
  @IsOptional()
  @IsInt({ message: "User ID wajib berupa integer" })
  user_id?: number;

  @IsOptional()
  @IsInt({ message: "Item ID wajib berupa integer" })
  item_id?: number;

  @IsOptional()
  @IsString({ message: "Item type wajib berupa string" })
  @IsIn(ITEM_TYPES, { message: `Item type harus salah satu dari: ${ITEM_TYPES.join(", ")}` })
  item_type?: string;
}
