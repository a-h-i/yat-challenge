
import { lookupAddress } from './api/payment';
import { parse } from 'ts-command-line-args';
import { isValidCurrency, isValidYat, tagFromCurrencyName } from './api/utils';
import { helpOptions } from './help.command';


interface CommandArguments {
  yat: string;
  currency?: string[];
  help?: boolean;
}
export function query(argv: string[]) {
  const args = parse<CommandArguments>(
    {
      yat: { type: String, alias: 'y', description: 'Yat to lookup' },
      currency: { type: String, alias: 'c', optional: true, description: 'Currency to lookup', multiple: true },
      help: { type: Boolean, optional: true, description: 'Prints this usage guide', alias: 'h' }
    },
    Object.assign({}, helpOptions(), { argv })
  )

  if (!isValidYat(args.yat)) {
    // tslint:disable: no-console
    console.error('You have entered an invalid yat');
    return;
  }
  let currencyTag;
  if (args.currency !== undefined && !isValidCurrency(args.currency.join(' '))) {
    console.error('Invalid currency');
    return;
  }
  if (args.currency !== undefined) {
    currencyTag = tagFromCurrencyName(args.currency.join(' '));
  }

  lookupAddress(args.yat, currencyTag).then((addresses) => {
    console.log(addresses.map((a) => a.toString()).join('\n'));
  })


}