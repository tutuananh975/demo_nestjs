import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Generated()
  id: number;

  @Column({ length: 255, type: String, unique: true })
  username: string;

  @Column({ length: 255 })
  @Exclude()
  password: string;
}
