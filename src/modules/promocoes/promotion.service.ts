import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
  ) {}

  async savePromotion(group: string, keyword: string, message: string): Promise<Promotion> {
    const promo = this.promotionRepository.create({ group, keyword, message });
    return this.promotionRepository.save(promo);
  }

  async getAll(): Promise<Promotion[]> {
    return this.promotionRepository.find({ order: { createdAt: 'DESC' } });
  }
}
