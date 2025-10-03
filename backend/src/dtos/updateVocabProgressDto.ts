import { IsNumber } from "class-validator";

export class UpdateVocabProgressDto {
    @IsNumber()
    user_id?: number;

    @IsNumber()
    vocab_id?: number;
}
