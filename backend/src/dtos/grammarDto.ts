import { IsNotEmpty, IsString } from "class-validator";

export class CreateGrammarDto {
  @IsString()
  @IsNotEmpty()
  level!: string;

  @IsString()
  @IsNotEmpty()
  pattern!: string;

  @IsString()
  @IsNotEmpty()
  meaning!: string;

  @IsString()
  @IsNotEmpty()
  example!: string;
}
