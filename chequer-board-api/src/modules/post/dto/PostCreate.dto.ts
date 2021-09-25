import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { PostEntity } from '../post.entity';

export class PostCreateDto extends AbstractDto {
    @ApiPropertyOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    description: string;
}
