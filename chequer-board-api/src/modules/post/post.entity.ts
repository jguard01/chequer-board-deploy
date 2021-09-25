import { UserEntity } from '../../modules/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { PostDto } from './dto/PostDto';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity<PostDto> {
    @PrimaryGeneratedColumn('increment')
    postId: number;

    @Column()
    title: string;

    @Column({ nullable: false, name: 'created_by' })
    createdBy: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    views: number = 0;

    @Column({ nullable: false })
    deleted: boolean = false;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({
        name: "created_by",
        referencedColumnName: "id"
    })
    user: UserEntity;

    dtoClass = PostDto;
}
