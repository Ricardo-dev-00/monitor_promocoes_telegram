import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './keyword.entity';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
  ) {}

  async findAll(): Promise<Keyword[]> {
    return this.keywordRepository.find();
  }

  async create(keywordData: Partial<Keyword>): Promise<Keyword> {
    const keyword = this.keywordRepository.create(keywordData);
    return this.keywordRepository.save(keyword);
  }
}
