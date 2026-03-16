import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Keyword } from '../keywords/keyword.entity';
import { Group } from '../groups/group.entity';

@Entity('keyword_groups')
export class KeywordGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Keyword)
  keyword: Keyword;

  @ManyToOne(() => Group)
  group: Group;
}
