import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Generated()
  id: number;

  @Column({ length: 255, type: String, unique: true })
  @ApiProperty({
    type: String,
    description: 'The username of the user'
  })
  username: string;

  @Column({ length: 255 })
  @ApiProperty({
    type: String,
    description: 'The password of the user'
  })
  @Exclude()
  password: string;
}
