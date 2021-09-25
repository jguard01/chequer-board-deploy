import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
    @ApiProperty()
    expiresIn: Date;

    @ApiProperty()
    accessToken: string;

    constructor(data: TokenPayloadDto) {
        this.expiresIn = data.expiresIn;
        this.accessToken = data.accessToken;
    }
}
