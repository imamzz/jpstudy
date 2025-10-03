import { IsNumber, IsString } from "class-validator";

export class CreateVocabProgressDto {
    @IsNumber()
    vocab_id!: number;
  
    @IsString()
    status!: string; // "learned" | "mastered"
  }
  