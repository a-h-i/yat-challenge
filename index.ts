import 'dotenv/config'
import { parse } from 'ts-command-line-args';
import { append } from './append.command';
import { query } from './query.command';



const mainCommand = parse({
  name: { type: String, defaultOption: true }
}, { stopAtFirstUnknown: true });

let argv = mainCommand._unknown || [];



if(mainCommand.name === 'query') {
  query(argv);
} else if (mainCommand.name === 'append') {
  append(argv);
} else {
  console.error('Known commands:\nquery\nappend')
}







