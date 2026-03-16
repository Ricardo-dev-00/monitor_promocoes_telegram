import { Controller, Get, Post } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get()
  status() {
    return { status: 'monitor ativo' };
  }

  @Post('start')
  async startMonitor() {
    return { message: await this.monitorService.monitorarGrupos() };
  }
}
