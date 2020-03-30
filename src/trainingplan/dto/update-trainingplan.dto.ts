import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateTrainingPlanDto {

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