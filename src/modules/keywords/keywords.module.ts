import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from './keyword.entity';
import { KeywordGroup } from './keyword_group.entity';
import { KeywordService } from './keyword.service';
import { KeywordGroupService } from './keyword_group.service';
import { KeywordGroupController } from './keyword_group.controller';
import { KeywordController } from './keyword.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword, KeywordGroup])],
  controllers: [KeywordGroupController, KeywordController],
  providers: [KeywordService, KeywordGroupService],
  exports: [TypeOrmModule],
})
export class KeywordsModule {}
