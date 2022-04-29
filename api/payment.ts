import fetch from "cross-fetch";
import { APIError } from "./errors";
import { PaymentAddress, Yat } from "./types";
/**
 * Looks up payment addresses of a yat
 * @param yat 
 * @param currency currency tag not name
 * @returns PaymentAddress
 */
export async function lookupAddress(yat: Yat, currency?: string) {
  let URL = [process.env.API_URL, 'api', 'emoji_id', yat, 'payment'].join('/');
  if(currency) {
  const searchParams = new URLSearchParams();
    searchParams.append('tags', currency);
    URL += '?' + searchParams;
  }
  const response = await fetch(URL, {
    method: 'GET'
  });
  const data = await response.json();
  if(data.status !== true || data.error != null) {
    throw new APIError(JSON.stringify(data.error));
  }
  const addresses = []
  // tslint:disable-next-line: forin
  for(const addressData in data.result ) {
    addresses.push(PaymentAddress.fromPaymentAddressResponse(data.result[addressData]));
  }
  return addresses;
}