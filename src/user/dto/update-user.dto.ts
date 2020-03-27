import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class UpdateUserDto {

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

}