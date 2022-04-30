import { parse } from 'ts-command-line-args';
import { helpOptions } from './help.command';
import { addAddress } from './api/payment';
import { isValidCurrency, isValidCurrencyTag, isValidYat, tagFromCurrencyName } from './api/utils';

interface CommandArguments {
  yat: string;
  currency: string[];
  address: string;
  description?: string[];
  help?: boolean
}

export function append(argv: string[]) {
  const args = parse<CommandArguments>(
    {
      yat: { type: String, alias: 'y', description: 'Yat to lookup' },
      currency: { type: String, alias: 'c', description: 'Currency to lookup', multiple: true },
      help: { type: Boolean, optional: true, description: 'Prints this usage guide', alias: 'h' },
      description: { type: String, alias: 'd', description: 'Address description', multiple: true, optional: true },
      address: { type: String, alias: 'a', description: 'Wallet address' }
    },
    Object.assign({}, helpOptions(), { argv })
  )

  if (!isValidYat(args.yat)) {
    // tslint:disable: no-console
    console.error('You have entered an invalid yat');
    return;
  }
  let parsedCurrency = args.currency.join(' ');
  if (!(isValidCurrency(parsedCurrency) || isValidCurrencyTag(parsedCurrency))) {
    console.error('Invalid currency');
    return;
  }

  if (isValidCurrency(parsedCurrency)) {
    // switch to currency tag for usage with API
    parsedCurrency = tagFromCurrencyName(parsedCurrency) as string;
  }

  const description = args.description ? args.description.join(' ') : undefined;

  addAddress(args.yat, parsedCurrency, args.address, description).then((res) => {
    if (res.status === 200) {
      console.log('Added succesfully')
    } else {
      console.error('Error');
      console.error(res);
    }
  })

}