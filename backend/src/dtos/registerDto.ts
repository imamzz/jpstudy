import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  username!: string;

  @IsEmail({}, { message: "Format email tidak valid" })
  email!: string;

  @MinLength(6, { message: "Password minimal 6 karakter" })
  password!: string;
}
