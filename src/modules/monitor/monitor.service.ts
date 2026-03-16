import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class MonitorService {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly notificationService: NotificationService,
  ) {}

  async monitorarGrupos(): Promise<string> {
    // Aqui será implementada a lógica real de integração com Telegram
    return 'Monitoramento iniciado: buscando promoções nos grupos.';
  }

  // Rotina para monitorar grupos periodicamente
  async monitorarPeriodicamente(grupoId: string, keywords: string[]): Promise<void> {
    setInterval(async () => {
      const promos = await this.telegramService.buscarMensagens(grupoId, keywords);
      if (promos.length > 0 && promos[0] !== 'Nenhuma promoção encontrada.') {
        await this.notificationService.notificar(promos);
        console.log('Promoções encontradas e notificadas:', promos);
      }
    }, 60000); // a cada 60 segundos
  }
}
