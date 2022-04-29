import { lookupAddress } from "../api/payment";

describe('lookupAddress(yat)', () => {
  const yat = '☠️🐙☠️';

  it('does not throw an exception', async () => {
    await expect(lookupAddress(yat)).resolves.not.toThrowError();
  })
  it('returns a success response', async () => {
    const addresses = await lookupAddress(yat);
    expect(addresses).toHaveLength(2);
    expect(addresses.every((address) => {
      return ['Bitcoin address', 'Ethereum address'].includes(address.name)
    })).toBe(true);
  })

  it('filters by currency tag', async () => {
    const addresses = await lookupAddress(yat, '0x1004');
    expect(addresses).toHaveLength(1);
    expect(addresses[0].name).toEqual('Ethereum address')
  })
})