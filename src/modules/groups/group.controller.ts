import { Controller, Get } from '@nestjs/common';
import { Group } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('groups')
export class GroupController {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }
}
