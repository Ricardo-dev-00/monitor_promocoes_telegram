import { Controller, Get, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Get()
  status() {
    return { status: 'telegram ativo' };
  }

  @Post('connect')
  async connectTelegram(@Body() user: any) {
    // Recebe dados do Telegram enviados pelo frontend
    return { message: await this.telegramService.conectar(user) };
  }

  @Post('search')
  async searchPromotions(@Body() body: { grupoId: string, keywords: string[] }) {
    const { grupoId, keywords } = body;
    const resultados = await this.telegramService.buscarMensagens(grupoId, keywords);
    return { resultados };
  }
}
