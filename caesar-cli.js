const ALLOWED_ACTIONS = ['encode', 'decode'];
const fs = require('fs');
const process = require('process');
const {Transform} = require('stream');
const { pipeline } = require('stream');
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
    process.exit(8);
}
if (!ALLOWED_ACTIONS.includes(options.action)) {
    console.log (`Action ${options.action} is not allowed. Use one of these instead: ${ALLOWED_ACTIONS.reduce((_, action) => `${_} ${action}`, '')}`);
}
if(!Number.isInteger(+options.shift)) {
    console.log('Error! Specified shift value is not allowed. Use only integer number instead');
    process.exit(8);
}

if(options.input) {
    if(!fs.existsSync(options.input)) process.stderr.write(`Error! Input file on specified path ${options.input} was not found \n`);
}
if(options.output) {
    if(!fs.existsSync(options.output)) process.stderr.write(`Error! Output file on specified path ${options.output} was not found \n`)
}
if(options.shift < 0) {
    options.action = options.action === 'encode' ? 'decode' : 'encode';
    options.shift = (-options.shift);
}

const inputStream = options.input ? fs.createReadStream(options.input): process.stdin;
const outputStream = options.output ? fs.createWriteStream(options.output, {flags: 'a'}) : process.stdout;
const transformStream = new Transform({
    transform(data, _, cb) {
        this.push(caesarCipher(data.toString(), options.shift, options.action));
        cb();
    }
})

pipeline(
    inputStream,
    transformStream,
    outputStream,
    (err) => {
        if (err) console.error(err);
        } 
)