import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/middlewares/auth/auth.module';
import { CompanyController } from './company.controller';
import { ComapnySchema } from './company.model';
import { CompanyService } from './company.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: ComapnySchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
