import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
    @ApiProperty({ isArray: true })
    readonly list: T[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(list: T[], meta: PageMetaDto) {
        this.list = list;
        this.meta = meta;
    }
}
