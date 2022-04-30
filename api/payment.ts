import fetch from "cross-fetch";
import { APIError } from "./errors";
import { PaymentAddress, Yat } from "./types";
/**
 * Looks up payment addresses of a yat
 * @param yat emojiid
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
    method: 'GET',
    headers: {
      'X-Api-Key': '' + process.env.YAT_API_KEY
    }
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

/**
 * Adds a payment address
 * @param yat emojiid
 * @param currency currency tag not name
 * @param address crypto address
 * @param description optional description
 * @returns response
 */
export function addAddress(yat: Yat, currency: string, address: string, description?: string) {
  const URL = [process.env.API_URL, 'api', 'emoji_id', yat].join('/');

  const body = {
    insert: [
      {
        data: `${address}${description ? '|' + description : ''}`,
        tag: currency
      }
    ]
  }
  return fetch(URL, {
    method: 'PATCH',
    headers: {
      'X-Api-Key': '' + process.env.YAT_API_KEY,
      'Content-Type': 'application/json',
      'Accept':'*/*',
    },
    body: JSON.stringify(body)

  })
}
