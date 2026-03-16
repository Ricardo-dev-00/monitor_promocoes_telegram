import { Controller, Get } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller('promocoes')
export class PromocoesController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  async getPromocoes() {
    const promos = await this.promotionService.getAll();
    return { promocoes: promos.map(p => p.message) };
  }
}
