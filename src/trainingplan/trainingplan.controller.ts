import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessControlGuard } from 'src/auth/guards/access-control.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Domains } from 'src/constants/domains';
import { UseRoles } from 'src/decorators/use-roles.decorator';
import { CreateTrainingPlanDto } from './dto/create-trainingplan.dto';
import { UpdateTrainingPlanDto } from './dto/update-trainingplan.dto';
import { TrainingPlan } from './interfaces/trainingplan.interface';
import { TrainingPlanService } from './trainingplan.service';

@ApiTags(Domains.TRAINING_PLANS)
@Controller(Domains.TRAINING_PLANS)
export class TrainingPlanController {
  constructor(private readonly trainingPlanService: TrainingPlanService) { }

  @Get()
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.TRAINING_PLANS,
    action: 'read',
    possession: 'any',
  })
  getAllUsers(): Promise<TrainingPlan[]> {
    return this.trainingPlanService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.TRAINING_PLANS,
    action: 'read',
    possession: 'any',
  })
  findOne(@Param('id') id: string): Promise<TrainingPlan> {
    return this.trainingPlanService.getById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.TRAINING_PLANS,
    action: 'create',
    possession: 'any',
  })
  create(@Req() request: Request, @Body() createTrainingPlanDto: CreateTrainingPlanDto): Promise<TrainingPlan> {
    return this.trainingPlanService.createForUserId(createTrainingPlanDto, request.user['_id'])
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.TRAINING_PLANS,
    action: 'update',
    possession: 'own',
  })
  update(@Param('id') id: string, @Body() updateTrainingPlanDto: UpdateTrainingPlanDto): Promise<any> {
    return this.trainingPlanService.updateById(id, updateTrainingPlanDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AccessControlGuard)
  @UseRoles({
    resource: Domains.TRAINING_PLANS,
    action: 'delete',
    possession: 'own',
  })
  remove(@Param('id') id: string): Promise<any> {
    return this.trainingPlanService.deleteById(id)
  }

}
