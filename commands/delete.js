const fs = require('fs').promises
const path = require('path')
const { c } = require('../utils/colors')
const { handleError } = require('../utils/errors')

async function del(targetPath) {
    if(!targetPath) {
        console.error(c('red', 'Provide a path to delete'))
        process.exit(1)
    }

    try{
        const resolved = path.resolve(targetPath)
        const stats = await fs.stat(resolved)

        if(stats.isDirectory()){
            await fs.rm(resolved, { recursive: true, force: true })
            console.log(c('green', `Deleted directory: ${targetPath}`))
        } else {
            await fs.unlink(resolved)
            console.log(c('green', `Deleted file: ${targetPath}`))
        }

    } catch(err) {
        handleError(err, targetPath)
    }
}

module.exports = del