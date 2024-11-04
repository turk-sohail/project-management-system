import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from 'src/api/roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsUUID('4', { each: true })
  role_id: Roles['role_id'];
}
