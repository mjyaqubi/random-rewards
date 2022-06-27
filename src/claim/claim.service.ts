import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DISTRIBUTION_CONFIGS } from '../common/config/const';
import { ConfigService } from '../common/config/service';
import { BrokerService } from '../broker/broker.service';
import { ClaimFreeShareResponse } from './claim.type';

@Injectable()
export class ClaimService {
  private distributionSlots = [];
  private readonly logger = new Logger(ClaimService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly brokerService: BrokerService,
  ) {
    const distributionRules = <Array<Record<string, string>>>(
      this.configService.get(DISTRIBUTION_CONFIGS.RULES)
    );

    for (let rule of distributionRules) {
      const percentage = parseInt(Object.keys(rule)[0], 10);
      const amountRange = rule[Object.keys(rule)[0]];
      const [min, max] = amountRange.split('-');

      for (let i = 0; i < percentage; i++) {
        this.distributionSlots.push({
          min: parseInt(min, 10),
          max: parseInt(max, 10),
        });
      }
    }
  }

  randomAmountRange(): { min: number; max: number } {
    return this.distributionSlots[
      Math.floor(Math.random() * this.distributionSlots.length)
    ];
  }

  randomAmount(): number {
    const range = this.randomAmountRange();
    return this.randomNumber(range.max, range.min);
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async claimFreeShare(userAccount: string): Promise<ClaimFreeShareResponse> {
    if (userAccount === null || userAccount === '') {
      this.logger.error('User account did not provided');
      throw new BadRequestException();
    }

    const amount = this.randomAmount();
    const availableStocksInRewardAccount =
      await this.brokerService.getRewardsAccountPositions();

    let stockToBeClaimed = null;
    for (let stock of availableStocksInRewardAccount) {
      if (stock.sharePrice > amount) {
        stockToBeClaimed = stock;
        break;
      }
    }

    if (stockToBeClaimed === null) {
      this.logger.error('No match stock available in the rewards account');
      throw new InternalServerErrorException();
    }

    const quantity = amount / stockToBeClaimed.sharePrice;

    const transferResult =
      await this.brokerService.moveSharesFromRewardsAccount(
        userAccount,
        stockToBeClaimed.tickerSymbol,
        quantity,
      );

    return {
      ...transferResult,
      tickerSymbol: stockToBeClaimed.tickerSymbol,
      sharePrice: stockToBeClaimed.sharePrice,
      quantity,
    };
  }
}
