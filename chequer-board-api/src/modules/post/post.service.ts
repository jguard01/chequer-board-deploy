import { HttpException, Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto';
import type { PostDto } from './dto/PostDto';
import { PostUpdateDto } from './dto/PostUpdate.dto';
import { PostListDto } from './dto/PostListPayload.dto';
import { PostCreateDto } from './dto/PostCreate.dto';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserDto } from '../../modules/user/dto/user-dto';
import { UserEntity } from '../../modules/user/user.entity';
import { PostsPageOptionDto } from './dto/posts-page-options.dto';
import { PostDeleteDto } from './dto/PostDelete.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';

@Injectable()
export class PostService {
    constructor(
        public readonly PostRepository: PostRepository,
    ) { }

    async createPost(
        PostCreateDto: PostCreateDto,
        user: UserDto
    ): Promise<PostEntity> {
        const post = this.PostRepository.create(PostCreateDto);
        post.createdBy = user.id

        return this.PostRepository.save(post);
    }


    async getPost(
        id: number,
        user: UserEntity
    ): Promise<PostEntity> {
        const post = await this.PostRepository.findOne(id, {
            relations: ['user'],
        });
        if (post.user.id !== user.id) {
            await this.PostRepository.update(id, {
                views: ++post.views,
            });
        }
        return post;
    }

    async deletePost(
        postDelete: PostDeleteDto,
        user: UserEntity
    ): Promise<boolean> {
        const post = await this.PostRepository.findOne(postDelete.id, {
            relations: ['user'],
        });
        if (post.user.id !== user.id && post.deleted !== false) {
            throw new HttpException('user id is incorrect', 401);
            return false
        }
        else {
            const retPost = this.PostRepository.update(postDelete.id, {
                deleted: true,
            });
            return true;
        }
    }

    async updatePost(
        user: UserEntity,
        postUpdate: PostUpdateDto
    ): Promise<boolean> {
        const post = await this.PostRepository.findOne(postUpdate.id, {
            relations: ['user'],
        });
        if (post.user.id !== user.id && post.deleted !== false) {
            throw new HttpException('user id is incorrect', 401);
            return false;
        }
        else {
            await this.PostRepository.update(postUpdate.id, {
                title: postUpdate.title,
                description: postUpdate.description,
            });
            return true;
        }

    }


    async getPostList(
        pageOptionsDto: PostsPageOptionDto,
    ): Promise<PageDto<PostListDto>> {
        const [finder, count] = await this.PostRepository.findAndCount({
            select: ["postId", "title", "views"],
            relations: ['user'],
            where: {
                deleted: false
            },
            order: {
                postId: "DESC",
            },
            skip: pageOptionsDto.skip,
            take: pageOptionsDto.take,
        });;
        const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount: count });
        return finder.toPageDto(pageMetaDto)
    }
}
