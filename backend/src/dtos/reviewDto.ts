import { IsInt, IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateReviewDto {
  @IsInt({ message: "User ID wajib berupa integer" })
  @IsNotEmpty({ message: "User ID wajib diisi" })
  user_id!: number;

  @IsInt({ message: "Item ID wajib berupa integer" })
  @IsNotEmpty({ message: "Item ID wajib diisi" })
  item_id!: number;

  @IsString({ message: "Item type wajib berupa string" })
  @IsNotEmpty({ message: "Item type wajib diisi" })
  item_type!: string;

  @IsDateString({}, { message: "Review date wajib berupa tanggal (ISO string)" })
  @IsNotEmpty({ message: "Review date wajib diisi" })
  first_review_date!: string;

  @IsDateString({}, { message: "Next review wajib berupa tanggal (ISO string)" })
  @IsNotEmpty({ message: "Next review wajib diisi" })
  last_review_date!: string;

  @IsString({ message: "Review wajib berupa string" })
  @IsNotEmpty({ message: "Review wajib diisi" })
  review!: string;

  @IsInt({ message: "Attempt count wajib berupa integer" })
  @IsNotEmpty({ message: "Attempt count wajib diisi" })
  attempt_count!: number;

  @IsString({ message: "Correct wajib berupa string (contoh: 'true' atau 'false')" })
  @IsNotEmpty({ message: "Correct wajib diisi" })
  correct!: string;
}
