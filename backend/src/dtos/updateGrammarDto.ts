import { IsOptional, IsString, IsIn } from "class-validator";
import { Transform } from "class-transformer";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

export class UpdateGrammarDto {
  @IsOptional()
  @Transform(({ value }) => (value ? String(value).toUpperCase() : value))
  @IsString({ message: "Level wajib berupa string" })
  @IsIn(LEVELS, { message: `Level harus salah satu dari ${LEVELS.join(", ")}` })
  level?: string;

  @IsOptional()
  @IsString({ message: "Pattern wajib berupa string" })
  pattern?: string;

  @IsOptional()
  @IsString({ message: "Meaning wajib berupa string" })
  meaning?: string;

  @IsOptional()
  @IsString({ message: "Example wajib berupa string" })
  example?: string;
}
