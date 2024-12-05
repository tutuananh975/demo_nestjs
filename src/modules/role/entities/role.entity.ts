import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entity/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRole } from '../enums/user-role';

@Entity()
export class Role extends BaseEntity {
    @PrimaryColumn()
    @Generated()
    id: number;

    @Column({ length: 255, type: String, unique: true })
    @ApiProperty({
        type: String,
        description: 'The username of the user',
    })
    roleName: UserRole;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
