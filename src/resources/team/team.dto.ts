import { IsNotEmpty, IsString } from 'class-validator';
import { CompanyDto } from '../company/company.dto';

export class TeamDto {
  @IsNotEmpty()
  @IsString()
  readonly uuid: string;

  companyId: string;

  cId: CompanyDto;

  @IsNotEmpty()
  @IsString()
  readonly tlName: string;
}
