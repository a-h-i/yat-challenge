import * as data from '../data.js';
import { Yat } from './types.js';
import GraphemeSplitter from 'grapheme-splitter';

export function nameFromCategory(category: string) {
  return data.addresses[category as keyof typeof data.addresses];
}

export const MIN_YAT_LENGTH = Number.parseInt(process.env.MIN_YAT_LENGTH || '1', 10);
export const MAX_YAT_LENGTH = Number.parseInt(process.env.MAX_YAT_LENGTH || '4', 10);

const YAT_REGEX = RegExp(`^[${data.emojis.join('')}]+$`, 'u')

export function isValidYat(yat: Yat) {
  const splitter = new GraphemeSplitter()
  const yatLength = splitter.countGraphemes(yat);
  return yatLength >= MIN_YAT_LENGTH && yatLength <= MAX_YAT_LENGTH && YAT_REGEX.test(yat);
}

export function isValidCurrency(currency: string) {
  const currencies = Object.values(data.addresses).map((c) => c.toLowerCase() );
  return currencies.includes(currency.toLowerCase());
}

export function isValidCurrencyTag(tag: string) {
  return data.addresses.hasOwnProperty(tag);
}

export function tagFromCurrencyName(currency: string) {
  for( const [key, value] of Object.entries(data.addresses)) {
    if(value.toLowerCase() === currency.toLowerCase()) {
      return key;
    }
  }
}