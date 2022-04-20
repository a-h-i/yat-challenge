# Yat Coding Challenge

## Summary

Using Javascript / Typescript, create a CLI app that looks up Yat payment addresses, and additionally allows the user to set new payment addresses.

## Requirements

Create a CLI app that takes command line parameters as inputs.
### Fetching data

Lookup the payment addresses of the supplied Yat, optionally only displaying the specified currency requested.

* A required argument of `-y|--yat` must be supplied that accepts a Yat (an emoji string) that is:
    *  Between `MIN_YAT_LENGTH` and `MAX_YAT_LENGTH` long, from the environment variables.
    *  Only contains characters found in `data.emojis` from the included data.js file
*  If a currency type argument is provided `-c|--currency` then only return the tag data for that specific currency's address.
*  If no other arguments are provided return all payment addresses with their "friendly" names.

### Writing data

Add a new payment address for the provided Yat.

* A required argument of `-y|--yat` must be supplied that accepts a Yat (an emoji string) that is:
    *  Between `MIN_YAT_LENGTH` and `MAX_YAT_LENGTH` long, from the environment variables.
    *  Only contains characters found in `data.emojis` from the included data.js file
*  A required currency type argument `-c|--currency` that accepts a friendly name or the currency code.
*  A required address argument `-a|--address` that accepts a wallet address value.
*  An optional description argument `-d|--description` that accepts a name for the wallet.

### Handy resources

* Documentation on payment addresses https://api-docs.y.at/docs/categories#cryptocurrency-addresses
* Documentation for authenticated requests for writing using `X-Api-Key` https://api-docs.y.at/docs/api-ref#authentication
* Looking up payment addresses https://api-docs.y.at/docs/api-ref#lookup-emojiid-payment-addresses
* Adding data to a Yat https://api-docs.y.at/docs/api-ref#edit-emojiid (P.S. You do not need to supply the `merkle_root` or the `signature`)
* List of valid emojis and address display names are included in `data.js`

### Caveats

* Only fetch, display and update data for CryptoCurrency Addresses `0x10**` and not Crypto Tokens `0x63**`.
* An `emoji_id` is equivalent to a `Yat`
