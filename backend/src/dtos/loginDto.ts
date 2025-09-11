import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: "Email wajib diisi" })
  email!: string;

  @MinLength(6, { message: "Password minimal 6 karakter" })
  password!: string;
}
