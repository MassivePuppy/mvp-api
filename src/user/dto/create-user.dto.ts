import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  readonly firstName: string

  @ApiProperty()
  @IsString()
  readonly lastName: string

  @ApiProperty()
  @IsEmail()
  readonly email: string

  @ApiProperty()
  @IsString()
  password: string
  
  @ApiProperty()
  @IsString()
  passwordConfirmation: string

}