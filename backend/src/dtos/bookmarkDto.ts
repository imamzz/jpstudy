import { IsInt, IsString, IsNotEmpty, IsIn } from "class-validator";

const ITEM_TYPES = ["vocab", "kanji", "grammar"]; // contoh, sesuaikan dengan kebutuhan

export class CreateBookmarkDto {
  @IsInt({ message: "User ID wajib berupa integer" })
  @IsNotEmpty({ message: "User ID wajib diisi" })
  user_id!: number;

  @IsInt({ message: "Item ID wajib berupa integer" })
  @IsNotEmpty({ message: "Item ID wajib diisi" })
  item_id!: number;

  @IsString({ message: "Item type wajib berupa string" })
  @IsNotEmpty({ message: "Item type wajib diisi" })
  @IsIn(ITEM_TYPES, { message: `Item type harus salah satu dari: ${ITEM_TYPES.join(", ")}` })
  item_type!: string;
}
