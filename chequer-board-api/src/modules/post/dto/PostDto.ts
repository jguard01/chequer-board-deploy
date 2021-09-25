import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { UserDto } from '../../user/dto/user-dto';
import { UserEntity } from '../../user/user.entity';
import type { PostEntity } from '../post.entity';

export class PostDto extends AbstractDto {
    @ApiPropertyOptional()
    postId: number;

    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    createdBy: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    views: number;

    @ApiPropertyOptional()
    deleted: boolean;

    @ApiPropertyOptional()
    user: UserDto;

    constructor(post: PostEntity) {
        super(post);
        this.postId = post.postId;
        this.title = post.title;
        this.createdBy = post.createdBy;
        this.description = post.description;
        this.views = post.views;
        this.deleted = post.deleted;
        this.createdAt = post.createdAt;
        this.user = post.user.toDto();
    }
}
