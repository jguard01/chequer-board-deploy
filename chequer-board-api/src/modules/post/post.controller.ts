import {
    Body,
    Controller,
    Get,
    Patch,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
    UseFilters,

} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostDto } from './dto/PostDto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/PostCreate.dto';
import { PostListDto } from './dto/PostListPayload.dto';
import { UserDto } from '../../modules/user/dto/user-dto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../../modules/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { CurrentUser } from '../../modules/common/decorator/current-user.decorator';
import { PageDto } from '../../common/dto/page.dto';

import { PostUpdateDto } from './dto/PostUpdate.dto';
import { PostDeleteDto } from './dto/PostDelete.dto';

import { PageOptionsDto } from '../../common/dto/page-options.dto';

import { PostHttpExceptionFilter } from '../exception/PostHttpExceptionFilter';

@Controller('post')
@ApiTags('post')
@UseFilters(new PostHttpExceptionFilter())
export class PostController {
    constructor(
        public readonly postService: PostService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Created' })
    async postDelete(
        @Body() postCreateDto: PostCreateDto,
        @CurrentUser() user: UserEntity
    ): Promise<boolean> {
        const createdPost = await this.postService.createPost(postCreateDto, user);
        if (createdPost !== undefined) {
            return true;
        }
        else {
            return false;
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Patch('update')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Updated' })
    async postUpdate(
        @CurrentUser() user: UserEntity,
        @Body() postUpdateDto: PostUpdateDto
    ): Promise<boolean> {
        const updatedPostResult = await this.postService.updatePost(user, postUpdateDto);
        return updatedPostResult;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Post('delete')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully Deleted' })
    async postCreate(
        @Body() postDeleteDto: PostDeleteDto,
        @CurrentUser() user: UserEntity,
    ): Promise<boolean> {
        const deletePostResult = await this.postService.deletePost(postDeleteDto, user);
        return deletePostResult;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('detail/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: PostDto, description: 'Successfully' })
    async postGet(
        @Param('id') id: number,
        @CurrentUser() user: UserEntity
    ): Promise<PostDto> {
        const createdPost = await this.postService.getPost(id, user);

        return createdPost.toDto<typeof PostDto>();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('list')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ type: PageDto, description: 'Successfully' })
    async PostLists(
        @Query('page') PageNum: number,
    ): Promise<PageDto<PostListDto>> {
        const pageOptionsDto = new PageOptionsDto();
        pageOptionsDto.page = PageNum || 1;
        return await this.postService.getPostList(pageOptionsDto);
    }
}
