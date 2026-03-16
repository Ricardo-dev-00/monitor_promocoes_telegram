import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('telegram-login')
  async telegramLogin(@Body() body: { telegramNumber: string }) {
    // Simulação: autenticação Telegram
    let user = await this.userService.findByPhone(body.telegramNumber);
    if (!user) {
      user = await this.userService.create({ phone: body.telegramNumber, telegram_session: '' });
    }
    // Geração real de JWT
    const payload = { userId: user.id, phone: user.phone };
    const secret = process.env.JWT_SECRET || 'segredo';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return { token };
  }
}
