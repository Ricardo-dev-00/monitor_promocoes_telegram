import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeywordGroup } from './keyword_group.entity';
import { Keyword } from './keyword.entity';
import { Group } from '../groups/group.entity';

@Injectable()
export class KeywordGroupService {
  constructor(
    @InjectRepository(KeywordGroup)
    private readonly keywordGroupRepository: Repository<KeywordGroup>,
    @InjectRepository(Keyword)
    private readonly keywordRepository: Repository<Keyword>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<KeywordGroup[]> {
    return this.keywordGroupRepository.find({
      relations: ['keyword', 'group'],
    });
  }

  async create(data: { keywordId: number; groupId: number }): Promise<KeywordGroup> {
    const keyword = await this.keywordRepository.findOne({ where: { id: data.keywordId } });
    const group = await this.groupRepository.findOne({ where: { id: data.groupId } });

    if (!keyword || !group) {
      throw new NotFoundException('Keyword ou grupo nao encontrado.');
    }

    const keywordGroup = this.keywordGroupRepository.create({ keyword, group });
    return this.keywordGroupRepository.save(keywordGroup);
  }
}
