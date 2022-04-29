import 'dotenv/config'
import { parse } from 'ts-command-line-args';
import { lookupAddress } from './api/payment';
import { isValidCurrency, isValidYat, MAX_YAT_LENGTH, tagFromCurrencyName } from './api/utils';

interface CommandArguments {
  yat: string;
  currency?: string[];
  help?: boolean;
}

const args = parse<CommandArguments>(
  {
    yat: { type: String, alias: 'y', description: 'Yat to lookup' },
    currency: { type: String, alias: 'c', optional: true, description: 'Currency to lookup', multiple: true },
    help: { type: Boolean, optional: true, description: 'Prints this usage guide', alias: 'h' }
  },
  {
    helpArg: 'help',
    headerContentSections: [{ header: 'Yat coding challenge', content: 'Thanks for considering my application' }],
    footerContentSections: [{ content: 'Author: Ahmed H. Ismail' }]
  }
)

if (!isValidYat(args.yat)) {
  // tslint:disable: no-console
  console.error('You have entered an invalid yat');
  process.exit(1);
}
let currencyTag;
if (args.currency !== undefined && !isValidCurrency(args.currency.join(' '))) {
  console.error('Invalid currency');
  process.exit(1);
}
if(args.currency !== undefined) {
  currencyTag = tagFromCurrencyName(args.currency.join(' '));
}

lookupAddress(args.yat, currencyTag).then((addresses) => {
  console.log(addresses.map((a) => a.toString()).join('\n'));
})
