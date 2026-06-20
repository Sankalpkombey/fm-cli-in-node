const fs = require('fs').promises
const path = require('path')
const { c } = require('../utils/colors')
const { handleError } = require('../utils/errors')

async function move(src, dst) {
    if (!src || !dst) {
        console.error(c('red', 'Usage: fm move <src> <dst>'))
        process.exit(1)
    }

    try{
        const resolvedSrc = path.resolve(src)
        const resolvedDst = path.resolve(dst)

        await fs.mkdir(path.dirname(resolvedDst), {recursive: true})

        await fs.rename(resolvedSrc, resolvedDst)
        console.log(c('green', `Moved: ${src} → ${dst}`))

    } catch(err) {
        handleError(err, src)
    }
}

module.exports  = move