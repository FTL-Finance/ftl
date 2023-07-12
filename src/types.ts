export type ValidateMerchantOptions = {
  dealerID: string;
  active?: boolean;
  archived?: boolean;
}

export type MerchantValidationData = {
  sfEnabled: boolean;
}
export type ValidateMerchantResponseError = {
  error: string;
}
export type ValidateMerchantResponseType = MerchantValidationData | ValidateMerchantResponseError