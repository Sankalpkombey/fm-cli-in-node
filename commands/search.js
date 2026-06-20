const fs   = require('fs').promises
const path = require('path')
const { c } = require('../utils/colors')
const { handleError } = require('../utils/errors')

function globToRegex(pattern) {
    const escaped = pattern
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')
    return new RegExp(`^${escaped}$`)
}

async function search(pattern, dirPath = '.') {
    if (!pattern) {
        console.error(c('red', 'Usage: fm search <pattern> <dir>'))
        process.exit(1)
    }

    try {
        const resolved = path.resolve(dirPath)
        const regex = globToRegex(pattern)
        const results = []

        async function walk(currentPath) {
            const entries = await fs.readdir(currentPath, { withFileTypes: true })

            for (const entry of entries) {
                const fullPath = path.join(currentPath, entry.name)
                
                if(entry.isDirectory()) {
                    await walk(fullPath)
                } else if (regex.test(entry.name)) {
                    results.push(fullPath)
                }
            }
        }

        console.log(c('bold', `\n🔍 Searching for "${pattern}" in ${resolved}\n`))

        await walk(resolved)

        if(results.length === 0) {
            console.log(c('yellow', 'No files found.'))
        } else {
            results.forEach(file => console.log(c('cyan', '📄 ') + file))
            console.log(c('dim', `\n ${results.length} file(s) found.`))
        }

        console.log('')

} catch (err) {
        handleError(err, dirPath)
    }
}

module.exports = search