import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  async notificar(promos: string[]): Promise<void> {
    // Simulação: apenas loga as promoções
    console.log('Notificando usuários:', promos);
    // Aqui pode integrar com email, Telegram, etc.
  }
}
