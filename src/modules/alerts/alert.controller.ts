import { Controller, Get } from '@nestjs/common';
import { Alert } from './alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('alerts')
export class AlertController {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  @Get()
  async findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }
}
