import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UtilsProvider } from '../providers/utils.provider';
import type { AbstractDto } from './dto/abstract.dto';

export abstract class AbstractEntity<DTO extends AbstractDto = AbstractDto> {


    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    abstract dtoClass: new (
        entity: AbstractEntity,
        options?: GetConstructorArgs<DTO>[1],
    ) => DTO;

    toDto<D = DTO>(options?: GetConstructorArgs<D>[1]): DTO {
        return UtilsProvider.toDto(this.dtoClass, this, options);
    }
}
