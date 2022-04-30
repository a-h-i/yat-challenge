import { nameFromCategory } from "./utils";

export interface PaymentAddressResponse {
  address: string;
  category: string;
  description?: string;
}

export class PaymentAddress {
  name: string;

  constructor(
    public category: string,
    public address: string,
    public description?: string
  ) {
    this.name = nameFromCategory(category);
  }

  toString() {
    return `Currency: ${this.name}
address: ${this.address}`
  }

  static fromPaymentAddressResponse(paymentAddress: PaymentAddressResponse) {
    return new PaymentAddress(paymentAddress.category, paymentAddress.address, paymentAddress.description);
  }
}

export type Yat = string;