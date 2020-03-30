import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateTrainingPlanDto {

  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsString()
  readonly description: string

  @ApiProperty()
  @IsInt()
  readonly duration: number

  @ApiProperty()
  @IsInt()
  readonly intensity: number

}