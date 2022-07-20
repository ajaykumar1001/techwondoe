import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Constants } from 'src/utils/constants';
import { CustomResponse } from 'src/utils/response.dto';
import { customErrorResponse, teamCategorized } from 'src/utils/utility';
import { CompanyService } from '../company/company.service';
import { TeamDto } from './team.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly companyService: CompanyService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('/:companyId')
  async create(
    @Param('companyId') companyId,
    @Body() teamDto: TeamDto,
    @Res() res: Response,
  ) {
    const company = await this.companyService.findByCompanyId(companyId);
    if (company && company._id) {
      teamDto.cId = company._id;
      teamDto.companyId = company.uuid;
      const team = await this.teamService.createTeam(teamDto);
      if (team && team._id) {
        return res
          .status(HttpStatus.CREATED)
          .json(new CustomResponse(true, Constants.COMPANY.TEAM_CREATED, team));
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(
            new CustomResponse(false, customErrorResponse(team.code), null),
          );
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          new CustomResponse(false, Constants.COMPANY.NOT_REGISTERED, null),
        );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async getAllTeams() {
    const teams = await this.teamService.getAllTeams();
    const categorizedTeam = teamCategorized(teams);
    return categorizedTeam;
  }
}
