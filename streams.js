module.exports = {
    generateStreams: function(options) {
        const fs = require('fs');
        const process = require('process');
        const {Transform} = require('stream');
        const {caesarCipher} = require('./cipher');

        const inputStream = options.input ? fs.createReadStream(options.input): process.stdin;
        const outputStream = options.output ? fs.createWriteStream(options.output, {flags: 'a'}) : process.stdout;
        const transformStream = new Transform({
        transform(data, _, cb) {
        this.push(caesarCipher(data.toString(), options.shift, options.action));
        cb();
            }
        })
        return {
            'inputStream': inputStream,
            'outputStream': outputStream,
            'transformStream': transformStream
        }
    }
}