import { Controller, Get } from '@nestjs/common';
import { Keyword } from './keyword.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('keywords')
export class KeywordController {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
  ) {}

  @Get()
  async findAll(): Promise<Keyword[]> {
    return this.keywordRepository.find();
  }
}
