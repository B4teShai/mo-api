import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    default: 'user@example.tdl',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'superPa$$$',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
