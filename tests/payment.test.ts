import { lookupAddress } from "../api/payment";

describe('lookupAddress(yat)', () => {
  const yat = '☠️🐙☠️';
  const sampleResponse = { "status": true, "result": { "0x1004": { "address": "0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf", "description": null, "signature": null, "default": false, "category": "0x1004", "short_name": null, "long_name": null, "settlement_network": null }, "0x1003": { "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", "description": null, "signature": null, "default": false, "category": "0x1003", "short_name": null, "long_name": null, "settlement_network": null } }, "error": null };

  it('does not throw an exception', async () => {
    await expect(lookupAddress(yat)).resolves.not.toThrowError();
  })
  it('returns a success response', async () => {
    const response = await lookupAddress(yat);
    expect(response).toMatchObject({ status: true, error: null })
  })
})