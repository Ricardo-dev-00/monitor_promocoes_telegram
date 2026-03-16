import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeywordGroup } from './keyword_group.entity';

@Injectable()
export class KeywordGroupService {
  constructor(
    @InjectRepository(KeywordGroup)
    private readonly keywordGroupRepository: Repository<KeywordGroup>,
  ) {}

  async findAll(): Promise<KeywordGroup[]> {
    return this.keywordGroupRepository.find();
  }

  async create(data: Partial<KeywordGroup>): Promise<KeywordGroup> {
    const group = this.keywordGroupRepository.create(data);
    return this.keywordGroupRepository.save(group);
  }
}
