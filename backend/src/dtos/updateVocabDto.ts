import { IsString, IsOptional, IsIn, Length } from "class-validator";
import { Transform } from "class-transformer";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

export class UpdateVocabDto {
  @IsOptional()
  @IsString({ message: "Word wajib berupa string" })
  @Length(1, 100, { message: "Word maksimal 100 karakter" })
  word?: string;

  @IsOptional()
  @IsString({ message: "Kanji wajib berupa string" })
  kanji?: string;

  @IsOptional()
  @IsString({ message: "Romaji harus berupa string" })
  romaji?: string;

  @IsOptional()
  @IsString({ message: "Meaning harus berupa string" })
  meaning?: string;

  @IsOptional()
  @IsString({ message: "Example harus berupa string" })
  example?: string;

  @IsOptional()
  @Transform(({ value }) => (value ? String(value).toUpperCase() : value))
  @IsString({ message: "Level wajib berupa string" })
  @IsIn(LEVELS, { message: `Level harus salah satu dari ${LEVELS.join(", ")}` })
  level?: string;
}
