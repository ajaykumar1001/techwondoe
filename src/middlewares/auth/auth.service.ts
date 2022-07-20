import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/resources/company/company.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly companyService: CompanyService,
  ) {}
  login(_id: string) {
    return this.jwtService.sign({ _id });
  }

  async getCompanyById(_id: string) {
    return await this.companyService.findById(_id);
  }
}
