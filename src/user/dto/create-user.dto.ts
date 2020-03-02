import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly email: string;
  
  @ApiProperty()
  password: string;
  
  @ApiProperty()
  passwordConfirmation: string;

}