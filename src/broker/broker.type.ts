export type Symbol = { tickerSymbol: string };

export type Symbols = Array<Symbol>;

export type SharePrice = { sharePrice: number };

export type MarketStatus = {
  open: boolean;
  nextOpeningTime: string;
  nextClosingTime: string;
};

export type BuySharesResponse = {
  success: boolean;
  sharePricePaid: number;
};

export type RewardsAccountPosition = {
  tickerSymbol: string;
  quantity: number;
  sharePrice: number;
};

export type MoveSharesResponse = { success: boolean };
