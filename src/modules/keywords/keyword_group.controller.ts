import { Controller, Get, Post, Body } from '@nestjs/common';
import { KeywordGroup } from './keyword_group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeywordGroupService } from './keyword_group.service';

@Controller('keyword-groups')
export class KeywordGroupController {
  constructor(private readonly keywordGroupService: KeywordGroupService) {}

  @Get()
  async findAll(): Promise<KeywordGroup[]> {
    return this.keywordGroupService.findAll();
  }

  @Post()
  async create(@Body() data: Partial<KeywordGroup>): Promise<KeywordGroup> {
    return this.keywordGroupService.create(data);
  }
}
