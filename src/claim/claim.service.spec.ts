import { Test, TestingModule } from '@nestjs/testing';
import { ClaimService } from './claim.service';
import { ConfigModule } from '../common/config/module';
import { BrokerModule } from '../broker/broker.module';

describe('ClaimService', () => {
  let service: ClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, BrokerModule],
      providers: [ClaimService],
    }).compile();

    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a random amount range', () => {
    expect(service.randomAmountRange()).toEqual({
      min: expect.any(Number),
      max: expect.any(Number),
    });
  });

  it('should return a random amount', () => {
    expect(service.randomAmount()).toEqual(expect.any(Number));
  });

  it('should return a random number between the range', () => {
    expect(service.randomNumber(1, 2)).toEqual(expect.any(Number));
  });
});
