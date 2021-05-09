    module.exports = {
    checkOptions: function(options) {
    const fs = require('fs');
    const process = require('process');
    const ALLOWED_ACTIONS = ['encode', 'decode'];
    if(!options.shift || !options.action) {
        process.stderr.write(`Error! Required option ${!options.shift ? '\'shift\'' : '\'action\''} is missed`);
        process.exit(8);
    }
    if (!ALLOWED_ACTIONS.includes(options.action)) {
        process.stderr.write (`Action ${options.action} is not allowed. Use one of these instead: ${ALLOWED_ACTIONS.reduce((_, action) => `${_} ${action}`, '')}`);
        process.exit(8);
    }
    if(!Number.isInteger(+options.shift)) {
        process.stderr.write(`Error! Specified shift value ${options.shift} is not allowed. Use only integer number instead`);
        process.exit(8);
    }   

    if(options.input) {
        if(!fs.existsSync(options.input)) {
            process.stderr.write(`Error! Specified file doesn't exist or not accessible. Please check file and ensure that path is correct`);
            process.exit(8);
    }
    }
    if(options.output) {
        if(!fs.existsSync(options.output)) {
            process.stderr.write(`Error! Specified file doesn't exist or not accessible. Please check file and ensure that path is correct`);
            process.exit(8);
    }
    }

    if(options.shift < 0) {
        options.action = options.action === 'encode' ? 'decode' : 'encode';
        options.shift = (-options.shift);
    }
}
}