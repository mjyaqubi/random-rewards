import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  MarketTradableAssets,
  RewardsAccountAvailableStocks,
} from './broker.mock.data';
import { BrokerService } from './broker.service';

describe('BrokerService', () => {
  let service: BrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerService],
    }).compile();

    service = module.get<BrokerService>(BrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of tradable assets', async () => {
    expect(await service.listTradableAssets()).toEqual(MarketTradableAssets);
  });

  it('should return the stock last price', async () => {
    expect(await service.getLatestPrice('AAPL')).toEqual({ sharePrice: 140 });
  });

  it('should return error when the symbol does not exist in market', async () => {
    try {
      await service.getLatestPrice('AAAA');
    } catch (error) {
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(error.message).toMatch('symbol does not exist');
    }
  });

  it('should return market status', async () => {
    expect(await service.isMarketOpen()).toEqual({
      open: true,
      nextOpeningTime: '2022-02-02 02:02:02',
      nextClosingTime: '2022-02-02 22:02:02',
    });
  });

  it('should buy new shares and return success', async () => {
    expect(await service.buySharesInRewardsAccount('AAPL', 1)).toEqual({
      success: true,
      sharePricePaid: 140,
    });
  });

  it('should return error when the symbol does not exist in market', async () => {
    try {
      await service.buySharesInRewardsAccount('AAAA', 1);
    } catch (error) {
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(error.message).toMatch('symbol does not exist');
    }
  });

  it('should return the reward account positions', async () => {
    expect(await service.getRewardsAccountPositions()).toEqual(
      RewardsAccountAvailableStocks,
    );
  });

  it('should move share from the reward account to user account', async () => {
    expect(
      await service.moveSharesFromRewardsAccount('user-account-id', 'AAPL', 1),
    ).toEqual({
      success: true,
    });
  });

  it('should return error when the symbol does not exist in market', async () => {
    try {
      await service.moveSharesFromRewardsAccount('user-account-id', 'AAAA', 1);
    } catch (error) {
      expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(error.message).toMatch('symbol does not exist');
    }
  });
});
