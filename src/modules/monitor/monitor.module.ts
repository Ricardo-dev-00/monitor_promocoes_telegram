import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationService } from '../notifications/notification.service';

@Module({
  providers: [MonitorService, TelegramService, NotificationService],
  controllers: [MonitorController],
})
export class MonitorModule {}
