import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import {
  MarketTradableAssets,
  RewardsAccountAvailableStocks,
} from './broker.mock.data';
import {
  BuySharesResponse,
  MarketStatus,
  MoveSharesResponse,
  RewardsAccountPosition,
  SharePrice,
  Symbols,
} from './broker.type';

@Injectable()
export class BrokerService {
  private readonly logger = new Logger(BrokerService.name);

  // TO-DO: inject the http service to use istead of mock data
  // constructor(private readonly httpService: HttpService) {}

  // To fetch a list of assets available for trading
  async listTradableAssets(): Promise<Symbols> {
    // TO-DO: use http service istead of mock data
    // const exchangeResponse = this.httpService.get('url-to-get-list-of-tradable-assets');

    return MarketTradableAssets;
  }

  // To fetch the latest price for an asset
  async getLatestPrice(tickerSymbol: string): Promise<SharePrice> {
    // TO-DO: use http service istead of mock data
    // const exchangeResponse = this.httpService.get('url-to-get-last-price-of-an-assets');

    const sharePrice = MarketTradableAssets[tickerSymbol];

    this.logger.log(
      `[BrokerService] get latest price`,
      JSON.stringify({
        params: { tickerSymbol },
        response: { sharePrice },
      }),
    );

    return { sharePrice };
  }

  // To check if the stock market is currently open or closed
  async isMarketOpen(): Promise<MarketStatus> {
    // TO-DO: use http service istead of mock data
    // const exchangeResponse = this.httpService.get('url-to-get-market-status');

    return {
      open: true,
      nextOpeningTime: '2022-02-02 02:02:02',
      nextClosingTime: '2022-02-02 22:02:02',
    };
  }

  // To purchase a share in our Firm's rewards account.
  // NOTE: this works only while the stock market is open otherwise throws an error.
  // NOTE 2: quantity is an integer, no fractional shares allowed.
  async buySharesInRewardsAccount(
    tickerSymbol: string,
    quantity: number,
  ): Promise<BuySharesResponse> {
    // TO-DO: use http service istead of mock data
    // const exchangeResponse = this.httpService.post('url-to-buy-some-shares-in-reward-account', {
    //   tickerSymbol,
    //   quantity,
    // });

    const result = {
      success: true,
      sharePricePaid: 1,
    };

    this.logger.log(
      `[BrokerService] buy shares in rewards account`,
      JSON.stringify({
        params: {
          tickerSymbol,
          quantity,
        },
        response: result,
      }),
    );

    return result;
  }

  // To view the shares that are available in the Firm's rewards account
  async getRewardsAccountPositions(): Promise<Array<RewardsAccountPosition>> {
    // TO-DO: use http service istead of mock data
    // const exchangeResponse = this.httpService.get('url-to-get-list-of-assets-in-the-reward-account');

    this.logger.log(
      '[BrokerService] get rewards account positions',
      JSON.stringify(RewardsAccountAvailableStocks),
    );

    return RewardsAccountAvailableStocks;
  }

  // To move shares from our Firm's rewards account to a user's own account
  async moveSharesFromRewardsAccount(
    toAccount: string,
    tickerSymbol: string,
    quantity: number,
  ): Promise<MoveSharesResponse> {
    // TO-DO: use http service istead of mock data
    // const exchangeResponse = this.httpService.post('url-to-move-shares-to-user-account', {
    //   toAccount,
    //   tickerSymbol,
    //   quantity,
    // });

    const result = { success: true };

    this.logger.log(
      '[BrokerService] move shares from rewards account to customer account',
      JSON.stringify({
        params: {
          toAccount,
          tickerSymbol,
          quantity,
        },
        response: result,
      }),
    );

    return result;
  }
}
