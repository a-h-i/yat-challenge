import { addAddress, lookupAddress } from "../api/payment";

describe('lookupAddress(yat)', () => {
  const yat = '☠️🐙☠️';

  it('does not throw an exception', async () => {
    await expect(lookupAddress(yat)).resolves.not.toThrowError();
  })
  it('returns a success response', async () => {
    const addresses = await lookupAddress(yat);
    expect(addresses.length).toBeGreaterThanOrEqual(2)
    expect(addresses.some((address) => {
      return ['Bitcoin address', 'Ethereum address'].includes(address.name)
    })).toBe(true);
  })

  it('filters by currency tag', async () => {
    const addresses = await lookupAddress(yat, '0x1004');
    expect(addresses).toHaveLength(1);
    expect(addresses[0].name).toEqual('Ethereum address')
  })
})

describe('addAddress(yat, currency, address, description)', () => {
  const yat = '☠️🐙☠️';

  it('adds an address', async () => {
    const currency = '0x1013' // Dogecoin
    const address = 'DHKM6NDUUv9kaHAGi1QU7MRBNKfQiAdP3F';
    const response = await addAddress(yat, currency, address);
    expect(response.status).toBe(200);
    const newAddress = (await lookupAddress(yat, currency))[0];
    expect(newAddress.category).toEqual(currency);
    expect(newAddress.address).toEqual(address);
    expect(newAddress.description).toBeNull();
  })

  it('adds an address with description', async () => {
    const currency = '0x1013' // Dogecoin
    const address = 'DHKM6NDUUv9kaHAGi1QU7MRBNKfQiAdP3F';
    const description = 'Sample dodge';
    const response = await addAddress(yat, currency, address, description);
    expect(response.status).toBe(200);
    const newAddress = (await lookupAddress(yat, currency))[0];
    expect(newAddress.category).toEqual(currency);
    expect(newAddress.address).toEqual(address);
    expect(newAddress.description).toEqual(description)
  })

})