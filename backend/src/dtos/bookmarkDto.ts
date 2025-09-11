import { IsInt, IsString, IsNotEmpty } from "class-validator";

export class CreateBookmarkDto {
    
    @IsInt({ message: "User ID wajib berupa integer" })
    @IsNotEmpty({ message: "User ID wajib diisi" })
    user_id!: number;

    @IsInt({ message: "Item ID wajib berupa integer" })
    @IsNotEmpty({ message: "Item ID wajib diisi" })
    item_id!: number;

    @IsString({ message: "Item type wajib berupa string" })
    @IsNotEmpty({ message: "Item type wajib diisi" })
    item_type!: string;
}
