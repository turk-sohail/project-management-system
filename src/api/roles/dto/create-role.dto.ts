import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(200)
  @IsOptional()
  description: string;
  @IsString()
  rights: string;
}
