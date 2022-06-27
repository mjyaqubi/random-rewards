import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './common/config/module';
import { LoggerMiddleware } from './common/logger/middleware';
import { BrokerModule } from './broker/broker.module';
import { ClaimModule } from './claim/claim.module';
import { StockModule } from './tasks/stock.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    StockModule,
    ConfigModule,
    BrokerModule,
    ClaimModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
