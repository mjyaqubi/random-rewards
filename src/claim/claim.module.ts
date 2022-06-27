import { Module } from '@nestjs/common';
import { ConfigModule } from '../common/config/module';
import { BrokerModule } from '../broker/broker.module';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';

@Module({
  imports: [ConfigModule, BrokerModule],
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}
