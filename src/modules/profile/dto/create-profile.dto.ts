import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { REQUEST_STATUS } from 'src/utils/constants';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  note: string;
}
