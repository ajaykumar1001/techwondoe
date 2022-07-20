import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyDto } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<any>,
  ) {}

  async createCompany(companyDto: CompanyDto): Promise<any> {
    try {
      const createdCompany = new this.companyModel(companyDto);
      return await createdCompany.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findByCompanyId(uuid: string): Promise<any> {
    try {
      return await this.companyModel.findOne({ uuid });
    } catch (error) {
      return error;
    }
  }

  async findById(_id: string): Promise<any> {
    try {
      return await this.companyModel.findById(_id);
    } catch (error) {
      return error;
    }
  }

  async findByName(name: string): Promise<any> {
    try {
      return await this.companyModel.findOne({ name });
    } catch (error) {
      return error;
    }
  }
}
