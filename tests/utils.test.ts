import * as data from '../data.js';
import { isValidYat, nameFromCategory, tagFromCurrencyName } from "../api/utils";

describe('isValidYat()', () => {
  it('does not allow empty strings', () => {
    const yat = '';
    expect(isValidYat(yat)).toBe(false);
  })

  it('does not allow non valid emoji characters', () => {
    const yat = '😱s👻';
    expect(isValidYat(yat)).toBe(false);
  })

  it('does not allow more than 5 characters', () => {
    const yat = '😱👻👽👽👽👽';
    expect(isValidYat(yat)).toBe(false);

  })

  it('it allows a valid yat', () => {
    expect(isValidYat('😱👻👽👽👽')).toBe(true);
    expect(isValidYat('☠️🐙☠️')).toBe(true);
    expect(isValidYat('☠️☠️☠️☠️☠️')).toBe(true);
  })
})

describe('tagFromCurrencyName()', () => {

  it('returns tags for valid currencies', () => {
    for (const [key, value] of Object.entries(data.addresses)) {
      expect(tagFromCurrencyName(value)).toEqual(key);
    }
  })

  it('returns undefined for invalid currencies', () => {
    expect(tagFromCurrencyName('Not a currency')).toBeUndefined();
  })
})

describe('nameFromCategory()', () => {
  it('returns currency name from tag', () => {
    for (const [key, value] of Object.entries(data.addresses)) {
      expect(nameFromCategory(key)).toEqual(value);
    }
  })

  it('returns undefined for invalid tags', () => {
    expect(nameFromCategory('not a tag')).toBeUndefined();
  })
})