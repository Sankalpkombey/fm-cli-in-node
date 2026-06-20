const fs = require('fs').promises;
const path = require('path');
const { c } = require('../utils/colors');
const { handleError } = require('../utils/errors');

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    else if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    else return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

async function list(dirPath = '.') {
    try {
        const resolved = path.resolve(dirPath);
        const entries = await fs.readdir(resolved, { withFileTypes: true });

        if (entries.length === 0) {
            console.log(c('dim', 'Directory is empty'))
            return
        }

        entries.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        })

        console.log(c('bold', `\n📂 ${resolved}:`));

        for (const entry of entries) {
            const fullPath = path.join(resolved, entry.name);
            const stats = await fs.stat(fullPath);
            const size = formatSize(stats.size);
            const date = formatDate(stats.mtime);

            if (entry.isDirectory()) {

                const children = await fs.readdir(fullPath);
                
                console.log(`${c('blue', '📁 ' + entry.name + '/')}` + c('dim', ` ${children.length} items ${date}`)
             )
            } else {
                console.log(` ${c('cyan', '📄 ' + entry.name)}` + c('dim', ` ${size} ${date}`)
             )
            }
        }

        console.log('') 

    } catch (err) {
        handleError(err, dirPath);
    }
}

module.exports = list;

