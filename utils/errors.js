const {c} = require('./colors')

function handleError(err, filepath){
  switch(err.code){
    case 'ENOENT' :
        console.error(c('red', `Not found: ${filepath}`))
        break
    case 'EACCES' :
        console.error(c('red', `Permission denied: ${filepath}`))
        break
    case 'EEXIST' :
        console.error(c('red', `Already exists: ${filepath}`))
        break 
    case 'EISDIR' :
        console.error(c('red', `Expected a file but got a directory: ${filepath}`))
        break
    case 'ENOTDIR' :
        console.error(c('red', `Expected a directory but got a file: ${filepath}`))
        break
    default:
        console.error(c('red', `Error: ${err.message}`))
  }
  process.exit(1)
}

module.exports = { handleError }