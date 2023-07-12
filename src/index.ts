import axios from 'axios'
import { ValidateMerchantResponseError, type ValidateMerchantOptions, type ValidateMerchantResponseType } from './types';

class FTL {
  baseURL: string;
  apiKey: string;

  constructor(baseURL: string, propertyAPIKey: string) {
    this.baseURL = baseURL;
    this.apiKey = propertyAPIKey;
  }
  
  async validateMerchant(options: ValidateMerchantOptions) {
    const params = {
      dealer_id: options.dealerID,
      api_key: this.apiKey,
      active: options.active,
      archived: options.archived
    };
    try {
      const response = await axios.post<ValidateMerchantResponseType>(`${this.baseURL}/api/v1/validate-merchant`, null, { params });
      // check if response has json data
      if (response.data && !('error' in response.data)) {
        return {
          isValid: response.data.sfEnabled
        }
      } else if (response.data && 'error' in response.data) {
        return {
          isValid: false,
          error: response.data.error
        }
      } else {
        return {
          isValid: false,
          error: 'Unknown Error Occurred'
        }
      }
    } catch (error) {
      if (axios.isAxiosError<ValidateMerchantResponseError>(error)) {
        return {
          isValid: false,
          error: error.response?.data?.error || 'Unknown Error Occurred'
        }
      }
      return {
        isValid: false,
        error: 'Unknown Error Occurred'
      }
    }
  }
}

export default FTL;
