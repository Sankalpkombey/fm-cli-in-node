const fs = require('fs');
const path = require('path');
const { c } = require('../utils/colors');
const { handleError } = require('../utils/errors');

async function tree(dirPath = '.', prefix = '', isRoot = true) {
    try {
        const resolved = isRoot ? path.resolve(dirPath) : dirPath;

        if (isRoot) {
            console.log(c('bold', `\n📂 ${resolved}:`));
        }

        const entries = await fs.promises.readdir(resolved, { withFileTypes: true });

        entries.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        })

        const ignored = ['.git'];

        for (let i=0; i < entries.length; i++) {
            const entry = entries[i];

            if (ignored.includes(entry.name)) {
              continue;
           }

           const isLast = i === entries.length - 1;

            const connector = isLast ? '└── ' : '├── ';
            const icon = entry.isDirectory() ? c('blue', '📁 ') : c('cyan', '📄 ');

            console.log(`${prefix}${c('dim', connector)}${icon} ${entry.name}`);

            if (entry.isDirectory()) {
                const newPrefix = prefix + (isLast ? '    ' : c('dim', '│') + '   ');
                const childPath = path.join(resolved, entry.name);
                await tree(childPath, newPrefix, false);
            }
        }

        if (isRoot) console.log('')

}       catch (err) {
        handleError(err, dirPath);
    }
}

module.exports = tree;