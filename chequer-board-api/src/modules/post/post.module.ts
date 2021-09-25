import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [TypeOrmModule.forFeature([PostRepository]), PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [PostController],
    exports: [PostService, PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [PostService],
})
export class PostModule { }
