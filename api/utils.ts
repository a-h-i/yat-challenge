import * as data from '../data.js';
import { Yat } from './types.js';

export function nameFromCategory(category: string) {
  const lookupTable = data.addresses as Record<string, string>;
  return lookupTable[category];
}

export const MIN_YAT_LENGTH = Number.parseInt(process.env.MIN_YAT_LENGTH || '1', 10);
export const MAX_YAT_LENGTH = Number.parseInt(process.env.MAX_YAT_LENGTH || '4', 10);

const YAT_REGEX = RegExp(`^[${data.emojis.join('')}]+$`, 'u')

export function isValidYat(yat: Yat) {
  const yatLength = [...yat].length; // iterable protocol splits it into code points instead of count if UTF-16 units (default in js)
  return  yatLength >= MIN_YAT_LENGTH && yatLength <= MAX_YAT_LENGTH && YAT_REGEX.test(yat);
}