const { pipeline } = require('stream');
const commander = require('commander');
const {checkOptions} = require('./checkOptions');
const {generateStreams} = require('./streams');
const program = new commander.Command();

program.option(
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
checkOptions(options);
const {inputStream, transformStream, outputStream} = generateStreams(options);

pipeline(
    inputStream,
    transformStream,
    outputStream,
    (err) => {}
)