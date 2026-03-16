import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async create(alertData: Partial<Alert>): Promise<Alert> {
    const alert = this.alertRepository.create(alertData);
    return this.alertRepository.save(alert);
  }
}
