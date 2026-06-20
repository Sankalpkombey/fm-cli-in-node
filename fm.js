#!/usr/bin/env node

const copy = require('./commands/copy');
const create = require('./commands/create');
const deleteFile = require('./commands/delete');
const list = require('./commands/list');
const mkdir = require('./commands/mkdir');
const move = require('./commands/move');
const read = require('./commands/read');
const search = require('./commands/search');
const tree = require('./commands/tree');
const { c } = require('./utils/colors');

const args = process.argv.slice(2);
const command = args[0];
const arg1 = args[1];
const arg2 = args[2];

const help = `
${c('bold', 'FM - File Manager CLI')}

${c('yellow', 'Usage:')}
    fm list   <dir>                 List files in a directory
    fm tree   <dir>                 Show directory tree
    fm read   <file>                Print file contents
    fm create <file>                Create a new file
    fm mkdir  <dir>                 Create a new directory
    fm delete <path>                Delete a file or directory
    fm move   <src> <dst>           Move or rename a file
    fm copy   <src> <dst>           Copy a file or directory
    fm search <pattern> <dir>       Search files by pattern (e.g. *.js)
`
async function main() {
    switch(command){
        case 'list':    await list(arg1);         break
        case 'tree':    await tree(arg1);         break
        case 'read':    await read(arg1);         break
        case 'create':  await create(arg1);       break
        case 'mkdir':   await mkdir(arg1);        break
        case 'delete':  await deleteFile(arg1);   break
        case 'move':    await move(arg1, arg2);   break
        case 'copy':    await copy(arg1, arg2);   break
        case 'search':  await search(arg1, arg2); break
        default:
            console.log(help)
    }
}

main()