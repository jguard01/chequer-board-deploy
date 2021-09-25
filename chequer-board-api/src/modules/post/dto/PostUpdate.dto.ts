import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsNumber } from 'class-validator';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import type { PostEntity } from '../post.entity';

export class PostUpdateDto extends AbstractDto {

    @ApiPropertyOptional()
    @IsNumber()
    id: number;

    @ApiPropertyOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional()
    @IsString()
    description: string;

}
