const fs = require('fs').promises;
const path = require('path');
const { c } = require('../utils/colors');
const { handleError } = require('../utils/errors');

async function mkdir(dirPath) {
    if (!dirPath) {
        console.error(c('red', 'Provide a directory name'));
        process.exit(1);
    }

    try{
        const resolved = path.resolve(dirPath)
        await fs.mkdir(resolved, {recursive: true})
        console.log(c('green', `Created directory: ${dirPath}`))
    } catch (err) {
        handleError(err, dirPath)
    }
}

module.exports = mkdir