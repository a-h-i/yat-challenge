import fetch from "cross-fetch";
import { APIError } from "./errors";
import { PaymentAddress, Yat } from "./types";

export async function lookupAddress(yat: Yat) {
  const response = await fetch([process.env.API_URL, 'api', 'emoji_id', yat, 'payment'].join('/'));
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