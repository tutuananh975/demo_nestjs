import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/role/entities/role.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
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
