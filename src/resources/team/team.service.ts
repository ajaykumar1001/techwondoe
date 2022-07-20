import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamDto } from './team.dto';

@Injectable()
export class TeamService {
  constructor(@InjectModel('Team') private readonly teamModel: Model<any>) {}

  async createTeam(teamDto: TeamDto): Promise<any> {
    try {
      const createdTeam = new this.teamModel(teamDto);
      return await createdTeam.save();
    } catch (error) {
      return error;
    }
  }

  async getAllTeams(): Promise<any> {
    try {
      return await this.teamModel.find().populate('cId', { uuid: 1, name: 1 });
    } catch (error) {
      return error;
    }
  }
}
