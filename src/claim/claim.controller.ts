import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import * as ResponseDecorator from '../common/response/decorator';
import {
  ClaimFreeShareRequestDto,
  ClaimFreeShareResponseDto,
} from './claim.dto';
import { ClaimService } from './claim.service';

@Controller()
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post('claim-free-share')
  @ApiOperation({
    operationId: 'claim-free-share',
    summary: 'Claim free share',
    description: 'Claim free share',
  })
  @ResponseDecorator.Created(ClaimFreeShareResponseDto)
  @ResponseDecorator.BadRequest()
  @ResponseDecorator.InternalServerError()
  async claimFreeShare(
    @Body() request: ClaimFreeShareRequestDto,
  ): Promise<ClaimFreeShareResponseDto> {
    return await this.claimService.claimFreeShare(request.userAccount);
  }
}
