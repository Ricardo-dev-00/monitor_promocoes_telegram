import { Controller, Get, Post, Body } from '@nestjs/common';
import { Keyword } from './keyword.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeywordService } from './keyword.service';
import { User } from '../auth/user.entity';

@Controller('keywords')
export class KeywordController {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
    private readonly keywordService: KeywordService,
  ) {}

  @Get()
  async findAll(): Promise<Keyword[]> {
    return this.keywordRepository.find();
  }

  @Post()
  async create(@Body() body: { keyword: string; userId?: number }): Promise<Keyword> {
    const payload: Partial<Keyword> = {
      keyword: body.keyword,
    };

    if (body.userId) {
      payload.user = { id: body.userId } as User;
    }

    return this.keywordService.create(payload);
  }
}
