import { IsNotEmpty, IsString, IsIn } from "class-validator";

export class CreateGrammarDto {
  @IsString({ message: "Level wajib berupa string" })
  @IsNotEmpty({ message: "Level wajib diisi" })
  @IsIn(["N5", "N4", "N3", "N2", "N1"], { message: "Level harus salah satu dari N5, N4, N3, N2, N1" })
  level!: string;

  @IsString({ message: "Pattern wajib berupa string" })
  @IsNotEmpty({ message: "Pattern wajib diisi" })
  pattern!: string;

  @IsString({ message: "Meaning wajib berupa string" })
  @IsNotEmpty({ message: "Meaning wajib diisi" })
  meaning!: string;

  @IsString({ message: "Example wajib berupa string" })
  @IsNotEmpty({ message: "Example wajib diisi" })
  example!: string;
}
