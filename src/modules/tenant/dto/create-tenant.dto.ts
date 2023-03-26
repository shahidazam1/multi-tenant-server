import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  @IsString()
  subdomain: string;

  @IsNotEmpty()
  @IsString()
  databaseName: string;
}
