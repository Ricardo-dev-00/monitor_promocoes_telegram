import { Controller, Get, Query } from '@nestjs/common';
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
  async findAll(@Query('userId') userId?: string): Promise<Group[]> {
    if (userId) {
      return this.groupRepository.find({
        where: { user: { id: Number(userId) } },
        relations: ['user'],
      });
    }

    return this.groupRepository.find({ relations: ['user'] });
  }
}
