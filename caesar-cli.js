const ALLOWED_ACTIONS = ['encode', 'decode'];
const commander = require('commander');
const {caesarCipher} = require('./caesar');
const program = new commander.Command();
program
.option(
    '-s, --shift <type>', 'a shift', ''
)
.option(
    '-i, --input <type>', 'an input file', ''
)
.option(
    '-o, --output <type>', 'an output file', '', 
)
.option(
    '-a, --action <type>', 'an action encode/decode', '', 
);
program.parse(process.argv);
const options = program.opts();

if(!options.shift || !options.action) {
    console.log(`Error! Required option ${!options.shift ? '\'shift\'' : '\'action\''} is missed. The program has been aborted`);
}
if (!ALLOWED_ACTIONS.includes(options.action)) {
    console.log (`Action ${options.action} is not allowed. Use one of these instead: ${ALLOWED_ACTIONS.reduce((_, action) => `${_} ${action}`, '')}`);
}
if(!Number.isInteger(+options.shift)) {
    console.log('Shift error!');
}