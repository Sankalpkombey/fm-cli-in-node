const fs = require('fs').promises
const path = require('path');
const { c } = require('../utils/colors');
const { handleError } = require('../utils/errors');

async function create(filePath) {
    if (!filePath) {
        console.error(c('red', 'Provide a file name'));
        process.exit(1);
    }

    try {
        const resolved = path.resolve(filePath);

        try{
            await fs.access(resolved);
            console.error(c('red', 'Already exists: ${filePath}'));
            process.exit(1);
        } catch {

    }
        await fs.mkdir(path.dirname(resolved), { recursive: true });

        await fs.writeFile(resolved, '');

        console.log(c('green', `Created: ${filePath}`));

    } catch (err) {
        handleError(err, filePath);
    }
}

module.exports = create;