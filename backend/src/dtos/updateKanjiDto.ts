import { IsString, IsOptional, IsIn } from "class-validator";

const LEVELS = ["N1", "N2", "N3", "N4", "N5"];

export class UpdateKanjiDto {
    @IsOptional()
    @IsString({ message: "Level wajib berupa string" })
    @IsIn(LEVELS, { message: `Level harus salah satu dari ${LEVELS.join(", ")}` })
    level?: string;

    @IsOptional()
    @IsString({ message: "Meaning wajib berupa string" })
    meaning?: string;

    @IsOptional()
    @IsString({ message: "Example wajib berupa string" })
    example_words?: string;

    @IsOptional()
    @IsString({ message: "Word wajib berupa string" })
    word?: string;

    @IsOptional()
    @IsString({ message: "Romaji wajib berupa string" })
    romaji?: string;

    @IsOptional()
    @IsString({ message: "Example wajib berupa string" })
    example?: string;
}
