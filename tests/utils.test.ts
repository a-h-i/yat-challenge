
import { isValidYat } from "../api/utils";

describe('isValidYat()', () => {
  it('does not allow empty strings', () => {
    const yat  = '';
    expect(isValidYat(yat)).toBe(false);
  })

  it('does not allow non valid emoji characters', () => {
    const yat  = '😱s👻';
    expect(isValidYat(yat)).toBe(false);
  })

  it('does not allow more than 5 characters', () => {
    const yat  = '😱👻👽👽👽👽';
    expect(isValidYat(yat)).toBe(false);

  })

  it('it allows a valid yat', () => {
    const yat  = '😱👻👽👽👽';
    expect(isValidYat(yat)).toBe(true);
  })
})