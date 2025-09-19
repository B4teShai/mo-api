import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;
}
