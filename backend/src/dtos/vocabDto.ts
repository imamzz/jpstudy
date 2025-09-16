import { IsString, IsOptional, IsIn, Length, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

export class CreateVocabDto {
  @IsString({ message: "Kana wajib berupa string" })
  @IsNotEmpty({ message: "Kana wajib diisi" })
  @Length(1, 100, { message: "Kana maksimal 100 karakter" })
  kana!: string;

  @IsString({ message: "Kanji wajib berupa string" })
  @IsOptional()
  kanji?: string;

  @IsString({ message: "Romaji harus berupa string" })
  @IsNotEmpty({ message: "Romaji wajib diisi" })
  romaji!: string;

  @IsString({ message: "Meaning harus berupa string" })
  @IsNotEmpty({ message: "Meaning wajib diisi" })
  meaning!: string;

  @IsString({ message: "Example harus berupa string" })
  @IsOptional()
  example?: string;

  @Transform(({ value }) => (value ? String(value).toUpperCase() : value))
  @IsString({ message: "Level wajib berupa string" })
  @IsNotEmpty({ message: "Level wajib diisi" })
  @IsIn(LEVELS, { message: `Level harus salah satu dari ${LEVELS.join(", ")}` })
  level!: string;
}
