import { IsInt, IsString, IsOptional, IsDateString } from "class-validator";

export class UpdateReviewDto {
  @IsOptional()
  @IsInt({ message: "User ID wajib berupa integer" })
  user_id?: number;

  @IsOptional()
  @IsInt({ message: "Item ID wajib berupa integer" })
  item_id?: number;

  @IsOptional()
  @IsString({ message: "Item type wajib berupa string" })
  item_type?: string;

  @IsOptional()
  @IsDateString({}, { message: "Review date wajib berupa tanggal (ISO string)" })
  review_date?: string;

  @IsOptional()
  @IsDateString({}, { message: "Next review wajib berupa tanggal (ISO string)" })
  next_review?: string;

  @IsOptional()
  @IsString({ message: "Review wajib berupa string" })
  review?: string;

  @IsOptional()
  @IsInt({ message: "Attempt count wajib berupa integer" })
  attempt_count?: number;

  @IsOptional()
  @IsString({ message: "Correct wajib berupa string (contoh: 'true' atau 'false')" })
  correct?: string;
}
