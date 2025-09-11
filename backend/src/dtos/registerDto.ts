import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString({ message: "Username wajib berupa string" })
  @IsNotEmpty({ message: "Username wajib diisi" })
  username!: string;

  @IsEmail()
  @IsNotEmpty({ message: "Email wajib diisi" })
  email!: string;

  @MinLength(6, { message: "Password minimal 6 karakter" })
  @IsNotEmpty({ message: "Password wajib diisi" })
  password!: string;
}
