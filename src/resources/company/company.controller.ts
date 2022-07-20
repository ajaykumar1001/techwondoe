import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/middlewares/auth/auth.service';
import { Constants } from 'src/utils/constants';
import { CustomResponse } from 'src/utils/response.dto';
import {
  comparePassword,
  customErrorResponse,
  encryptPassword,
} from 'src/utils/utility';
import { LoginDto } from '../dto/login.dto';
import { CompanyService } from './company.service';
import { SignupCompanyDto } from '../dto/signup.dto';
import { QueryDto } from '../dto/query.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly authService: AuthService,
  ) {}
  @Post('/signup')
  async create(@Body() signupDto: SignupCompanyDto, @Res() res: Response) {
    signupDto.password = encryptPassword(signupDto.password);
    const company = await this.companyService.createCompany(signupDto);
    if (company && company._id) {
      return res
        .status(HttpStatus.CREATED)
        .json(
          new CustomResponse(true, Constants.COMPANY.COMPANY_CREATED, company),
        );
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new CustomResponse(false, customErrorResponse(company.code), null),
        );
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const company = await this.companyService.findByCompanyId(body.uuid);
    if (company && company._id) {
      if (comparePassword(body.password, company.password)) {
        const token = this.authService.login(company._id);
        return res.status(HttpStatus.CREATED).json(
          new CustomResponse(true, Constants.COMPANY.LOGIN_SUCCESS, {
            token,
            company,
          }),
        );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(
            new CustomResponse(false, customErrorResponse(company.code), null),
          );
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new CustomResponse(false, customErrorResponse(company.code), null),
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCompanyByUuidOrName(@Query() query: QueryDto, @Res() res: Response) {
    let company = null;
    if (query.uuid && query.uuid !== '') {
      company = await this.companyService.findByCompanyId(query.uuid);
    } else if (query.name && query.name !== '') {
      company = await this.companyService.findByName(query.name);
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new CustomResponse(false, Constants.COMMON.MISSING_PARAMETER, null),
        );
    }

    if (company && company._id) {
      return res
        .status(HttpStatus.OK)
        .json(
          new CustomResponse(
            true,
            Constants.COMMON.RECORD_FETCH_SUCCESS,
            company,
          ),
        );
    } else {
      return res
        .status(HttpStatus.OK)
        .json(new CustomResponse(true, Constants.COMMON.NO_RECORD_FOUND, null));
    }
  }
}
