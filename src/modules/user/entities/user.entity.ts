import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    @Generated()
    id: number;

    @Column({ length: 255, type: String, unique: true })
    @ApiProperty({
        type: String,
        description: 'The username of the user',
    })
    username: string;

    @Column({ length: 255 })
    @ApiProperty({
        type: String,
        description: 'The password of the user',
    })
    @Exclude()
    password: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}
