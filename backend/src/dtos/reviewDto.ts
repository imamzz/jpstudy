import { IsInt, IsString, IsNotEmpty, IsDate } from "class-validator";

export class CreateReviewDto {
    @IsInt({ message: "User ID wajib berupa integer" })
    @IsNotEmpty({ message: "User ID wajib diisi" })
    user_id!: number;

    @IsInt({ message: "Item ID wajib berupa integer" })
    @IsNotEmpty({ message: "Item ID wajib diisi" })
    item_id!: number;

    @IsString({ message: "Item type wajib berupa string" })
    @IsNotEmpty({ message: "Item type wajib diisi" })
    item_type!: string;

    @IsDate({ message: "Review date wajib berupa date" })
    @IsNotEmpty({ message: "Review date wajib diisi" })
    review_date!: string;

    @IsDate({ message: "Next review wajib berupa date" })
    @IsNotEmpty({ message: "Next review wajib diisi" })
    next_review!: string;

    @IsString({ message: "Review wajib berupa string" })
    @IsNotEmpty({ message: "Review wajib diisi" })
    review!: string;

    @IsInt({ message: "Attempt count wajib berupa integer" })
    @IsNotEmpty({ message: "Attempt count wajib diisi" })
    attempt_count!: string;

    @IsString({ message: "Correct wajib berupa string" })
    @IsNotEmpty({ message: "Correct wajib diisi" })
    correct!: string;
}
