import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BrokerService } from 'src/broker/broker.service';
import { DISTRIBUTION_CONFIGS } from '../common/config/const';
import { ConfigService } from '../common/config/service';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);
  private readonly minimumQuantityOfAvailableShares;

  constructor(
    private readonly configService: ConfigService,
    private readonly brokerService: BrokerService,
  ) {
    this.minimumQuantityOfAvailableShares = <number>(
      this.configService.get(DISTRIBUTION_CONFIGS.QUANTITY)
    );
  }

  // Run at 00:00 every weekdays
  @Cron('0 0 * * 1-5')
  async handleCron() {
    this.logger.log('Checking the rewards wallet in broker positions');

    const tickerSymbols = <Array<string>>(
      this.configService.get(DISTRIBUTION_CONFIGS.SYMBOLS)
    );
    const availableShares =
      await this.brokerService.getRewardsAccountPositions();

    for (let tickerSymbol of tickerSymbols) {
      let bought = false;
      for (let availableShare of availableShares) {
        if (availableShare.tickerSymbol === tickerSymbol) {
          const quantityToBuy = Math.ceil(
            this.minimumQuantityOfAvailableShares - availableShare.quantity,
          );

          if (quantityToBuy > 0) {
            await this.brokerService.buySharesInRewardsAccount(
              tickerSymbol,
              quantityToBuy,
            );
          }

          bought = true;
        }
      }

      if (!bought) {
        await this.brokerService.buySharesInRewardsAccount(
          tickerSymbol,
          this.minimumQuantityOfAvailableShares,
        );
      }
    }
  }
}
