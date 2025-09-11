import { IsEmail, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Format email tidak valid" })
  email!: string;

  @MinLength(6, { message: "Password minimal 6 karakter" })
  password!: string;
}
