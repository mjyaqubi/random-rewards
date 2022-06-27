import { Module } from '@nestjs/common';
import { ConfigModule } from '../common/config/module';
import { BrokerModule } from '../broker/broker.module';
import { StockService } from './stock.service';

@Module({
  imports: [ConfigModule, BrokerModule],
  providers: [StockService],
})
export class StockModule {}
