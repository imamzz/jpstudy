import { IsString, IsNotEmpty, IsIn } from "class-validator";
import { Transform } from "class-transformer";

const LEVELS = ["N1", "N2", "N3", "N4", "N5"];

export class CreateKanjiDto {
  @IsString({ message: "Kanji wajib berupa string" })
  @IsNotEmpty({ message: "Kanji wajib diisi" })
  kanji!: string;

  @IsString({ message: "Word wajib berupa string" })
  @IsNotEmpty({ message: "Word wajib diisi" })
  word!: string;

  @IsString({ message: "Meaning wajib berupa string" })
  @IsNotEmpty({ message: "Meaning wajib diisi" })
  meaning!: string;

  @IsString({ message: "Example words wajib berupa string" })
  example_words!: string;

  @Transform(({ value }) => (value ? String(value).toUpperCase() : value))
  @IsString({ message: "Level wajib berupa string" })
  @IsNotEmpty({ message: "Level wajib diisi" })
  @IsIn(LEVELS, { message: `Level hanya boleh salah satu dari: ${LEVELS.join(", ")}` })
  level!: string;

  @IsString({ message: "Romaji wajib berupa string" })
  @IsNotEmpty({ message: "Romaji wajib diisi" })
  romaji!: string;
}
