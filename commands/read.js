const fs = require('fs');
const path = require('path');
const { c } = require('../utils/colors');
const { handleError } = require('../utils/errors');

async function read(filePath) {
    if (!filePath) {
        console.error(c('red', 'Error: No file specified'));
        process.exit(1);
    }

    try {
        const resolved = path.resolve(filePath);

        console.log(c('bold', `\n📄 ${resolved}\n:`))
        console.log(c('dim', '─'.repeat(50)))

        const stream = fs.createReadStream(resolved, { encoding: 'utf8' });

        stream.on('data', (chunk) => process.stdout.write(chunk));
        stream.on('end', () => console.log(c('dim', '\n' + '─'.repeat(50))));
        stream.on('error', (err) => handleError(err, filePath));

    } catch (err) {
        handleError(err, filePath);
    }
}

module.exports = read;