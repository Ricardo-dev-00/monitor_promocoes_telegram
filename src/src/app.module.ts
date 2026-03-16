
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from '../modules/config/config.module';
import { PromocoesModule } from '../modules/promocoes/promocoes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { GroupsModule } from '../modules/groups/groups.module';
import { KeywordsModule } from '../modules/keywords/keywords.module';
import { AlertsModule } from '../modules/alerts/alerts.module';
import { MonitorModule } from '../modules/monitor/monitor.module';
import { TelegramModule } from '../modules/telegram/telegram.module';
import { NotificationsModule } from '../modules/notifications/notifications.module';

@Module({
  imports: [
    NestConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
    PromocoesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    GroupsModule,
    KeywordsModule,
    AlertsModule,
    MonitorModule,
    TelegramModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
