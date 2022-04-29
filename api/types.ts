import { nameFromCategory } from "./utils";

export interface PaymentAddressResponse {
  address: string;
  category: string;
}

export class PaymentAddress {
  name: string;

  constructor(
    public category: string,
    public address: string,
  ) {
    this.name = nameFromCategory(category);
  }

  static fromPaymentAddressResponse(paymentAddress: PaymentAddressResponse) {
    return new PaymentAddress(paymentAddress.category, paymentAddress.address);
  }
}

export type Yat = string;