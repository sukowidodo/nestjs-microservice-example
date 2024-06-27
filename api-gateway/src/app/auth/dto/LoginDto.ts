import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'voodoomodoo@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: '12345678',
  })
  password: string;
}
