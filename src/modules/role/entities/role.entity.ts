import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
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
