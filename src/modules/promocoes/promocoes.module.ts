import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './promotion.entity';
import { PromocoesController } from './promocoes.controller';
import { PromotionService } from './promotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  controllers: [PromocoesController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromocoesModule {}
