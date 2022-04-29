import { PaymentAddress } from "../api/types";

describe('PaymentAddress', () => {

  

  it('sets correct name from category', () => {
    const data = {
      category: '0x1023',
      address: 'bc1q4ywsw6ktuxmnz4qx0h3uh44m324443hv4mn9vc'
    }

    const paymentAddress = PaymentAddress.fromPaymentAddressResponse(data);
    expect(paymentAddress.name).toEqual("TRON");
  })
})