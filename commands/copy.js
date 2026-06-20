const fs = require('fs').promises
const path = require('path')
const { c } = require('../utils/colors')
const { handleError } = require('../utils/errors')

async function copyDir(src, dst) {
    await fs.mkdir(dst, {recursive: true})
    const entries = await fs.readdir(src, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        const dstPath = path.join(dst, entry.name)

        if(entry.isDirectory()) {
            await copyDir(srcPath, dstPath)
        } else {
            await fs.copyFile(srcPath, dstPath)
        }
    }
}

async function copy(src, dst) {
    if (!src || !dst) {
        console.error(c('red', 'Usage: fm copy <src> <dst>'))
        process.exit(1)
    }

    try{
        const resolvedSrc = path.resolve(src)
        const resolvedDst = path.resolve(dst)
        const stats = await fs.stat(resolvedSrc)

        if(stats.isDirectory()) {
            await copyDir(resolvedSrc, resolvedDst)
            console.log(c('green', `Copied directory: ${src} → ${dst} `))
        } else {
            await fs.mkdir(path.dirname(resolvedDst), {recursive: true})
            await fs.copyFile(resolvedSrc, resolvedDst)
            console.log(c('green', `Copied: ${src} → ${dst} `))
        }

    } catch(err) {
      handleError(err, src)
    }
}

module.exports = copy