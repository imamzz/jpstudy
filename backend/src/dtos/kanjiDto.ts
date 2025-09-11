import { IsString, IsNotEmpty } from "class-validator";

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

    @IsString({ message: "Level wajib berupa string" })
    @IsNotEmpty({ message: "Level wajib diisi" })
    level!: string;

    @IsString({ message: "Romaji wajib berupa string" })
    @IsNotEmpty({ message: "Romaji wajib diisi" })
    romaji!: string;
}