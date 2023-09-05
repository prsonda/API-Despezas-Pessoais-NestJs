import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString({ message: 'Nome deve ser uma string' })
  @ApiProperty({ example: 'Nome do Usuário' })
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @ApiProperty({ example: '12345678' })
  password: string;

  @ApiProperty({
    example: 'Arquivo de imagem do usuário',
  })
  avatar: {
    location?: string;
    name?: string;
    size?: number;
    key?: string;
  };
}
