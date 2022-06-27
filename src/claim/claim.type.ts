export type ClaimFreeShareRequest = {
  userAccount: string;
};

export type ClaimFreeShareResponse = {
  tickerSymbol: string;
  sharePrice: number;
  quantity: number;
};
