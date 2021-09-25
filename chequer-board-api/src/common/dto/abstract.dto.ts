import { ApiProperty } from '@nestjs/swagger';

import type { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(entity: AbstractEntity) {
    }
}
