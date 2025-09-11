import { IsString, IsOptional, IsIn, Length, IsNotEmpty } from "class-validator";

export class CreateVocabDto {
  @IsString({ message: "Word wajib berupa string" })
  @IsNotEmpty({ message: "Word wajib diisi" })
  @Length(1, 100, { message: "Word maksimal 100 karakter" })
  word!: string;

  @IsString({ message: "Kanji wajib berupa string" })
  kanji!: string;

  @IsOptional()
  @IsString({ message: "Romaji harus berupa string" })
  @IsNotEmpty({ message: "Romaji wajib diisi" })
  romaji?: string;

  @IsOptional()
  @IsString({ message: "Meaning harus berupa string" })
  @IsNotEmpty({ message: "Meaning wajib diisi" })
  meaning?: string;

  @IsOptional()
  @IsString({ message: "Example harus berupa string" })
  example?: string;

  @IsString({ message: "Level wajib diisi" })
  @IsIn(["N5", "N4", "N3", "N2", "N1"], { message: "Level harus salah satu dari N5, N4, N3, N2, N1" })
  @IsNotEmpty({ message: "Level wajib diisi" })
  level!: string;
}
