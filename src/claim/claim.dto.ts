import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ClaimFreeShareRequest, ClaimFreeShareResponse } from './claim.type';

export class ClaimFreeShareRequestDto implements ClaimFreeShareRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'userAccount',
    example: 'user-account-id',
  })
  userAccount: string;
}

export class ClaimFreeShareResponseDto implements ClaimFreeShareResponse {
  @ApiProperty({
    type: 'string',
    name: 'tickerSymbol',
    example: 'AAPL',
  })
  tickerSymbol: string;

  @ApiProperty({
    type: 'string',
    name: 'sharePrice',
    example: 100,
  })
  sharePrice: number;

  @ApiProperty({
    type: 'string',
    name: 'quantity',
    example: 1,
  })
  quantity: number;
}
