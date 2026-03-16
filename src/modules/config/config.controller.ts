import { Controller, Post, Body } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  private config: { grupo: string, keywords: string[] } = { grupo: '', keywords: [] };

  @Post()
  async saveConfig(@Body() body: { grupo: string, keywords: string[] }) {
    this.config = body;
    return { success: true };
  }
}
