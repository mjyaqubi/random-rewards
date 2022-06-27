import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [BrokerService],
  exports: [BrokerService],
})
export class BrokerModule {}
